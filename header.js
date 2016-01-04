var v = getHeaderIndex('header', 'v')
var currentTabArr = ['current','','','','','']
if (v)
  for(var i = 0; i < currentTabArr.length; i++){
    if(i == (+v - 1)){
      currentTabArr[i] = 'current'
    }
    else{
      currentTabArr[i] = ''
    }
  }
var header = '<link rel="stylesheet" type="text/css" href="ui/css/header.css" /><div class="step2_direction"><div class="step2_direction_container"><div class="step2_direction_logo"></div><div class="step2_direction_tab"><a class="step2_direction_tab_home '+currentTabArr[0]+'" href="/index.html?ui=1" target="_self" onfocus="this.blur();">Wedding</a><a class="step2_direction_tab_children '+currentTabArr[1]+'" href="/index.html?ui=2" target="_self" onfocus="this.blur();">Kids</a><a class="step2_direction_tab_business '+currentTabArr[2]+'" href="/index.html?ui=3" target="_self" onfocus="this.blur();">Commercial</a><a class="step2_direction_tab_aus '+currentTabArr[3]+'" href="/index.html?ui=4" target="_self" onfocus="this.blur();">About Us</a><a class="step2_direction_tab_cus '+currentTabArr[4]+'" href="?ui=5" target="_self" onfocus="this.blur();">Contact Us</a><span class="step2_direction_tab_book dropdown '+currentTabArr[5]+'" style="cursor: pointer;display:inline-block;" onfocus="this.blur();"><span id="bookLabel" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="bookLabel">预订（敬请期待）<span class="caret"></span></span><ul class="dropdown-menu bookLabel-container" aria-labelledby="bookLabel"><li><a id="toBook" href="booking.html">预订</a></li><li><a href="booking.html" id="myOrder">我的订单</a></li><li><a href="register.html">注册</a></li><li><a href="other.html">其他</a></li></ul></span></div></div></div><div style="height:70px;" class="fix paddingBottom50"></div>'
document.write(header);
$('#toBook').on('click', function(){
  cookies = ['item', 'select_date', 'step'];
  removeCookies(cookies);
});
$('#myOrder').on('click', function(){
  cookies = ['item','select_date'];
  removeCookies(cookies);
  SetCookie('step', 6);
});