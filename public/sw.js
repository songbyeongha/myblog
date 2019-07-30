//  // //캐시 이름을 저장할 변수를 생성, appshell 파일들을 하나의 배열에 나열.
// // var cacheName = 'cache_version1';
// // var appShellFiles = [
// //   '/webmobile-final/public/',
// //   '/webmobile-final/public/index.html',
// //   '/webmobile-final/public/favicon-16x16.ico',
// //   '/webmobile-final/public/favicon.ico',
// //   '/webmobile-final/public/img/icons/android-icon-36x36.png',
// //   '/webmobile-final/public/img/icons/android-icon-48x48.png',
// //   '/webmobile-final/public/img/icons/android-icon-72x72.png',
// //   '/webmobile-final/public/img/icons/android-icon-96x96.png',
// //   '/webmobile-final/public/img/icons/android-icon-144x144.png',
// //   '/webmobile-final/public/img/icons/android-icon-192x192.png',
// //   '/webmobile-final/public/img/icons/apple-icon-60x60.png',
// //   '/webmobile-final/public/img/icons/apple-icon-72x72.png',
// //   '/webmobile-final/public/img/icons/apple-icon-76x76.png',
// //   '/webmobile-final/public/img/icons/apple-icon-114x114.png',
// //   '/webmobile-final/public/img/icons/apple-icon-120x120.png',
// //   '/webmobile-final/public/img/icons/apple-icon-144x144.png',
// //   '/webmobile-final/public/img/icons/apple-icon-152x152.png',
// //   '/webmobile-final/public/img/icons/apple-icon-180x180.png',
// //   '/webmobile-final/public/img/icons/apple-icon-precomposed.png',
// //   '/webmobile-final/public/img/icons/favicon-16x16.ico',
// //   '/webmobile-final/public/img/icons/favicon-16x16.png',
// //   '/webmobile-final/public/img/icons/favicon-32x32.png',
// //   '/webmobile-final/public/img/icons/favicon-96x96.png',
// //   '/webmobile-final/public/img/icons/favicon.ico',
// //   '/webmobile-final/public/img/icons/ms-icon-70x70.png',
// //   '/webmobile-final/public/img/icons/ms-icon-144x144.png',
// //   '/webmobile-final/public/img/icons/ms-icon-150x150.png',
// //   '/webmobile-final/public/img/icons/ms-icon-310x310.png',
// //   '/webmobile-final/src/assets/',
// //   '/webmobile-final/src/assets/icon/facebook.svg',
// //   '/webmobile-final/src/assets/icon.github.svg',
// //   '/webmobile-final/src/assets/icon/google.svg',
// //   '/webmobile-final/src/assets/logo.png',
// //   '/webmobile-final/src/assets/logo.svg',
// //   '/webmobile-final/src/assets/myprofile.jpg',
// //   '/webmobile-final/src/assets/profile.png',
// // ];

// // // 주 이벤트에 대한 이벤트 리스너를 추가할 수 있게
// // // 리스너에서 캐시를 초기화하고 오프라인 사용을 위한 파일 추가.

// // self.addEventListener('install', function(e) {
// //   console.log('[Service Worker] Install');
// //   e.waitUntil(
// //     caches.open(cacheName)
// //     .then(function(cache) {
// //       console.log('캐시가 열렸습니다.');
// //       // return cache.addAll(appShellFiles);
// //       return cache.addAll(appShellFiles);
// //     })
// //   );
// // });

// //cache : 데이터를 저장할 수 있도록 주어진 ServiceWorker의 범위 내에서
// // 사용할 수 있는 특별한 객체. 웹 저장소는 동기적이므로 웹저장소로의 저장은 동작하지 않을 것/.

