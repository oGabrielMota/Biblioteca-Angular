function closeModal(bntId){
  document.getElementById(bntId).click();
}

function openModal(modalId){
  var modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}
