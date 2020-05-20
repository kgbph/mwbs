$(document).ready(function () {
    let taskRowTemplate = $('#tblTasks > tbody > tr:first');

    $('#btnAddTask').click(function () {
        $(taskRowTemplate)
            .clone()
            .insertBefore('#tblTasks > tbody > tr:last');
    });

    $('.btn-remove-task').click(function () {
        $(this).parentsUntil('tr').remove();
    });
});
