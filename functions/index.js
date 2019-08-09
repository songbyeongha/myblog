const functions = require("firebase-functions");
const firebase_tools = require("firebase-tools");
const admin = require("firebase-admin");
admin.initializeApp();

exports.signInLog = functions.https.onCall((data, context) => {
  var email = context.auth.token.email;
  var date = new Date();
  date.setHours(date.getHours());
  console.log(date + " " + data.loginMsg + " " + email + " 로그인");
  return true;
});

exports.signOutLog = functions.https.onCall((data, context) => {
  var email = context.auth.token.email;
  var date = new Date();
  date.setHours(date.getHours());
  console.log(date + " " + email + " 로그아웃");
  return true;
});

exports.sendPortflioNotification = functions.firestore
  .document("portfolios/{portfolio}")
  .onCreate(async event => {
    var message = "New Portfolio : " + event.data().title;
    return pushMessage(message, "team");
  });

exports.sendPostNotification = functions.firestore
  .document("posts/{post}")
  .onCreate(async event => {
    var message = "New Post : " + event.data().title;
    return pushMessage(message, "team");
  });

exports.sendPortflioCommnetNotification = functions.firestore
  .document("portfolios/{portfolio}/comments/{comment}")
  .onCreate(async event => {
    var message = "New Portfolio Comment: " + event.data().text;
    return pushMessage(message, "admin");
  });

exports.sendPostCommentNotification = functions.firestore
  .document("posts/{post}/comments/{comment}")
  .onCreate(async event => {
    var message = "New Post Comment : " + event.data().text;
    return pushMessage(message, "admin");
  });

function pushMessage(message, permission) {
  var payload = {
    notification: {
      title: message
    }
  };
  const users = admin.firestore().collection("permissions");
  users
    .get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        if (doc.data().rank == permission || doc.data().rank == "admin") {
          token = doc.data().deviceToken;
          console.log("전송 : ", token);
          admin.messaging().sendToDevice(token, payload);
        } else {
          console.log(doc.data().rank);
        }
      });
      return "sent message to all users";
    })
    .catch(err => {
      console.log("Error getting documents", err);
    });
}
exports.recursiveDelete = functions
  .runWith({
    timeoutSeconds: 540,
    memory: "2GB"
  })
  .https.onCall((data, context) => {
    const path = data.path;
    console.log(
      `User ${context.auth.uid} has requested to delete path ${path}`
    );

    return firebase_tools.firestore
      .delete(path, {
        project: process.env.GCLOUD_PROJECT,
        recursive: true,
        yes: true,
        token: functions.config().fb.token
      })
      .then(() => {
        return {
          path: path
        };
      });
  });
