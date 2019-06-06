// BATCH ADD
$("#batch-add-submit").click(function () {
    const {dialog} = require('electron').remote;
    $('#selectID option:not(:selected)').attr('disabled', true);
    var incubatorId = $('#incubator_id').val();
    var containers = $('#container_id').val();
    var startingDate = $('#batch_start_date').val();
    var date_17 = $('#batch_17_date').val();
    var date_4 = $('#batch_4_date').val();
    var responsible = $('#responsible').val();
    var NoFailedHatching = $('#NoFailedHatching').val();
    var total_egg_number = $('#egg_number').val();
    var broken_egg_number = $('#broken_egg_number').val();
    var notes = $('#notes').val();

    if (!container_id) {
        dialog.showErrorBox("the Containers are  required", "Please enter them.");
    } else if (!incubatorId) {
        dialog.showErrorBox("incubator's Id is required", "Please provide a valid ID for the incubator.");
    } else if (!startingDate) {
        dialog.showErrorBox("The starting date is required", "Please provide a valid starting date for this batch.");
    } else if (!responsible) {
        dialog.showErrorBox("The responsible's name is required", "Please provide a valid name for the responsible.");
    } else if (!NoFailedHatching) {
        dialog.showErrorBox("The number of Failed Hatching is required", "Please enter it.");
    } else if (!total_egg_number) {
        dialog.showErrorBox("The total egg number is required", "Please enter the total egg number for this batch.");
    } else if (!broken_egg_number) {
        dialog.showErrorBox("The total broken egg number is required", "Please enter the total broken egg number for this batch.");
    } else {
        $('#loader_batch_add').css("display", "block");
        // $('#loader_batch_add').hide();
        insertDataToBatch( incubatorId,containers, startingDate, date_17, date_4, responsible, NoFailedHatching, total_egg_number,
            broken_egg_number, notes, "add");
    }
});