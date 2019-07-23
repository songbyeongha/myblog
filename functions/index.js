const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.signInLog = functions.https.onCall((data, context) => {
    var email = context.auth.token.email;
    var date = new Date();
    date.setHours(date.getHours());
    console.log(date + " " +data.loginMsg + " " + email + " 로그인");
    return true;
});

exports.signOutLog = functions.https.onCall((data, context) => {
    var email = context.auth.token.email;
    var date = new Date();
    date.setHours(date.getHours());
    console.log(date + " " + email + " 로그아웃");
    return true;
});

