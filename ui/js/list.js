var countPerPage = 10;
var currentPage = 0;
var maxPage = 0;
//显示
function displayList(event) {
    var page = 0;//初始化页数
    if (event.data) { //规范化页数
        if(Number(event.data.page) <= 0) {
            page = 0;
        }
        else if(Number(event.data.page) >= maxPage) {
            page = maxPage-1;
        }
        else {
            page = event.data.page;
        }
    }
    var objClassName = event.data.objClassName;
    $("." + objClassName).hide();
    currentPage = page;
    //for (var i = currentPage * countPerPage; i < Number(currentPage * countPerPage) + Number(countPerPage); i++) {
    for (var i = page * countPerPage; i < Number(page * countPerPage) + Number(countPerPage); i++) {
        $("." + objClassName).parent().children("." + objClassName).eq(i).show();
    }
    if(event.data && event.data.isGoTop == "true") {
        $("html, body").animate({
            scrollTop: $("body").offset().top
        }, 300);
    }
}
//分页
function bindListPage(page,objClassName) {
    var allCount = $("."+objClassName).length;
    var pageCount = 1;
    pageCount = Math.ceil(allCount / page);
    maxPage = pageCount;
    $(".step2_page_index").html("").css("width",25 * pageCount + "px");
    for (var i = 0; i < pageCount; i++) {
        var a = $("<a>");
        a.text(Number(i) + 1);
        $(".step2_page_index").append(a);
        var pageParm = "";
        if(getUrlParm("ui")){
            pageParm += "?ui=" + getUrlParm("ui");
        }
        if(getUrlParm("p")){
            pageParm += "?p=" + getUrlParm("p");
        }
        pageParm += pageParm == "" ? "?" : "&";
        pageParm += "page=" + (i + 1);
        a.attr("href",pageParm);
        a.bind("click",{"page":i,"objClassName":objClassName,"isGoTop":"true"}, displayList);
    }
    var pageNum = 1;
    $("#PreviousPage").show();
    $("#NextPage").show();
    if(getUrlParm("page")){
        pageNum = getUrlParm("page");
        if(Number(pageNum) <= 1){
            pageNum = 1;
            $("#PreviousPage").hide();
        }
        else if(Number(pageNum) >= maxPage){
            pageNum = maxPage;
            $("#NextPage").hide();
        }
    }
    else{
        pageNum = 1;
        $("#PreviousPage").hide();
    }
    if(maxPage==1){
        $("#NextPage").hide();
    }
    $(".step2_page_index a")[pageNum - 1].style.fontSize = "18px";
    $(".step2_page_index a")[pageNum - 1].style.fontWeight = "bold";
    
    //跳转
    var preParm = "";
    var nexParm = "";
    var generalParm = "";
    if(getUrlParm("ui")){
        generalParm += "?ui=" + getUrlParm("ui");
    }
    if(getUrlParm("p")){
        generalParm += "?p=" + getUrlParm("p");
    }
    
    generalParm += generalParm == "" ? "?" : "&";
    preParm = generalParm + "page=" + (pageNum - 1);
    nexParm = generalParm + "page=" + (Number(pageNum) + 1);
    $("#PreviousPage").attr("href",preParm);
    $("#NextPage").attr("href",nexParm);
    
    $("#PreviousPage").bind("click", { "page": ((currentPage - 1) < 0 ? 0 : (currentPage - 1)), "objClassName": objClassName ,"isGoTop":"true"}, displayList);

    $("#NextPage").bind("click", { "page": ((Number(currentPage) + 1) > maxPage ? maxPage : (Number(currentPage) + 1)), "objClassName": objClassName,"isGoTop":"true" }, displayList);
}

//导航
function bindDirection() {
    var ui = getUrlParm("ui");
    $(".step2_direction_tab a").removeClass("current");
    $(".step2_content_cus,.step2_content_aus,.step2_content_list,.step2_children_content_list,.step2_business_content_list").hide();
    if (!ui) {ui = "1";}
    switch (ui) {
        case "1":
            $(".step2_direction_tab_home").addClass("current");
            $(".step2_content_list").show();
            bindListPage(countPerPage,"step2_content_list");
            var data = {"page":(getUrlParm("page")-1),"objClassName":"step2_content_list"};
            var e = {"data":data};
            displayList(e);
            $(".step2_direction_search").show();
            $(".step2_page").show();
            break;
        case "2":
            $(".step2_direction_tab_children").addClass("current");
            $(".step2_children_content_list").show();
            bindListPage(countPerPage,"step2_children_content_list");
            var data = {"page":(getUrlParm("page")-1),"objClassName":"step2_children_content_list"};
            var e = {"data":data};
            displayList(e);
            $(".step2_direction_search").show();
            $(".step2_page").show();
            break;
        case "3":
            $(".step2_direction_tab_business").addClass("current");
            $(".step2_business_content_list").show();
            bindListPage(countPerPage,"step2_business_content_list");
            var data = {"page":(getUrlParm("page")-1),"objClassName":"step2_business_content_list"};
            var e = {"data":data};
            displayList(e);
            $(".step2_direction_search").show();
            $(".step2_page").show();
            break;
        case "4":
            $(".step2_direction_tab_aus").addClass("current");
            $(".step2_content_aus").show();
            $(".step2_direction_search").hide(); ;
            $(".step2_page").hide();
            break;
        case "5":
            $(".step2_direction_tab_cus").addClass("current");
            $(".step2_content_cus").show();
            $(".step2_direction_search").hide();
            $(".step2_page").hide();
            break;
    }
}

bindDirection();

var p = getUrlParm("p");
if (!p) {
}
else {
    var name = $("#" + p + "-name").val();
    var date = $("#" + p + "-date").val();
    var content = $("#" + p + "-content").val();
    var count = $("#" + p).val();
    $("#detail-name").text(name);
    $("#detail-date").text(date);
    $("#detail-content").text(content);
    var content = "";
    for (var i = 1; i <= count; i++) {
        content += '<div style="background:url(ui/image/images/moonvision-' + p + '/moonvision-' + p + '-' + i + '.jpg) 0 0 no-repeat"></div>';
    }
    $(".step3_content").show();
    $(".step2_page,.step2_content").hide();
    $("#detail_img_content").html(content);
}
