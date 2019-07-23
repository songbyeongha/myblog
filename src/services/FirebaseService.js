
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/functions'
import 'firebase/auth'
import store from '../store.js';
import AppHeader from '../components/AppHeader.vue';

const POSTS = "posts";
const PORTFOLIOS = "portfolios";

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

export default {
	data(){
		return {
			myEmail : "123"
		};
	},
	components:{
		AppHeader,
	},
	getPosts() {
		const postsCollection = firestore.collection(POSTS);
		return postsCollection
			.orderBy("created_at", "desc")
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data();
					data.created_at = new Date(data.created_at.toDate());
					return data;
				});
			});
	},
	postPost(title, body) {
		return firestore.collection(POSTS).add({
			title,
			body,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		});
	},
	getPortfolios() {
		const postsCollection = firestore.collection(PORTFOLIOS);
		return postsCollection
			.orderBy("created_at", "desc")
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data();
					data.created_at = new Date(data.created_at.toDate());
					return data;
				});
			});
	},
	postPortfolio(title, body, img) {
		return firestore.collection(PORTFOLIOS).add({
			title,
			body,
			img,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		});
	}, 
	loginWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider();
		return firebase.auth().signInWithPopup(provider).then(function(result) {
			store.state.ModalLogin =false;

			let accessToken = result.credential.accessToken
			let user = result.user
			signInLog({loginMsg : "Google로그인"}).then(function(result){});
			store.state.user = firebase.auth().currentUser.displayName;
			return result

		}).catch(function(error) {
			console.error("[Google Login Error]", error);
		});
	},
	loginWithFacebook() {
		let provider = new firebase.auth.FacebookAuthProvider();
		return firebase.auth().signInWithPopup(provider).then(function(result) {
			store.state.ModalLogin =false;
			let accessToken = result.credential.accessToken;
			let user = result.user;
			signInLog({loginMsg : "Facebook로그인"}).then(function(result){});

			store.state.user = firebase.auth().currentUser.displayName;
			return result

		  }).catch(function(error) {
			console.error("[Facebook Login Error]", error);
		  });
	},
	loginEmail(email, password){
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {
			return firebase.auth().signInWithEmailAndPassword(email, password).then(
				function(result){
					store.state.ModalLogin =false;
					signInLog({loginMsg : "메일로그인"}).then(function(result){});
					alert("환영합니다");

					store.state.user = firebase.auth().currentUser.displayName; 
					return result

				},
				function(err){
					alert("아이디/비밀번호가 일치하지 않습니다.");
				}
			);
		})
			.catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
			});
	},
	async logout(){
		let email = firebase.auth().currentUser.email;
		await signOutLog({logEmail : email}).then(function(result){});
		firebase.auth().signOut().then(function(){
			alert("로그아웃되었습니다.");
			store.state.user = "";
		}).catch(function(error){
			console.log(error);
		});
		
	},
	signUpEmail(email, password){
		firebase.auth().createUserWithEmailAndPassword(email, password).then(
			function(user){
				  alert("가입등록이 완료되었습니다. 다시로그인해 주세요");
			},
			function(err){
				alert("실패"+err.message);
			}
		);
	},
	// user 정보 업데이트하는 함수
	getUser(name){
		var user = firebase.auth().currentUser;
		console.log(user);
		console.log(name +"이름");
		
		user.updateProfile({
			displayName : name
		}).then(function(){
			console.log("성공");
		}).catch(function(error){
			console.log("실패");
		});


		
	},
	getState(){
		return firebase.auth().currentUser;
	},
	getToken(){
		return store.state.accessToken;
	}
};