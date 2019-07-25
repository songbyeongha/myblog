const functions = require("firebase-functions");
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
    return pushMessage(message);
  });

exports.sendPostNotification = functions.firestore
  .document("posts/{post}")
  .onCreate(async event => {
    var message = "New Post : " + event.data().title;
    return pushMessage(message);
  });

function pushMessage(message) {
  var token =
    "fS4NHsU-9JA:APA91bF3S5In8MuQYPlrme1jhovxnjviCRB4_UuBdUAif_1CJ1-jEcgJrSkje8LfWdM6TMo0B84LpjweqK-56HK4I9C_gyDPptBvSlFE4Bi0PqJd0vlUif2i23S5UNhDMcjjWUvz4skx";
  console.log(message);
  var payload = {
    notification: {
      title: message
    }
  };
  admin
    .messaging()
    .sendToDevice(token, payload)
    // eslint-disable-next-line promise/always-return
    .then(response => {
      console.log("Successfully sent message:", response);
    })
    .catch(error => {
      console.log("Error sending message:", error);
    });
}
