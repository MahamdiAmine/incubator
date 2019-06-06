//workers list
$("#view-workers-btn").click(function () {
    $('#workerTable').DataTable().clear();
    $('#workerTable').DataTable().draw();
    readDataFromWorkers();
});

//tasks list
$("#view-tasks-btn").click(function () {
    $('#tasksTable').DataTable().clear();
    $('#tasksTable').DataTable().draw();
    readDataFromTasks();
});
