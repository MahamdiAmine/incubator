// BATCH ADD
$("#worker-add-submit").click(function () {
    $('#selectID option:not(:selected)').attr('disabled', true);
    var workerName = $('#workerName_id').val();
    var workerAddress = $('#workerAddress_id').val();
    var workerMob1 = $('#workerMobile_id').val();
    var workerMob2 = $('#workerMobile2_id').val();
    var workerStartDate = $('#worker_start_date').val();
    if (!workerName) {
        dialog.showErrorBox("worker's Name's is required", "Please provide a valid name for this worker.");
    } else if (!workerAddress) {
        dialog.showErrorBox("worker's address is required", "Please provide a valid address for the worker.");
    } else if (!workerStartDate) {
        dialog.showErrorBox("The starting date is required", "Please provide a valid starting date for this worker.");
    } else if (!workerMob1) {
        dialog.showErrorBox("The worker's Mobile number is required", "Please provide a valid number for this worker.");
    } else if (!workerMob2) {
        dialog.showErrorBox("The worker's Mobile number is required", "Please provide a valid number for this worker.");
    } else {
        $('#loader_worker_add').css("display", "block");
        insertDataToWorkers(workerName, workerStartDate, workerAddress, workerMob1, workerMob2);
    }
});


// task ADD
$("#task-add-submit").click(function () {
    var taskWorker = $('#taskWorker').val();
    var task_date = $('#task_date').val();
    var taskInfo = $('#taskInfo').val();
    var task_cost = $('#task_cost').val();
    var paid = $('#paid').val();
    if (!taskWorker) {
        dialog.showErrorBox("task's worker is required", "Please provide a choose the worker for this worker.");
    } else if (!taskInfo) {
        dialog.showErrorBox("tasks's details are required", "Please provide a valid details for the task.");
    } else if (!task_date) {
        dialog.showErrorBox("The date is required", "Please provide a valid date for this task.");
    } else if (!task_cost) {
        dialog.showErrorBox("The task's cost number is required", "Please provide a valid cost for this task.");
    } else if (!paid) {
        dialog.showErrorBox("Is it a paid task", "Please answer this question.");
    } else {
        $('#loader_task_add').css("display", "block");
        insertDataToTasks(taskWorker, task_date, taskInfo, task_cost, paid);
    }
});