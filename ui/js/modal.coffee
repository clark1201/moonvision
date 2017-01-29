modal = (type, modalId, title, content, ok, init)->
  _showAlertModal = (title, content)->
    modalObj = $('#alertModal')
    modalObj.find('.modalLabel').html title
    modalObj.find('.modal-body-content').html content
    modalObj.modal 'show'
    return
  _showConfirmModal = (title, content, ok)->
    modalObj = $('#confirmModal')
    modalObj.find('.modalLabel').html title
    modalObj.find('.modal-body-content').html content
    modalObj.find('.btn-ok').off('click').on 'click', ()->
      ok()
      modalObj.modal 'hide'
    modalObj.modal 'show'
    return
  _showInfoModal = (modalId, title, content)->
    modalId = modalId or 'infoModal'
    modalObj = $("##{modalId}")
    modalObj.find('.modalLabel').text title
    modalObj.find('.modal-body-content').html content
    modalObj.modal 'show'
    return
  _showPopModal = (modalId, title, ok, initFn)->
    modalId = modalId or 'popModal'
    modalObj = $("##{modalId}")
    modalObj.find('.modalLabel').text title
    modalObj.find('.btn-ok').off('click').on 'click', ()->
      ok()
      if not initFn.notAutoClose
        modalObj.modal 'hide'
    if initFn.fn_show
      modalObj.off('show.bs.modal').on 'show.bs.modal', initFn.fn_show
    if initFn.fn_shown
      modalObj.off('shown.bs.modal').on 'shown.bs.modal', initFn.fn_shown
    if initFn.fn_hide
      modalObj.off('hide.bs.modal').on 'hide.bs.modal', initFn.fn_hide
    if initFn.fn_hidden
      modalObj.off('hidden.bs.modal').on 'hidden.bs.modal', initFn.fn_hidden
    if initFn.ok_text
      modalObj.find('.btn-ok').text initFn.ok_text
    if initFn.close_text
      modalObj.find('.btn-close').text initFn.close_text

    modalObj.modal 'show'
    return
  switch type
    when 'confirm'
      _showConfirmModal title, content, ok
    when 'alert'
      _showAlertModal title, content
    when 'pop'
      _showPopModal modalId, title, ok, init
    when 'info'
      _showInfoModal modalId, title, content
  return