// //서비스 워커를 이용하는 또 다른 장점은 오프라인 환경을 제어할 수 있다는 것.
// //정확히는 브라우저에 설치된 서비스 워커가 해당 도메인 스코프 내에서 네트워크 요청이나 메시지를 제어할 수 있기 때문에,
// //서비스에서 요청하는 네트워크 요청이 이미 캐시된 것이라면
// //오프라인 환경에서도 브라우저 캐시를 이용해 마치 네트워크에 연결된 것처럼 동작
// //패치 응답 
// // 이는 앱으로부터 HTTP요청이 출발할 때 마다 발생
// // self.addEventListener('fetch', function(e) {
// //   //패치 이벤트가 발생했을 때
// //   e.respondWith(
// //     caches.match(e.request)
// //     //event.request와 일치하는 것을 찾는다.
// //     .then(function(r) {
// //       // 만약 일치하는 게 있다면 반환한다.
// //       if (response) {
// //         return response;
// //       }
// //       // 일치하는 게 없다면 이벤트의 요청을 발송한다. (즉 페이지 로딩)
// //       return fetch(event.request);

// //     })
// //     .catch(function() {
// //       return console.log("Error Fallback");
// //     })
// //   );
// // })



// // self.addEventListener('fetch', function(e) {
// //   //패치 이벤트가 발생했을 때
// //   e.respondWith(
// //     caches.match(e.request)
// //     //event.request와 일치하는 것을 찾는다.
// //     .then(function(r) {
// //       // console.log('[Service Worker] Fetching resource: '+e.request.url);
// //       return r || fetch(e.request)
// //       .then(function(response) {
// //           return caches.open(cacheName).then(function(cache) {
// //           // console.log('[Service Worker] Caching new resource: '+e.request.url);
// //           cache.put(e.request, response.clone());
// //           return response;
// //         });
// //       });
// //     })
// //     .catch(function() {
// //       return console.log("Error Fallback");
// //     })
// //   );
// // })



// // self.addEventListener('install', function(e) {
// //  e.waitUntil(
// //    caches.open('appShellFiles').then(function(cache) {
// //      return cache.addAll([
// //       '/',
// //       '/index.html',
// //       'favicon-16x16.ico',
// //       'favicon.ico'
// //      ]);
// //    })
// //  );
// // });

// const _version = 'v3';
// const cacheName = 'v2';
// const cacheList = [
//     './',
//     './index.html',
//     './favicon-16x16.cio',
//     './mainfest.json',
//     './img/icons/ms-icon-310x310',
//     './img/icons/ms-icon-150x150',
//     './img/icons/ms-icon-144x144',
//     './img/icons/ms-icon-70x70',
//     '../src/App.vue',
//     '../components/Portfolio.vue',
//     '../components/PortfolioList.vue',
//     '../components/Portfolio.vue',
//     '../components/ImageTool.vue',
//     '../components/ImageBanner.vue',
//     '../components/ImgModal.vue',
//     '../components/ImgUpModal.vue',
// ]

// const log = msg => {
//     console.log(`[ServiceWorker ${_version}] ${msg}`)
// }

// // Life cycle: INSTALL
// self.addEventListener('install',function(event) {
//     // self.skipWating(); //서비스워커 업데이트시 대기가 아닌 활성화로
//     log('INSTALL');
//     event.waitUntil( //캐싱하거나 시간이 소요되는 작업시 install단계 확장
//         //캐시를 저장하는 전역객체
//         //open메소드를 통해 지정한 이름의 캐시 불러옴. 없으면 빈캐시 반환
//         caches.open(cacheName).then(function(cache) {
//             log('Caching app shell');
//             return cache.addAll(cacheList); //오프라인에서도 불러올수 있도록 담기
//         })
//     );
//   });
  
//   // Life cycle: ACTIVATE
//   self.addEventListener('activate', function(event){
//     log('Activate');
//   });
  
//   // Functional: FETCH
//   self.addEventListener('fetch', function(event){
//     log('Fetch ' + event.request.url);
//     event.respondWith(
//         //respondWith는 웹 브라우저의 기본 fetch를 막고 서비스워커가 Response에 대한 Promise를 제공할 수 있도록 하는 메소드
//         caches.match(event.request).then(function(response) {
//             //캐시객체에서 첫번째로 일치하는 요청과 연결된 Response객체를 반환. 없으면 undefined
//             return response || fetch(event.request);
//             //캐시에서 반환된 response가 undefined일 경우 새로 fetch할 수 있도록 하는 코드
//             //즉 fetch를 요청한 응답 객체가 캐시에 저장되어 있으면 캐시에 있는 응답 객체 전달,
//             // 만약 없으면 새로 fetch하도록 하는 코드
//         })
//     );
//   });