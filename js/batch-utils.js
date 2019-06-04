//********************** Edit ,Remove and Print buttons
function setUpButtons() {

    var trIndex = null;
    $("#tableAll tr td").mouseenter(function () {
        let info = $(this).parent();
        let id = info[0].cells[0].innerHTML;
        window.value = id;//global var to store the fucking id
        trIndex = $(this).parent();
        let div = '<div class="btn-group pull-right">\n' +
            '    <button id="bEdit" type="button" class="btn btn-sm btn-default" onclick="batchEdit();"><span\n' +
            '            class="glyphicon glyphicon-pencil"> </span></button>\n' +
            '    <button id="bCanc" type="button" class="btn btn-sm btn-default" onclick="batchDelete();">\n' +
            '        <span class="glyphicon glyphicon-remove"> </span></button>\n' +
            '    <button id="bPrint" type="button" class="btn btn-sm btn-default" onclick="printBatch();">\n' +
            '        <span class="glyphicon glyphicon-print"> </span></button>\n' +
            '</div>';

        $(trIndex).find("td:last-child").html(div);
    });
    // remove button on tr mouse leave
    $("#tableAll tr td").mouseleave(function () {
        $(trIndex).find('td:last-child').html("&nbsp;");
    });

}

//delete a batch
function batchDelete() {
    let editID = window.value;//accessing global variable from other function
    confirm('Are you sure to delete this batch ?');
    deleteBatch(editID, "JUST_DELETE");
}

// create a PDF file
function createPDF(date1, date2, date3, incID, responsible, plaquesNumber, totalEggNumber) {

    console.log(arguments);
    const JsPDF = require('jspdf');
    require('jspdf-autotable');
    var doc = new JsPDF('l', "mm", 'a4');
    doc.setFont("courier");
    doc.setFontType("bold");
    doc.text(48, 20, "Addi Incubator -----------------------------   Sefiane/Batna");
    doc.text(16, 50, "Incubator Number :");
    doc.setTextColor(0, 0, 255);
    doc.text(90, 50, incID.toString());
    doc.setTextColor(0, 0, 0);
    var d1 = FormatDate(date1.toString().split('T')[0]);
    var d2 = FormatDate(date2.toString().split('T')[0]);
    var d3 = FormatDate(date3.toString().split('T')[0]);


    var t1 = date1.toString().split('T')[1];
    var t2 = date2.toString().split('T')[1];
    var t3 = date3.toString().split('T')[1];
    doc.autoTable({
        margin: {top: 90},
        head: [['Starting Date', 'Date After 17 days', 'Date after 4 days']],
        body: [[d1, d2, d3], [t1, t2, t3]]
    });
    doc.autoTable({
        theme: "striped",
        columnStyles: {europe: {halign: 'center'}}, // European countries centered
        margin: {top: 200, down: 140},
        head: [['Total Plaques number', 'Total Egg Number']],
        body: [[plaquesNumber.toString(), totalEggNumber.toString()]]
    });
    doc.setFont("times");
    doc.setFontType("italic");
    doc.text(60, 190, 'The responsible :');
    doc.setFont("courier");
    doc.setFontType("bold");
    doc.setTextColor(0, 0, 255);
    doc.text(122, 190, responsible);
    doc.save('Report N ' + incID.toString());
}

