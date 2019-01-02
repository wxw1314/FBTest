# FBTest
这边文章主要讲的是利用 JavaScript SDK 进行Facebook的登录，点赞和分享功能。
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
1，进入[https://developers.facebook.com/docs/facebook-login/web?locale=zh_CN]()，在下面图片所示中进行配置，点击“获取代码”按钮。

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
1，进入[https://developers.facebook.com/docs/plugins/share-button#configurator]()，在下面图片所示中进行配置，点击“获取代码”按钮。

![](https://user-gold-cdn.xitu.io/2019/1/2/1680e47005071895?w=1001&h=431&f=png&s=30150)
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

<div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="small" data-mobile-iframe="true"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">分享</a></div>
```
#### 三，分享调试
进入[https://developers.facebook.com/tools/debug/]()，输入上面你分享的地址，可以刷新你更换的信息，如果分享不成功，也可以看到分享不成功的原因。
## 点赞
#### 利用插件配置器
1，进入[https://developers.facebook.com/docs/plugins/like-button]()，在下面图片所示中进行配置，点击“获取代码”按钮。

![](https://user-gold-cdn.xitu.io/2019/1/2/1680e45ecd2549f3?w=983&h=581&f=png&s=52220)
2，在HTML页面中引进js代码（注意：如果你前面已经引进上述的Facebook的SDK到页面中，下面的js可以不用再次引用）

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

## 总结
上述为自己在工作中常用的一些Facebook的功能，在此借个地方做个总结。
