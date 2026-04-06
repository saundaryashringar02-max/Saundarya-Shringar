import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyA6uikrldnxPPL3xsEh3hDGIZNRBNHaby4",
    authDomain: "saundarya-shringar.firebaseapp.com",
    projectId: "saundarya-shringar",
    storageBucket: "saundarya-shringar.firebasestorage.app",
    messagingSenderId: "984704835468",
    appId: "1:984704835468:web:da5cb91fa5a9fa804ac0a9",
    measurementId: "G-G92E3K7SX2"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestForToken = async () => {
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            console.log('Notification permission not granted.');
            return null;
        }

        const currentToken = await getToken(messaging, {
            vapidKey: "BOjjBrCeyD5eWKjHDzPekj2sIHKDc_pB-C31vb4yui_dD-9gTzWrgQxDcDTul4AGzdp1hu0tOySGje1I6EJnQlg"
        });
        if (currentToken) {
            console.log('Got FCM Token:', currentToken);
            return currentToken;
        } else {
            console.log('No registration token available. Request permission to generate one.');
            return null;
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
        return null;
    }
};

export const getMessagingInstance = () => messaging;
export const onMessageListener = (callback) => onMessage(messaging, callback);

export default app;
