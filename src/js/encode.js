$(document).ready(() => {
  $.ajax({
    url: 'http://mngtool.ynsdev.pw/users/productivity',
    method: 'GET',
    context: this,
    success(response) {
      if ($(response).find('.productivity__wrapper').length) {
        $('#frmEncode').prepend($('<div>', {
          class: 'alert alert-danger',
          text: 'Your tasks are already encoded. Please use the task management system for updating your tasks.',
          role: 'alert',
        }));

        $('#frmEncode :input').prop('disabled', true);
      }
    },
  });

  const taskRowTemplate = $('#tmpTaskRow').html();

  $('#tblTasks > tbody').append(taskRowTemplate);

  $('#tblTasks').on('click', '.btn-add-task', () => {
    $('#tblTasks > tbody').append(taskRowTemplate);

    $(this)
      .removeClass('btn-secondary btn-add-task')
      .addClass('btn-danger btn-remove-task')
      .text('Remove');
  });

  $('#tblTasks').on('click', '.btn-remove-task', () => {
    $(this)
      .parents('tr')
      .remove();
  });

  $('#tblTasks').on('blur', '.inp-code', () => {
    $.ajax({
      url: 'http://mngtool.ynsdev.pw/users/find_task',
      method: 'POST',
      context: this,
      data: { task_code: $(this).val() },
      success(response) {
        const parent = $(this)
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
      },
    });
  });

  $('#frmEncode').submit((e) => {
    e.preventDefault();

    $('.alert').alert('close');

    const tasks = $('#tblTasks > tbody > tr').map(() => ({
      code: $(this).find('.inp-code').val(),
      time: $(this).find('.inp-time').val(),
      milestone: $(this).find('.inp-milestone').val(),
      project: $(this).find('.inp-project').val(),
    }));

    $.when(...tasks.map(() => $.ajax({
      url: 'http://mngtool.ynsdev.pw/users/productivity_add',
      method: 'POST',
      context: this,
      data: {
        work_date: new Date().toISOString().slice(0, 10),
        task_code: this.code,
        actual_times: this.time,
        estimate_times: 0,
        milestone_id: this.milestone,
        project_id: this.project,
      },
    }))).done(() => {
      window.location.href = 'done.html';
    });
  });
});
