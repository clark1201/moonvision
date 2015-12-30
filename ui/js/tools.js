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
function SetCookie(name, value, time)//存放cookies函数     SetCookie("aa",true)
{
    var Days = time; //此 cookie 将被保存 3 天
    var exp = new Date();    //now
    //exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.setTime(exp.getTime() + Days * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
// 获取 cookie
function GetCookie(name)//读取cookies函数    GetCookie("aa")
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}