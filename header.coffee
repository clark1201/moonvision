v = getHeaderIndex('header', 'v')
currentTabArr = ['current','','','','','']
if v
  for i in [0...currentTabArr.length]
    currentTabArr[i] = if i is (+v - 1) then 'current' else ''
bookLabelText = '预定'
if GetCookie('account')
  bookLabelText = decodeURIComponent GetCookie('account')
header = '
  <link rel="stylesheet" type="text/css" href="ui/css/header.css" />
  <div class="step2_direction">
    <div class="step2_direction_container">
      <div class="step2_direction_logo"><a href="/" class="href_step2_direction_logo"></a></div>
      <div class="step2_direction_tab">
        <a class="step2_direction_tab_home '+currentTabArr[0]+'" href="/index.html?ui=1" target="_self" onfocus="this.blur();">Wedding</a>
        <a class="step2_direction_tab_children '+currentTabArr[1]+'" href="/index.html?ui=2" target="_self" onfocus="this.blur();">Kids</a>
        <a class="step2_direction_tab_business '+currentTabArr[2]+'" href="/index.html?ui=3" target="_self" onfocus="this.blur();">Commercial</a>
        <a class="step2_direction_tab_aus '+currentTabArr[3]+'" href="/index.html?ui=4" target="_self" onfocus="this.blur();">About Us</a>
        <a class="step2_direction_tab_cus '+currentTabArr[4]+'" href="/index.html?ui=5" target="_self" onfocus="this.blur();">Contact Us</a>
        <span class="step2_direction_tab_book dropdown '+currentTabArr[5]+'" style="cursor: pointer;display:inline-block;" onfocus="this.blur();">
          <span id="bookLabel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="bookLabel">'+bookLabelText+'<span class="caret"></span>
          </span>
          <ul class="dropdown-menu bookLabel-container" aria-labelledby="bookLabel">
            <li><a id="toBook">预定</a></li>
            <li id="myOrderList" style="display:none;"><a id="myOrder">我的定单</a></li>
            <!--li><a href="register.html">注册</a></li-->
            <li id="loginContainer"><a href="login.html">登录</a></li>
            <!--li><a href="other.html">其他</a></li-->
            <li id="logoutContainer" style="display:none;"><a id="logout">登出</a></li>
          </ul>
        </span>
      </div>
    </div>
  </div>
  <div style="height:70px;" class="fix paddingBottom50"></div>'
document.write header
$('#toBook').on 'click', ()->
  cookies = ['item', 'select_date', 'step']
  removeCookies cookies
  location.href = "booking.html"
  return
$('#myOrder').on 'click', ()->
  cookies = ['item','select_date']
  removeCookies cookies
  SetCookie 'step', 6
  location.href = "booking.html"
  return
$('#logout').on 'click', ()->
  cookies = ['item', 'select_date', 'step', 'account', 'accountid']
  removeCookies cookies
  location.href = "index.html"
  return
if GetCookie('account')
  $('#logoutContainer').show()
  $('#myOrderList').show()
  $('#loginContainer').hide()
else
  $('#logoutContainer').hide()
  $('#myOrderList').hide()
  $('#loginContainer').show()
