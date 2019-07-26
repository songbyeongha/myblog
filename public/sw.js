//캐시 이름을 저장할 변수를 생성, appshell 파일들을 하나의 배열에 나열.
var cacheName = 'cache_version1';
var appShellFiles = [
  '/webmobile-final/public/',
  '/webmobile-final/public/index.html',
  '/webmobile-final/public/favicon-16x16.ico',
  '/webmobile-final/public/favicon.ico',
  '/webmobile-final/public/img/icons/android-icon-36x36.png',
  '/webmobile-final/public/img/icons/android-icon-48x48.png',
  '/webmobile-final/public/img/icons/android-icon-72x72.png',
  '/webmobile-final/public/img/icons/android-icon-96x96.png',
  '/webmobile-final/public/img/icons/android-icon-144x144.png',
  '/webmobile-final/public/img/icons/android-icon-192x192.png',
  '/webmobile-final/public/img/icons/apple-icon-60x60.png',
  '/webmobile-final/public/img/icons/apple-icon-72x72.png',
  '/webmobile-final/public/img/icons/apple-icon-76x76.png',
  '/webmobile-final/public/img/icons/apple-icon-114x114.png',
  '/webmobile-final/public/img/icons/apple-icon-120x120.png',
  '/webmobile-final/public/img/icons/apple-icon-144x144.png',
  '/webmobile-final/public/img/icons/apple-icon-152x152.png',
  '/webmobile-final/public/img/icons/apple-icon-180x180.png',
  '/webmobile-final/public/img/icons/apple-icon-precomposed.png',
  '/webmobile-final/public/img/icons/favicon-16x16.ico',
  '/webmobile-final/public/img/icons/favicon-16x16.png',
  '/webmobile-final/public/img/icons/favicon-32x32.png',
  '/webmobile-final/public/img/icons/favicon-96x96.png',
  '/webmobile-final/public/img/icons/favicon.ico',
  '/webmobile-final/public/img/icons/ms-icon-70x70.png',
  '/webmobile-final/public/img/icons/ms-icon-144x144.png',
  '/webmobile-final/public/img/icons/ms-icon-150x150.png',
  '/webmobile-final/public/img/icons/ms-icon-310x310.png',
  '/webmobile-final/src/assets/',
  '/webmobile-final/src/assets/icon/facebook.svg',
  '/webmobile-final/src/assets/icon.github.svg',
  '/webmobile-final/src/assets/icon/google.svg',
  '/webmobile-final/src/assets/logo.png',
  '/webmobile-final/src/assets/logo.svg',
  '/webmobile-final/src/assets/myprofile.jpg',
  '/webmobile-final/src/assets/profile.png',
];

// 주 이벤트에 대한 이벤트 리스너를 추가할 수 있게
// 리스너에서 캐시를 초기화하고 오프라인 사용을 위한 파일 추가.

self.addEventListener('install', function(e) {
  console.log('[Service Worker] Install');
  e.waitUntil(
    caches.open(cacheName)
    .then(function(cache) {
      console.log('캐시가 열렸습니다.');
      // return cache.addAll(appShellFiles);
      return cache.addAll(appShellFiles);
    })
  );
});

//cache : 데이터를 저장할 수 있도록 주어진 ServiceWorker의 범위 내에서
// 사용할 수 있는 특별한 객체. 웹 저장소는 동기적이므로 웹저장소로의 저장은 동작하지 않을 것/.

//서비스 워커를 이용하는 또 다른 장점은 오프라인 환경을 제어할 수 있다는 것.
//정확히는 브라우저에 설치된 서비스 워커가 해당 도메인 스코프 내에서 네트워크 요청이나 메시지를 제어할 수 있기 때문에,
//서비스에서 요청하는 네트워크 요청이 이미 캐시된 것이라면
//오프라인 환경에서도 브라우저 캐시를 이용해 마치 네트워크에 연결된 것처럼 동작
//패치 응답 
// 이는 앱으로부터 HTTP요청이 출발할 때 마다 발생
self.addEventListener('fetch', function(e) {
  //패치 이벤트가 발생했을 때
  e.respondWith(
    caches.match(e.request)
    //event.request와 일치하는 것을 찾는다.
    .then(function(r) {
      // 만약 일치하는 게 있다면 반환한다.
      if (response) {
        return response;
      }
      // 일치하는 게 없다면 이벤트의 요청을 발송한다. (즉 페이지 로딩)
      return fetch(event.request);

    })
    .catch(function() {
      return console.log("Error Fallback");
    })
  );
})



// self.addEventListener('fetch', function(e) {
//   //패치 이벤트가 발생했을 때
//   e.respondWith(
//     caches.match(e.request)
//     //event.request와 일치하는 것을 찾는다.
//     .then(function(r) {
//       // console.log('[Service Worker] Fetching resource: '+e.request.url);
//       return r || fetch(e.request)
//       .then(function(response) {
//           return caches.open(cacheName).then(function(cache) {
//           // console.log('[Service Worker] Caching new resource: '+e.request.url);
//           cache.put(e.request, response.clone());
//           return response;
//         });
//       });
//     })
//     .catch(function() {
//       return console.log("Error Fallback");
//     })
//   );
// })