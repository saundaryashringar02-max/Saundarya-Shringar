// Import Firebase scripts from Gstatic CDN
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize Firebase app in the Service Worker
firebase.initializeApp({
    apiKey: "AIzaSyA6uikrldnxPPL3xsEh3hDGIZNRBNHaby4",
    authDomain: "saundarya-shringar.firebaseapp.com",
    projectId: "saundarya-shringar",
    storageBucket: "saundarya-shringar.firebasestorage.app",
    messagingSenderId: "984704835468",
    appId: "1:984704835468:web:da5cb91fa5a9fa804ac0a9",
    measurementId: "G-G92E3K7SX2"
});

const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);

    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico', // Placeholder for app icon
        data: payload.data
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    // Custom click handling (e.g., navigate to specific page)
    const targetUrl = event.notification.data?.link || '/';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
            // Check if existing window can be focused
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                if (client.url === targetUrl && 'focus' in client) {
                    return client.focus();
                }
            }
            // Or open a new window
            if (clients.openWindow) {
                return clients.openWindow(targetUrl);
            }
        })
    );
});
