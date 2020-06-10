let xhr;
const orgAjax = jQuery.ajaxSettings.xhr;
jQuery.ajaxSettings.xhr = () => {
  xhr = orgAjax();
  return xhr;
};

$(document).ready(() => {
  $('#frmLogin').submit((e) => {
    e.preventDefault();

    $('.alert').alert('close');

    $.ajax({
      url: 'http://mngtool.ynsdev.pw',
      method: 'POST',
      context: this,
      data: $(this).serialize(),
      complete() {
        if (xhr.responseURL === 'http://mngtool.ynsdev.pw/current_project_status') {
          window.location.href = 'encode.html';
        } else {
          $(this).prepend($('<div>', {
            class: 'alert alert-danger',
            text: 'Incorrect user name or password.',
            role: 'alert',
          }));
        }
      },
    });
  });
});
