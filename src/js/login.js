var xhr;
var _orgAjax = jQuery.ajaxSettings.xhr;
jQuery.ajaxSettings.xhr = function () {
    xhr = _orgAjax();
    return xhr;
};

$(document).ready(function () {
    $('#frmLogin').submit(function (e) {
        e.preventDefault();

        $('.alert').alert('close');

        $.ajax({
            url: 'http://mngtool.ynsdev.pw',
            method: 'POST',
            context: this,
            data: $(this).serialize(),
            complete: function () {
                if (xhr.responseURL === 'http://mngtool.ynsdev.pw/current_project_status') {
                    location.href = 'encode.html';
                } else {
                    $(this).prepend($('<div>', {
                        class: 'alert alert-danger',
                        text: 'Incorrect user name or password.',
                        role: 'alert'
                    }));
                }
            }
        });
    });
});
