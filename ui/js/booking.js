$("body").css("background-color", "#86cbc8");
function selectFrameClick(){
  $(this).find('.select-frame').toggleClass('select-frame-selected');
}
// 当前日期
function getNowDate(){
  var current = new Date();
  var fullY = current.getFullYear();
  var M = current.getMonth() + 1;
  var D = current.getDate();
  return fullY+"-"+M+"-"+D;
}
// 初始化预订页面(默认第一步，婚礼)
function initItem(){
  var step = GetCookie('step') || '1';
  var item = GetCookie('item') || 'wedding';
  var select_date = GetCookie('select_date');
  showStep(step, item, select_date); 
}
// 先把进度和项目记录 cookie，然后按照进度和项目的不同展示页面。
function showStep(step, item, date, infoObj){
  SetCookie('step', step, 3600);
  SetCookie('item', item, 3600);
  if(date){
    SetCookie('select_date', date, 3600);
    $('#selectedDate').text(date);
  }
  if(infoObj){

  }
  $('.step').hide();
  $('#step'+step).show();
}
// 从 cookie 中获取当前的进度(step)和所选的项目，按照进度和项目的不同，展示不同的页面。
function enterNext(d){
  step = +d.data.step;
  item = $(this).data('item') || GetCookie('item') || 'wedding';
  showStep(step, item, $(this).data('date'));
}
function enterLastStep (d) {
  enterNext(d);
  cookies = ['item','select_date']
  removeCookies(cookies);
}

function bindBookItem(){
  initItem();
  // radio绑定
  $('.label-radio').on('click', selectFrameClick);
  // 第一步时间绑定
  $('#step1 .book-items a').on('click', {step:2}, enterNext);
  // 第二步时间绑定
  $('#step2 #book-term-agree').on('click', {step:3}, enterNext);
  $('#step2 #book-term-reject').on('click', {step:1}, enterNext);
  // 第三步时间绑定
  $('#step3 #book-select-date-back-a').on('click', {step:2}, enterNext);
  $('#step3 .book-select-date-item').on('click', {step:4}, enterNext);
  // 第四步时间绑定
  $('#step4 #reSelectDate').on('click', {step:3}, enterNext);
  $('#step4 #book-detail-info-submit').on('click', {step:5}, enterNext);
  $('#step4 #book-detail-info-cancel').on('click', {step:3}, enterNext);

  $('#step5 #book-confirm-agree').on('click', {step:6}, enterLastStep);
  $('#step5 #book-confirm-reject').on('click', {step:4}, enterNext);  
}

bindBookItem()