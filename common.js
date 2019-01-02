window.fbAsyncInit = function() {
  FB.init({
    appId: '2145131702440053',//这里为你自己的应用id
    cookie: true,
    xfbml: true,
    version: 'v2.8',
  });
};
(function(d, s, id) {
  let js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = '//connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.login = function(){
  window.FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
     alert("您已经登录~")
    }else{
      window.FB.login();
    }
  });
};
window.share = function(){
  window.FB.ui({
    method: 'share',
    href: "http://www.99trillion.com/sm/activity/?channel_id=1&activity_id=1",
  }, function() {
    localStorage.setItem('is_shared', true);
  });
};