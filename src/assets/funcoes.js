function fechaModal(bntId){
  document.getElementById(bntId).click();
}

function abreModal(modalId){
  var modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}
