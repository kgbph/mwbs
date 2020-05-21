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

    $('#tblTasks').on('blur', '.inp-code', function () {
        $.ajax({
            url: 'http://mngtool.ynsdev.pw/users/find_task',
            method: 'POST',
            context: this,
            data: { task_code: $(this).val() },
            success: function (response) {
                let parent = $(this)
                    .parents('td')
                    .addClass('was-validated');
                parent
                    .find('.valid-feedback')
                    .text(response.data.task.name);
                parent
                    .find('.inp-milestone')
                    .val(response.data.milestone.id);
                parent
                    .find('.inp-project')
                    .val(response.data.project.id);
            }
        });
    });

    $('#frmEncode').submit(function (e) {
        e.preventDefault();

        $('.alert').alert('close');

        let tasks = $('#tblTasks > tbody > tr').not(':last').map(function () {
            return {
                code: $(this).find('.inp-code').val(),
                time: $(this).find('.inp-time').val(),
                milestone: $(this).find('.inp-milestone').val(),
                project: $(this).find('.inp-project').val()
            };
        });

        $.when(...tasks.map(function () {
            return $.ajax({
                url: 'http://mngtool.ynsdev.pw/users/productivity_add',
                method: 'POST',
                context: this,
                data: {
                    work_date: new Date().toISOString().slice(0, 10),
                    task_code: this.code,
                    actual_times: this.time,
                    estimate_times: 0,
                    milestone_id: this.milestone,
                    project_id: this.project
                }
            });
        })).done(function () {
            location.href = 'done.html';
        });
    });
});
