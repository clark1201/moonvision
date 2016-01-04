//获取url参数
function getUrlParm(parmName) {
    var reg = new RegExp("(^|\\?|&)" + parmName + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " ")); 
    return "";
}
// 获取引入的文件的参数
function getHeaderIndex(id, par){
  var local_url=document.getElementById(id).src;
  var get = local_url.indexOf(par +"=");
  if(get == -1){
      return false;  
  } 
  var get_par = local_url.slice(par.length + get + 1);
  var nextPar = get_par.indexOf("&");
  if(nextPar != -1){
      get_par = get_par.slice(0, nextPar);
  }
  return get_par;
}
// 设置 cookie
// 获取cookies函数
function GetCookie(name){
  return $.cookie(name);
}
// 存放cookies函数
function SetCookie(name, value){
  return $.cookie(name, value);
}
// 删除cookies函数
function removeCookie(name){
  return $.removeCookie(name);
}
// 批量删除cookies函数
function removeCookies(nameArr){
  for (var i = nameArr.length - 1; i >= 0; i--) {
    removeCookie(nameArr[i]);
  }
  return $.removeCookie(name);
}