import { signInAnonymously } from "firebase/auth";
import {
  onDisconnect,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { auth, rtdb } from "@/lib/firebase";

function getPresenceErrorStatus(error) {
  if (error?.code === "auth/admin-restricted-operation") {
    return "auth-disabled";
  }
  if (
    error?.code === "PERMISSION_DENIED" ||
    error?.code === "database/permission-denied"
  ) {
    return "permission-denied";
  }
  return "error";
}

export function subscribeToPortfolioPresence(onStatusChange) {
  if (!auth || !rtdb) {
    onStatusChange("unavailable");
    return () => {};
  }

  let disposed = false;
  let connectionRef;
  let connecting = false;
  let retryAfterConnecting = false;
  let connected = false;
  let userIdPromise;
  let unsubscribeConnected = () => {};
  let unsubscribePresence = () => {};

  const registerConnection = async () => {
    if (disposed || !connected) return;
    if (connecting) {
      retryAfterConnecting = true;
      return;
    }

    connecting = true;
    try {
      if (!userIdPromise) {
        userIdPromise = signInAnonymously(auth)
          .then((credential) => credential.user.uid)
          .catch((error) => {
            userIdPromise = undefined;
            throw error;
          });
      }
      const uid = await userIdPromise;
      if (disposed || !connected) return;

      if (!connectionRef) {
        connectionRef = push(
          ref(rtdb, `portfolioPresence/users/${uid}/connections`),
        );
      }

      await onDisconnect(connectionRef).remove();
      if (!disposed && connected) await set(connectionRef, true);
    } catch (error) {
      console.error(
        "Unable to register portfolio presence.",
        error.code || error.message,
      );
      onStatusChange(getPresenceErrorStatus(error));
    } finally {
      connecting = false;
      if (retryAfterConnecting && connected && !disposed) {
        retryAfterConnecting = false;
        registerConnection();
      }
    }
  };

  const connectionsRef = ref(rtdb, "portfolioPresence/users");
  unsubscribePresence = onValue(
    connectionsRef,
    (snapshot) => {
      onStatusChange(snapshot.exists() ? "online" : "offline");
    },
    (error) => {
      console.error(
        "Unable to read portfolio presence.",
        error.code || error.message,
      );
      onStatusChange(getPresenceErrorStatus(error));
    },
  );

  unsubscribeConnected = onValue(
    ref(rtdb, ".info/connected"),
    (snapshot) => {
      connected = Boolean(snapshot.val());
      if (connected && !disposed) registerConnection();
    },
    (error) => {
      console.error(
        "Unable to monitor Firebase connection state.",
        error.code || error.message,
      );
      onStatusChange(getPresenceErrorStatus(error));
    },
  );

  return () => {
    disposed = true;
    unsubscribeConnected();
    unsubscribePresence();
    if (connectionRef) {
      remove(connectionRef).catch((error) => {
        console.error("Unable to clean up portfolio presence.", error);
      });
    }
  };
}
