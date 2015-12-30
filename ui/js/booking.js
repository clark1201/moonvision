$("body").css("background-color", "#86cbc8");
function initItem(){
  var step = GetCookie('step');
  var item = GetCookie('item');
  showStep(step, item); 
}
function showStep(step, item){
  SetCookie('step', step, 3600);
  SetCookie('item', item, 3600);
  $('.step').hide();
  $('#step'+step).show();
}
function enterStep2(d){
  step = +d.data.step;
  item = $(this).data('item');
  showStep(step, item);
}

function bindBookItem(){
  initItem();
  $('#step1 .book-items a').on('click', {step:2}, enterStep2);
}

bindBookItem()