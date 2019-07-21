//********************** pay this task
function setUpTasksButtons() {
    var trIndex = null;
    $("#tasksTable tr td").mouseenter(function () {
        let info = $(this).parent();
        if (info[0].cells[0].innerText !== 'No data available in table') {
            let id = info[0].cells[0].innerHTML;
            window.value = id;
            trIndex = $(this).parent();
            let div = '<div class="btn-group pull-right">\n' +
                '    <button id="bEdit" type="button" class="btn btn-sm btn-default" onclick="payTask();"><span\n' +
                '            class="glyphicon glyphicon-usd"> </span></button>\n' +
                '</div>';

            $(trIndex).find("td:last-child").html(div);
        }
    });
    // remove button on tr mouse leave
    $("#tasksList tr td").mouseleave(function () {
        $(trIndex).find('td:last-child').html("&nbsp;");
    });
}

//pay a task
function payTask() {
    let editID = window.value;//accessing global variable from other function
    if (confirm('Are you sure to pay this task ?')) {
        payTask_db(editID);
    }
}
