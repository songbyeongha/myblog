import firebase from "firebase/app";
import "@firebase/messaging";
import "firebase/firestore";
import "firebase/functions";
import "firebase/auth";
import store from "../store.js";
import router from "../router";

const POSTS = "posts";
const PORTFOLIOS = "portfolios";
const PERM = "permissions";
const COMMENTS = "comments";

// Setup Firebase
const config = {
  apiKey: "AIzaSyDQkPEb5SFmvyP9CEqROzUrMy1UAYPz1zQ",
  authDomain: "project-bf598.firebaseapp.com",
  databaseURL: "https://project-bf598.firebaseio.com",
  projectId: "project-bf598",
  storageBucket: "project-bf598.appspot.com",
  messagingSenderId: "755312082422",
  appId: "1:755312082422:web:0dc910e2ea4131ea"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

var signInLog = firebase.functions().httpsCallable("signInLog");
var signOutLog = firebase.functions().httpsCallable("signOutLog");

firebase.firestore().enablePersistence();

let messaging = null;
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
  messaging.usePublicVapidKey(
    "BByJZMo0kqza2QWuiwjBuwQVsIcbRdPKi07dCquSE6kXXjAUcKAIS8RQ9dvA_uon2BNzRbmvuMNOiwRSb2vhigs"
  );
}

