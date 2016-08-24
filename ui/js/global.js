// Generated by CoffeeScript 1.7.1
var bindClickHome, firstLoad, haveSetTimeOut, isFirstLoad;

isFirstLoad = true;

haveSetTimeOut = null;

firstLoad = function(sec) {
  var cookies;
  if (GetCookie("fl") === "1") {
    isFirstLoad = false;
  }
  if (isFirstLoad) {
    if ($("#step1").attr("display") !== "none") {
      haveSetTimeOut = setTimeout(function() {
        $(".emptyForMiddle").hide();
        $("#step1").hide();
        $("#step2").show();
        $("body").css("background-color", "#86cbc8");
        return SetCookie("fl", "1", 3600);
      }, sec);
    }
  } else {
    $(".emptyForMiddle").hide();
    $("#step1").hide();
    $("#step2").show();
    $("body").css("background-color", "#86cbc8");
  }
  cookies = ['item', 'select_date', 'step'];
  removeCookies(cookies);
};

bindClickHome = function() {
  return $("#step1").on("click", function() {
    $("#step1").hide();
    $("#step2").show();
    $("body").css("background-color", "#86cbc8");
    SetCookie("fl", "1", 3600);
    if (haveSetTimeOut) {
      clearTimeout(haveSetTimeOut);
    }
  });
};

bindClickHome();

firstLoad(5000);
