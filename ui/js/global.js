var isFirstLoad = true;
var haveSetTimeOut;
//获取url参数
function getUrlParm(parmName) {
    var reg = new RegExp("(^|\\?|&)" + parmName + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(location.href)) return unescape(RegExp.$2.replace(/\+/g, " ")); 
    return "";
}

function SetCookie(name, value, time)//存放cookies函数     SetCookie("aa",true)
{
    var Days = time; //此 cookie 将被保存 3 天
    var exp = new Date();    //now
    //exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
    exp.setTime(exp.getTime() + Days * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
function GetCookie(name)//读取cookies函数    GetCookie("aa")
{
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}
//首次加载
function firstLoad(sec) {
    if (GetCookie("fl") == "1") {
        isFirstLoad = false;
    }
    if (isFirstLoad) {
        if ($("#step1").attr("display") != "none") {
            haveSetTimeOut = setTimeout(function() {
                $(".emptyForMiddle").hide();
                $("#step1").hide();
                $("#step2").show();
                $("body").css("background-color", "#86cbc8");
                SetCookie("fl", "1", 3600);
            }, sec);
        }
    } else {
        $(".emptyForMiddle").hide();
        $("#step1").hide();
        $("#step2").show();
        $("body").css("background-color", "#86cbc8");
    }
}
//首页转内页
function bindClickHome() {
    $("#step1").bind("click", function() {
        $("#step1").hide();
        $("#step2").show();
        $("body").css("background-color", "#86cbc8");
        SetCookie("fl", "1", 3600);
        if (haveSetTimeOut) {
            clearTimeout(haveSetTimeOut);
        }
    });
}

//首页点击进入内页
bindClickHome();
//首页不点击5秒进内页
firstLoad(5000);