export default {
  getPosts() {
    const postsCollection = firestore.collection(POSTS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.modify_at = new Date(data.modify_at.toDate());
          data.did = doc.id;
          return data;
        });
      });
  },
  postPost(title, body, email, name) {
    return firestore.collection(POSTS).add({
      title,
      body,
      email,
      name,
      created_at: new Date(),
      modify_at: new Date()
    });
  },
  modifyPost(id, title, body, email, name) {
    var idRef = firestore.collection(POSTS).doc(id);
    return idRef.update({
      title,
      body,
      email,
      name,
      modify_at: new Date()
    });
  },
  countPost() {
    return firestore
      .collection(POSTS)
      .get()
      .then(snap => {
        return snap.size;
      });
  },
  getPortfolios() {
    const postsCollection = firestore.collection(PORTFOLIOS);
    return postsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.modify_at = new Date(data.modify_at.toDate());
          data.did = doc.id;
          return data;
        });
      });
  },
  postPortfolio(title, body, img, email, name) {
    return firestore.collection(PORTFOLIOS).add({
      title,
      body,
      img,
      email,
      name,
      created_at: new Date(),
      modify_at: new Date()
    });
  },
  modifyPortfolio(id, title, body, img, email, name) {
    var idRef = firestore.collection(PORTFOLIOS).doc(id);
    return idRef.update({
      title,
      body,
      img,
      email,
      name,
      modify_at: new Date()
    });
  },
  countPortfolio() {
    return firestore
      .collection(PORTFOLIOS)
      .get()
      .then(snap => {
        return snap.size;
      });
  },
  getAllusers() {
    const userCollection = firestore.collection("permissions");
    return userCollection.get().then(docSnapshots => {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        return data;
      });
    });
  },
  getOnePortfolio(id) {
    let idRef = firestore.collection(PORTFOLIOS).doc(id);
    return idRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.modify_at = new Date(data.modify_at.toDate());
          return data;
        }
      })
      .catch(function(error) {
        console.log("Error getting portfolio:", error);
      });
  },
  getOnePost(id) {
    let idRef = firestore.collection(POSTS).doc(id);
    return idRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.modify_at = new Date(data.modify_at.toDate());
          return data;
        }
      })
      .catch(function(error) {
        console.log("Error getting post:", error);
      });
  },
  getPermission(id) {
    let idRef = firestore.collection(PERM).doc(id);
    return idRef
      .get()
      .then(function(doc) {
        if (doc.exists) {
          return doc.data().rank;
        }
      })
      .catch(function(error) {
        console.log("Error getting rank:", error);
      });
  },
  postPermission(id, permission, email, name, deviceToken) {
    return firestore
      .collection(PERM)
      .doc(id)
      .set({
        id: id,
        rank: permission,
        email: email,
        name: name,
        deviceToken: deviceToken
      });
  },
  updatePermission(id, permission) {
    var idRef = firestore.collection(PERM).doc(id);
    return idRef
      .update({
        rank: permission
      })
      .then(function() {})
      .catch(function(error) {
        console.error("Error updating rank: ", error);
      });
  },
  updatePortfolilo(docid, title, img, body) {
    var idRef = firestore.collection(PORTFOLIOS).doc(docid);
    return idRef
      .update({
        title: title,
        body: body,
        img: img,
        created_at: new Date()
      })
      .then(function() {})
      .catch(function(error) {
        console.error("Error updating rank: ", error);
      });
  },
  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        store.state.ModalLogin = false;
        let accessToken = result.credential.accessToken;
        let user = result.user;
        signInLog({ loginMsg: "Google로그인" }).then(function(result) {});
        return result;
      })
      .catch(function(error) {
        console.error("[Google Login Error]", error);
      });
  },
  loginWithFacebook() {
    let provider = new firebase.auth.FacebookAuthProvider();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        store.state.ModalLogin = false;
        let accessToken = result.credential.accessToken;
        let user = result.user;
        signInLog({ loginMsg: "Facebook로그인" }).then(function(result) {});
        return result;
      })
      .catch(function(error) {
        console.error("[Facebook Login Error]", error);
      });
  },
  loginEmail(email, password) {
    return firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(function() {
        return firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(
            function(result) {
              store.state.ModalLogin = false;
              signInLog({ loginMsg: "메일로그인" }).then(function(result) {});
              alert("환영합니다");
              return result;
            },
          ).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if ( errorCode === 'auth/user-not-found' ) {
              alert("아이디가 일치하지 않습니다.");
            } else if (errorCode === "auth/wrong-password") {
              alert("비밀번호가 일치하지 않습니다.");
            } else {
              alert("이이디가 Email형식이 아닙니다.");
            }
          });
      });
      
  },
  async logout() {
    let email = firebase.auth().currentUser.email;
    await signOutLog({ logEmail: email }).then(function(result) {});
    firebase
      .auth()
      .signOut()
      .then(function() {
        router.push("/");
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  signUpEmail(email, password, name) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(
        function(res) {
          let user = res.user;
          user
            .updateProfile({ displayName: name })
            .then(function() {
              store.commit("loginInfo", {
                loginCheckVal: false,
                rankVal: "",
                userNameVal: "",
                userEmailVal: ""
              });
              firebase
                .auth()
                .signOut()
                .then(function() {
                  router.push("/");
                })
                .catch(function(error) {
                  console.log(error);
                });
            })
            .catch(function(error) {
              console.error("userName 업데이트 실패 : ", error);
            });

          alert("가입등록이 완료되었습니다. 다시로그인해 주세요");
          router.push("/");
        },
        function(err) {
          alert("실패" + err.message);
        }
      );
  },
  getUser(name) {
    var user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name
      })
      .then(function() {
        console.log("성공");
      })
      .catch(function(error) {
        console.log("실패");
      });
  },
  getState() {
    return firebase.auth().currentUser;
  },
  getToken() {
    return store.state.accessToken;
  },
  updateDeviceToken(id) {
    var idRef = firestore.collection(PERM).doc(id);
    var deviceToken = "";
    if (messaging == null) return;
    messaging
      .requestPermission()
      .then(function() {
        messaging.getToken().then(token => {
          deviceToken = token;
          return idRef
            .update({
              deviceToken: deviceToken
            })
            .catch(function(error) {
              console.error("Error updating deviceToken: ", error);
            });
        });
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  getComments(docname, docid) {
    const commentsCollection = firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS);
    return commentsCollection
      .orderBy("created_at", "desc")
      .get()
      .then(docSnapshots => {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.cid = doc.id;
          return data;
        });
      });
  },
  postComment(docname, docid, name, email, text) {
    return firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .add({
        name,
        email,
        text,
        created_at: new Date()
      });
  },
  postCommentComment(docname, docid, cid, name, email, text) {
    return firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .doc(cid)
      .collection(COMMENTS)
      .add({
        name,
        email,
        text,
        created_at: new Date()
      });
  },
  getBeforeCommentsPage(docname, docid, firstCreated_at) {
    let data = firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .orderBy("created_at", "desc")
      .endBefore(firstCreated_at)
      .limit(10);

    return data.get().then(function(docSnapshots) {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        data.created_at = new Date(data.created_at.toDate());
        data.cid = doc.id;
        return data;
      });
    });
  },

  getAfterCommentsPage(docname, docid, lastCreated_at) {
    let data = firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .orderBy("created_at", "desc")
      .startAfter(lastCreated_at)
      .limit(10);

    return data
      .get()
      .then(function(docSnapshots) {
        return docSnapshots.docs.map(doc => {
          let data = doc.data();
          data.created_at = new Date(data.created_at.toDate());
          data.cid = doc.id;
          return data;
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  getInitComments(docname, docid) {
    let data = firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .orderBy("created_at", "desc")
      .limit(10);

    return data.get().then(function(docSnapshots) {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        data.created_at = new Date(data.created_at.toDate());
        data.cid = doc.id;
        return data;
      });
    });
  },
  getCommentsComments(docname, docid, cid) {
    let data = firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .doc(cid)
      .collection(COMMENTS)
      .orderBy("created_at", "asc");

    return data.get().then(function(docSnapshots) {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        data.created_at = new Date(data.created_at.toDate());
        data.cid = doc.id;
        return data;
      });
    });
  },
  async deleteAtPath(category, path, pathFull) {
    let item;
    if (category == "post") item = await firestore.collection(POSTS).doc(path);
    else if (category == "portfolio")
      item = await firestore.collection(PORTFOLIOS).doc(path);
    else if (category == "calendar")
      item = await firestore.collection("calendar").doc(path);
    item.delete();
    var deleteFn = firebase.functions().httpsCallable("recursiveDelete");
    deleteFn({ path: pathFull })
      .then(function(result) {})
      .catch(function(err) {
        console.warn(err);
      });
  },
  modifyMember(name) {
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: name
      })
      .then(function() {
        store.state.userName = name;
        console.log("update success");
      })
      .catch(function(error) {
        console.log("update error");
      });
  },
  async deleteMember() {
    var user = firebase.auth().currentUser;
    let item;
    item = await firestore.collection(PERM).doc(user.uid);
    item.delete().then(function() {
      user
        .delete()
        .then(function() {
          store.commit("loginInfo", {
            loginCheckVal: false,
            rankVal: "",
            userNameVal: "",
            userEmailVal: ""
          });
          alert("회원탈퇴되었습니다.");
        })
        .catch(function(error) {
          console.log("error");
        });
    });
  },
  passowrdEmail() {
    firebase.auth().languageCode = "ko";
    var currentEmail = store.state.userEmail;
    firebase
      .auth()
      .sendPasswordResetEmail(currentEmail)
      .then(function() {
        console.log("success");
      })
      .catch(function(error) {
        console.log("error");
      });
  },
  async deleteComment(docname, docid, cid) {
    let comment = await firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .doc(cid);
    comment.delete();
  },
  async deleteCommentComment(docname, docid, cid, cid2) {
    let commentcomment = await firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .doc(cid)
      .collection(COMMENTS)
      .doc(cid2);
    commentcomment.delete();
  },
  updateComment(docname, docid, cid, text) {
    var commentRef = firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .doc(cid);
    return commentRef
      .update({
        text: text
      })
      .then(function() {})
      .catch(function(error) {
        console.error("Error updating Comments: ", error);
      });
  },
  updateCommentComment(docname, docid, cid, cid2, text) {
    let commentRef = firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .doc(cid)
      .collection(COMMENTS)
      .doc(cid2);

    return commentRef
      .update({ text: text })
      .then(function() {})
      .catch(function(error) {
        console.error("Error updating Comments:", error);
      });
  },
  markDeltedComment(docname, docid, cid) {
    let commentRef = firestore
      .collection(docname)
      .doc(docid)
      .collection(COMMENTS)
      .doc(cid);

    return commentRef
      .update({ deleted: true })
      .then(function(res) {
        console.log(res);
      })
      .catch(function(error) {
        console.log("Error updating Comments:" + error);
      });
  },
  postCalendar(email, YYYYMM, event) {
    return firestore
      .collection("calendar")
      .doc(email)
      .collection(YYYYMM)
      .add(event);
  },
  getCalendar(email, YYYYMM) {
    let data = firestore
      .collection("calendar")
      .doc(email)
      .collection(YYYYMM);

    return data.get().then(function(docSnapshots) {
      return docSnapshots.docs.map(doc => {
        let data = doc.data();
        data.date = new Date(data.date.toDate());
        data.cid = doc.id;
        return data;
      });
    });
  },
  async deleteCalendar(email, YYYYMM, cid) {
    let comment = await firestore
      .collection("calendar")
      .doc(email)
      .collection(YYYYMM)
      .doc(cid);
    comment.delete();
  }
};
