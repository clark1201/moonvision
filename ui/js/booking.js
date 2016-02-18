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
  return fullY + "-" + M + "-" + D;
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
  _displayCalendar(date);
  $('.step').hide();
  $('#step'+step).show();
}
// 展示日历界面
function _displayCalendar(date){
  var first_date = new Date();
  if(date)
    first_date = new Date(date);
  var last_date = first_date.clone().addMonths(5);
  var dateDuration = first_date.format('{yyyy}.{M}') + ' — ' + last_date.format('{yyyy}.{M}');
  $('#book-select-date-text').html(dateDuration);
  var html = '';
  var weekHtml = '<tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr>';
  for(var i = 1; i <= 6; i++){
    var _currDate = first_date.clone().addMonths(i - 1)
    var _month = _currDate.getMonth() + 1;
    html += '<li><p>' + _month + '月</p><div class="book-select-date-item-content-container"><table style="width:100%">' + weekHtml + '<tr>';
    var daysInMonth = _currDate.daysInMonth();
    var weekDay = new Date(_currDate.getFullYear() + '-' + (_currDate.getMonth() + 1) + '-1').getDay();
    for(var j = (1 - weekDay); j <= (daysInMonth); j++){

      if(j > 0){
        html += '<td><a class="book-select-date-item" data-date="' + _currDate.format('{yyyy}-{M}-' + j) + '">' + j + '</a></td>';
      }
      else
        html += '<td></td>';
      if(j > 0 && (j + weekDay) % 7 === 0)
        html += '</tr><tr>'
    }
    html += '</tr></table></div></li>';
  }
  $('#displayCalenderContainer').html(html);
  // $(html).find('.book-select-date-item').on('click', {step:4}, enterNext);
  $('#step3 .book-select-date-item').on('click', {step:4}, enterNext);
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
  // $('#step3 .book-select-date-item').on('click', {step:4}, enterNext);
  // 第四步时间绑定
  $('#step4 #reSelectDate').on('click', {step:3}, enterNext);
  $('#step4 #book-detail-info-submit').on('click', {step:5}, enterNext);
  $('#step4 #book-detail-info-cancel').on('click', {step:3}, enterNext);

  $('#step5 #book-confirm-agree').on('click', {step:6}, enterLastStep);
  $('#step5 #book-confirm-reject').on('click', {step:4}, enterNext);  
}

bindBookItem()