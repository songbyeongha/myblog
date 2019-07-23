import firebase from "firebase/app";
import "@firebase/messaging";

const messaging = firebase.messaging();
messaging.usePublicVapidKey("BByJZMo0kqza2QWuiwjBuwQVsIcbRdPKi07dCquSE6kXXjAUcKAIS8RQ9dvA_uon2BNzRbmvuMNOiwRSb2vhigs");

// if ("serviceWorker" in navigator) {
// 	navigator.serviceWorker.register("./firebase-messaging-sw.js").then(function(registration) {
// 		console.log("Registration successful, scope is:", registration.scope);
// 	}).catch(function(err) {
// 		console.log("Service worker registration failed, error:", err);
// 	});
// }

Notification.requestPermission().then(function(permission) {
	if (permission === "granted") {
		console.log("Notification permission granted.");
		// TODO(developer): Retrieve an Instance ID token for use with FCM.
		// ...
	} else {
		console.log("Unable to get permission to notify.");
	}
});

messaging.getToken().then(function(currentToken) {
	if (currentToken) {
		sendTokenToServer(currentToken);
		updateUIForPushEnabled(currentToken);
	} else {
		// Show permission request.
		console.log("No Instance ID token available. Request permission to generate one.");
		// Show permission UI.
		updateUIForPushPermissionRequired();
		setTokenSentToServer(false);
	}
}).catch(function(err) {
	console.log("An error occurred while retrieving token. ", err);
	showToken("Error retrieving Instance ID token. ", err);
	setTokenSentToServer(false);
});
  