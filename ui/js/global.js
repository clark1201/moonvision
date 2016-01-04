var isFirstLoad = true;
var haveSetTimeOut;
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
    cookies = ['item','select_date','step']
    removeCookies(cookies);
}
//首页转内页
function bindClickHome() {
    $("#step1").on("click", function() {
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