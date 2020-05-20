$(document).ready(function () {
    let taskRowTemplate = $('#tmpTaskRow').html();

    $('#btnAddTask').click(function () {
        $(taskRowTemplate).insertBefore('#tblTasks > tbody > tr:last');
    });

    $('#tblTasks').on('click', '.btn-remove-task', function () {
        $(this)
            .parents('tr')
            .remove();
    });

    $('#frmEncode').submit(function (e) {
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
