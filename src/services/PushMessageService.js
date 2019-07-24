import firebase from "firebase/app";
import "@firebase/messaging";

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
	"BByJZMo0kqza2QWuiwjBuwQVsIcbRdPKi07dCquSE6kXXjAUcKAIS8RQ9dvA_uon2BNzRbmvuMNOiwRSb2vhigs"
);

messaging
	.requestPermission()
	.then(function() {
		console.log("Have permission");
		messaging.getToken().then((token) => {
			console.log(token);
		});
	})
	.catch(function(err) {
		console.log(err);
	});

messaging.onMessage(function(payload){
	console.log("onMessage: ", payload);
});