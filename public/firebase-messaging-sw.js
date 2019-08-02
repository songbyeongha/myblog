importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js");

var config = {
	apiKey: "AIzaSyDQkPEb5SFmvyP9CEqROzUrMy1UAYPz1zQ",
	authDomain: "project-bf598.firebaseapp.com",
	databaseURL: "https://project-bf598.firebaseio.com",
	storageBucket: "project-bf598.appspot.com",
	messagingSenderId: "755312082422",
};

firebase.initializeApp(config);

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
	const title = payload.data.title;
	const options = {
		body: payload.data.status,
		icon : "/logo.png"
	};
	return self.registration.showNotification(title, options);
});
