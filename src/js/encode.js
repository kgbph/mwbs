$(document).ready(() => {
  $.ajax({
    url: 'http://mngtool.ynsdev.pw/users/productivity',
    method: 'GET',
  }).then((response) => {
    if ($(response).find('.productivity__wrapper').length) {
      $('#frmEncode').prepend($('<div>', {
        class: 'alert alert-danger',
        text: 'Your tasks are already encoded. Please use the task management system for updating your tasks.',
        role: 'alert',
      }));

      $('#frmEncode :input').prop('disabled', true);
    }
  });

  const taskRowTemplate = $('#tmpTaskRow').html();

  $('#tblTasks > tbody').append(taskRowTemplate);

  $('#tblTasks').on('click', '.btn-add-task', (e) => {
    $('#tblTasks > tbody').append(taskRowTemplate);

    $(e.currentTarget)
      .removeClass('btn-secondary btn-add-task')
      .addClass('btn-danger btn-remove-task')
      .text('Remove');
  });

  $('#tblTasks').on('click', '.btn-remove-task', (e) => {
    $(e.currentTarget)
      .parents('tr')
      .remove();
  });

  $('#tblTasks').on('blur', '.inp-code', (e) => {
    $.ajax({
      url: 'http://mngtool.ynsdev.pw/users/find_task',
      method: 'POST',
      data: { task_code: $(e.currentTarget).val() },
    }).then((response) => {
      const parent = $(e.currentTarget)
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
    });
  });

  $('#frmEncode').submit((e) => {
    e.preventDefault();

    $('.alert').alert('close');

    const tasks = $('#tblTasks > tbody > tr').map(() => ({
      code: $(e.currentTarget).find('.inp-code').val(),
      time: $(e.currentTarget).find('.inp-time').val(),
      milestone: $(e.currentTarget).find('.inp-milestone').val(),
      project: $(e.currentTarget).find('.inp-project').val(),
    }));

    $.when(...tasks.map((_, task) => $.ajax({
      url: 'http://mngtool.ynsdev.pw/users/productivity_add',
      method: 'POST',
      data: {
        work_date: new Date().toISOString().slice(0, 10),
        task_code: task.code,
        actual_times: task.time,
        estimate_times: 0,
        milestone_id: task.milestone,
        project_id: task.project,
      },
    }).done(() => {
      window.location.href = 'done.html';
    })));
  });
});
