这篇文章主要讲的是利用 JavaScript SDK 进行Facebook的登录，点赞，分享和公共主页插件功能。
## 前期准备
1，注册一次Facebook账号，新建一个应用取到应用id

2，引进Facebook的SDK到页面中：
在js中引进以下代码，初始化

```
// facebook
window.fbAsyncInit = function() {
  FB.init({
    appId: 'your-app-id',//这里为你自己的应用id
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
```

## 登录
登录有两种方法，第一种使用sdk的方法登录，第二种则直接使用Facebook的自带插件，下面进行详细介绍

#### 一，利用 JavaScript SDK 部署网页版“Facebook 登录”

1，在html页面中增加一个按钮点击

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="common.js"></script>
</head>
<body>
    <button onclick="login()">登录</button>
</body>
</html>
```
2,在js中引进login函数（用window.FB.getLoginStatus函数判断登录状态）

```
window.login = function(){
  window.FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
     alert("您已经登录~")
    }else{
      window.FB.login();
    }
  });
};
```
#### 二，利用插件配置器
1，进入[站点](https://developers.facebook.com/docs/facebook-login/web?locale=zh_CN)，在下面图片所示中进行配置，点击“获取代码”按钮。

![](https://user-gold-cdn.xitu.io/2018/12/29/167f9a27f4397f42?w=949&h=466&f=png&s=42705)

2，在HTML页面中引进js代码（注意：如果你前面已经引进上述的Facebook的SDK到页面中，下面的js可以不用再次引用）

```
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.2&appId=your-app-id&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div class="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="true" data-use-continue-as="false"></div>
```
## 分享
分享也有有两种方法，第一种使用sdk的方法登录，第二种则直接使用Facebook的自带插件，下面进行详细介绍
#### 一，利用 JavaScript SDK 部署网页版“Facebook 登录”
1，在html页面中加入分享按钮

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="common.js"></script>
</head>
<body>
    <button onclick="share()">分享</button>
</body>
</html>
```
2，在js中引进share函数

```
window.share = function(){
  window.FB.ui({
    method: 'share',
    href: "your-share-link",
  }, function() {
  });
};
```
下面介绍一些参数

1）href：分享的页面。需要注意的是在此网址的页面上必须添加开放图谱元标签，自定义分享的动态。
具体如下所示：在分享的html页面head里面加上以下代码

```
    <meta property="fb:app_id" content="your-app-id" />
    <meta property="og:url" content="" />
    <meta property="og:type" content="website" />
    <!--分享的标题-->
    <meta property="og:title" content="《神命：天選之人》--事情登錄得好康，分享抽mycard！" />
    <!--分享的描述-->
    <meta property="og:description" content="《神命：天選之人》強勢來襲！化形天神，舞動幹戚；神魔之戰，生死一念；神寵坐騎，飛天遁地；驚鴻一瞥，女神相隨！參與事前登錄，好康滿滿，更有機會贏Mycard！" />
    <!--分享的图片-->
    <meta property="og:image" content="http://www.99trillion.com/test20181214/share.ad3f2854.jpg" />
```
2）mobile_iframe：移动网页分享对话框也能够以 iFrame窗口的形式显示在内容的顶部。完成分享操作流程后，该对话框将消失，而用户将回到之前所在的内容位置，以便轻松继续阅读内容。要让移动网页分享对话框显示在 iframe 窗口中，请将属性 mobile_iframe 设置为 true。

```
window.share = function(){
  window.FB.ui({
    method: 'share',
    mobile_iframe: true,
    href: "your-share-link",
  }, function() {
  });
};
```
#### 二，利用插件配置器
1，进入[站点](https://developers.facebook.com/docs/plugins/share-button#configurator)，在下面图片所示中进行配置，点击“获取代码”按钮。

![](https://user-gold-cdn.xitu.io/2019/1/2/1680e47005071895?w=1001&h=431&f=png&s=30150)
2，在HTML页面中引进js代码（注意：如果你前面已经引进上述的Facebook的SDK到页面中，下面的js可以不用再次引用）
其中，href为分享的页面

```
<div id="fb-root"></div>
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.2&appId=your-app-id&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">分享</a></div>
```
#### 三，分享调试
进入[站点](https://developers.facebook.com/tools/debug/)，输入上面你分享的地址，可以刷新你更换的信息，如果分享不成功，也可以看到分享不成功的原因。
## 点赞
#### 利用插件配置器
1，进入[站点](https://developers.facebook.com/docs/plugins/like-button)，在下面图片所示中进行配置，点击“获取代码”按钮。

![](https://user-gold-cdn.xitu.io/2019/1/2/1680e45ecd2549f3?w=983&h=581&f=png&s=52220)
2，在HTML页面中引进js代码（注意：如果你前面已经引进上述的Facebook的SDK到页面中，下面的js可以不用再次引用）
其中，data-href为点赞的页面。

```
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.2&appId=2145131702440053&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="like" data-size="small" data-show-faces="true" data-share="true"></div>
```
#### 注意项
点赞功能需要在应用中进行申请，申请的条件有页面中需要登录按钮，并且该登录按钮可用。申请通过后，该点赞按钮才会在页面中显示。

## 公共主页插件

通过公共主页插件，您可以在网站上轻松嵌入和推广任何公开的 Facebook 主页。与在 Facebook 上一样，您的访客在网站中即可赞和分享主页。您可以将公共主页插件用于任何不受限制（例如国家/地区或年龄限制）的主页。
#### 利用插件配置器
1、进入[站点](https://developers.facebook.com/docs/plugins/page-plugin/)，在下面图片所示中进行配置，点击“获取代码”按钮

![](https://user-gold-cdn.xitu.io/2019/7/1/16bab7f3bb10ed1e?w=829&h=843&f=png&s=232617)

2、在HTML页面中引进js代码（注意：如果你前面已经引进上述的Facebook的SDK到页面中，下面的js可以不用再次引用） 其中，data-href为点赞的页面。

```
<script>(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v3.2&appId=2145131702440053&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));</script>

<div class="fb-page"
   id="fb-page"
   data-href="https://www.facebook.com/sm.99trillion/"
   data-tabs="timeline"
   data-width="366"
   data-height="490"
   data-small-header="true"
   data-adapt-container-width="true"
   data-hide-cover="false"
   data-show-facepile="false">
 <blockquote
    cite="https://www.facebook.com/sm.99trillion/"
    class="fb-xfbml-parse-ignore"
  >
    <a href="https://www.facebook.com/sm.99trillion/">Facebook</a>
  </blockquote>
</div>

```
#### 注意项：

* `blockquote`标签的内容用于分享页未加载出来时的显示
* 该插件有时无法渲染出来iframe的问题，该插件的sdk渲染iframe还需要去拿到对应hash的sdk，加载流程为：在页面中必须先拿到sdk1，执行sdk1去拿sdk2，sdk2中会触发onload函数再去渲染ifram，如果页面加载速度快的时候，页面已经load完成，但是sdk2中的onload函数还未执行，会导致iframe渲染不了，
解决方法有：页面加载完成之后自动刷新一次，刷新后加上时间戳，以识别为第二次加载
 
## 总结
上述为自己在工作中常用的一些Facebook的功能，在此借个地方做个总结。

github代码点击[这里](https://github.com/wxw1314/FBTest)