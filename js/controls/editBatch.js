function batchEdit() {
    let idToEdit = window.value;//accessing global variable from other function
    const editID = idToEdit;
    confirm("Are you sure you want to edit this batch ?");
    document.getElementById("add-batch").classList.add("hidden");
    document.getElementById("view-batch").classList.add("hidden");
    document.getElementById("view-batch17").classList.add("hidden");
    document.getElementById("view-batch21").classList.add("hidden");
    $('#edit-batch').fadeOut();
    $('#edit-batch').delay(500).fadeIn();
    document.getElementById("edit-batch").classList.remove("hidden");
    // hide the navs
    $('#dashboard-nav').removeClass('actv');
    $('#batch-nav').addClass('actv');
    $('#contacts-nav').removeClass('actv');
    // fill old data
    deleteBatch(editID);
}

//BATCH EDIT
$("#batch-update").click(function () {
    var batchId = $('#edit-batch_id').val();
    var incubatorId = $('#edit-incubator_id').val();
    var startingDate = $('#edit-batch_start_date').val();
    var date_17 = $('#edit-batch_17_date').val();
    var date_4 = $('#edit-batch_4_date').val();
    var responsible = $('#edit-responsible').val();
    var state = $('#edit-state').val();
    var egg_plaques = $('#edit-egg_plaques_number').val();
    var total_egg_number = $('#edit-egg_number').val();
    var broken_egg_number = $('#edit-broken_egg_number').val();
    var notes = $('#edit-notes').val();

    if (!batchId) {
        dialog.showErrorBox("Batch's Id is required", "Please provide a valid Id for this batch.");
    } else if (!incubatorId) {
        dialog.showErrorBox("incubator's Id is required", "Please provide a valid ID for the incubator.");
    } else if (!startingDate) {
        dialog.showErrorBox("The starting date is required", "Please provide a valid starting date for this batch.");
    } else if (!responsible) {
        dialog.showErrorBox("The responsible's name is required", "Please provide a valid name for the responsible.");
    } else if (!state) {
        dialog.showErrorBox("The state is required", "Please provide a valid state for this batch.");
    } else if (!egg_plaques) {
        dialog.showErrorBox("The number of plaques is required", "Please enter the global plaques number for this batch.");
    } else if (!total_egg_number) {
        dialog.showErrorBox("The total egg number is required", "Please enter the total egg number for this batch.");
    } else if (!broken_egg_number) {
        dialog.showErrorBox("The total broken egg number is required", "Please enter the total broken egg number for this batch.");
    } else {
        $('#edit-loader_batch_add').css("display", "block");
        insertDataToBatch(batchId, incubatorId, startingDate, date_17, date_4, responsible, state, egg_plaques, total_egg_number,
            broken_egg_number, notes, "edit");
    }
});
