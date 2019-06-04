//Batch VIEW
$("#view-batch-btn").click(function () {
    $('#tableAll').DataTable().draw();
    readDataFromBatch("All");
});

//Batches in first step
$("#view-batch17-btn").click(function () {
    $('#table17').DataTable().draw();
    readDataFromBatch("17");

});
//Batches in second step
$("#view-batch21-btn").click(function () {
    $('#table21').DataTable().draw();
    readDataFromBatch("21");

});