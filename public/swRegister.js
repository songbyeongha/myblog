// 파일에서 Service Worker를 등록하는 코드

//서비스 워커가 있는지 확인
if ('serviceWorker' in navigator) {
  //페이지 로드 후
  window.addEventListener('load', function() {
    //sw.js 파일을 서비스 워커로 등록
    // ('/sw.js') : 최상위 경로에 있는 것을 뜻한다.
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful 
      console.log('서비스 워커 등록 완료', registration.scope);
    }).catch(function(err) {
      // registration failed :(
      console.log('오류입니다.', err);
    });
  });
}

// 내 도메인의 모든 요청을 수신 가능함
navigator.serviceWorker.register('/sw.js')



