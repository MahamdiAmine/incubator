const sqlite3 = require('sqlite3').verbose();

// create the database
function createDB() {
    let dbSchema = `CREATE TABLE IF NOT EXISTS Users (
    email text NOT NULL PRIMARY KEY,
    name text NOT NULL,
    mob1 text NOT NULL,
    mob2 text NOT NULL,
    address text NOT NULL,
    image text NOT NULL,
    password text NOT NULL
);
CREATE TABLE IF NOT EXISTS Batch (
    id integer NOT NULL PRIMARY KEY,
    incubatorId integer NOT NULL,
    startingDate text NOT NULL,
    date17 text NOT NULL,
    date21 text NOT NULL,
    responsible text NOT NULL,
    state text NOT NULL ,
    eggPlaques integer NOT NULL,
    totalEggNumber integer NOT NULL,
    brokenEggNumber integer NOT NULL,
    notes text NOT NULL
);
CREATE TABLE IF NOT EXISTS Workers (
        workerId INTEGER PRIMARY KEY AUTOINCREMENT,
        fullName TEXT unique,
        workerAddress TEXT,
        workerMob1 TEXT,
        workerMob2 TEXT,
        workerDate text);
CREATE TABLE IF NOT EXISTS Tasks (
        taskId INTEGER PRIMARY KEY AUTOINCREMENT,
        taskDate TEXT,
        taskInfo TEXT,
        cost integer,
        isPaid TEXT,
        PaidDate text,
        workerID INTEGER  NOT NULL,
        FOREIGN KEY(workerID) REFERENCES Workers(workerId));  
`;

    const DB = new sqlite3.Database(db_path, function (err) {
        if (err) {
            console.log(err);
        }
    });
    DB.exec(dbSchema, function (err) {
        if (err) {
            console.log(err)
        }
        console.log('Created !');
        DB.close();
    });
}

function insertDataToBatch(id, incubatorId, d1, d2, d3, responsible, state, eggPlaques, totalEggNumber,
                           brokenEggNumber, notes, action) {
    let query = "INSERT into Batch(id,incubatorId,startingDate,date17,date21,responsible," +
        "state,eggPlaques,totalEggNumber,brokenEggNumber,notes)" +
        "VALUES (" + id + "," + incubatorId + ",\"" + d1 + "\",\"" + d2 + "\",\"" + d3 + "\",\"" + responsible
        + "\",\"" + state + "\"," + eggPlaques + "," + totalEggNumber + "," + brokenEggNumber + ",\"" + notes + "\")";
    console.log(query);
    verifyID(db_path, "Batch", id).then(function (results) {
        console.log(results.rows.length);
        if (results.rows.length) {
            dialog.showMessageBox({
                title: "Id error",
                message: "Batch Id must be unique. Please try a different one.",
                buttons: ['Close']
            });
        } else {
            const DB = new sqlite3.Database(db_path, function (err) {
                if (err) {
                    dialog.showMessageBox({
                        title: "Connection to database fails",
                        message: "The APP can not connect to the database, contact the developer to fix this problem .",
                        buttons: ['OK']
                    });
                }
            });
            DB.run(query, function (err) {
                if (err) {
                    if (action === "add") {
                        dialog.showMessageBox({
                            title: "Something went wrong",
                            message: "An error occurred while trying to add the batch. Please try again.",
                            buttons: ['Close']
                        });
                    } else if (action === "edit") {
                        dialog.showMessageBox({
                            title: "Something went wrong",
                            message: "An error occurred while trying to edit the batch. Please try again.",
                            buttons: ['Close']
                        });
                    }

                } else {
                    if (action === "add") {
                        $('#loader_batch_add').hide();
                        $('#batch_id').val('');
                        $('#incubator_id').val('');
                        $('#batch_start_date').val('');
                        $('#batch_17_date').val('');
                        $('#batch_4_date').val('');
                        $('#responsible').formSelect();
                        $('#state').formSelect();
                        $('#egg_plaques_number').val('');
                        $('#egg_number').val('');
                        $('#broken_egg_number').val('');
                        $('#notes').val('');
                        dialog.showMessageBox({
                            title: "Status Message",
                            message: "Batch was successfully added.",
                            buttons: ['OK']
                        });
                        $('#loader_batch_add').hide();
                        $('#loader_batch_add').fadeOut();
                        document.getElementById("add-batch").classList.add("hidden");
                    } else if (action === "edit") {
                        $('#edit-incubator_id').val('');
                        $('#edit-batch_start_date').val('');
                        $('#edit-batch_17_date').val('');
                        $('#edit-batch_4_date').val('');
                        $('#edit-responsible').formSelect();
                        $('#edit-state').formSelect();
                        $('#edit-egg_plaques_number').val('');
                        $('#edit-egg_number').val('');
                        $('#edit-broken_egg_number').val('');
                        $('#edit-notes').val('');
                        dialog.showMessageBox({
                            title: "Status Message",
                            message: "Batch was successfully updated.",
                            buttons: ['OK']
                        });
                        $('#edit-loader_batch_add').hide();
                        $('#edit-loader_batch_add').fadeOut();
                    }

                }
            });
            DB.close();
        }

    });

}

function insertDataToUsers(email, name, mob1, mob2, address, image, password, fs) {
    let query = "INSERT into Users(email,name,mob1,mob2,address,image,password)" +
        "VALUES (\"" + email + "\",\"" + name + "\",\"" + mob1 + "\",\"" +
        mob2 + "\",\"" + address + "\",\"" + image + "\",\"" + password + "\")";
    verifyID(db_path, "Users", email, dialog).then(function (results) {
        console.log(results.rows.length);
        if (results.rows.length) {
            dialog.showErrorBox("Email id taken", "Email id you entered already exists in out record.");
        } else {
            const DB = new sqlite3.Database(db_path, function (err) {
                if (err) {
                    dialog.showMessageBox({
                        title: "Connection to database fails",
                        message: "The APP can not connect to the database, contact the developer to fix this problem .",
                        buttons: ['OK']
                    });
                    // createDB();
                }
            });
            DB.run(query, function (err) {
                if (err) {
                    fs.unlink(image, (err) => {
                        if (err) throw err;
                        console.log('deleted');
                    });
                } else {
                    $('#mail').val('');
                    $('#name').val('');
                    $('#mobile2').val('');
                    $('#reg').val('');
                    $('#mobile').val('');
                    $('#pwd').val('');
                    $('#cpwd').val('');
                    $('#pic').val('');
                    $('#img-preview').val('');
                    dialog.showMessageBox({
                        title: "Registration successful",
                        message: "Please signin to your account to continue.",
                        buttons: ['OK']
                    });
                }
            });
            DB.close();
        }

    });
}

//check logIn
function checkLogIn(DB_PATH, email, password) {
    let query = "SELECT * from Users where (email=" + "\"" + email + "\")";
    const DB = new sqlite3.Database(DB_PATH, function (err) {
        if (err) {
            dialog.showMessageBox({
                title: "Connection to database fails",
                message: "The APP can not connect to the database, contact the developer to fix this problem .",
                buttons: ['OK']
            });
        }
    });
    DB.all(query, function (err, rows) {
        if (err) {
            if (err) {
                dialog.showMessageBox({
                    title: "Can not search database ",
                    message: "There is a problem, contact the developer to fix this problem .",
                    buttons: ['OK']
                });
            }
        } else {
            if (rows.length == 1 && rows[0]['password'] === password) {
                document.getElementById("user-image").src = rows[0]['image'];
                $('.doc-name').html(rows[0]['name']);
                $('.nav-wrapper').hide();
                $('.header').hide();
                $('#loader').delay(500).fadeOut();
                $('#dashboard').delay(500).fadeIn();
            } else {
                $('#loader').hide();
                $('.header').fadeIn();
                $('.nav-wrapper').fadeIn();
                $('#loader').fadeOut();
                $('#signin').fadeIn();
                dialog.showErrorBox("Invalid User mail or password", "The mail you entered or the password does not match with our record.");
            }
        }
    });
    DB.close();
}

function readDataFromUsers(DB_PATH, email) {
    let query = "SELECT * from Users where (email=" + "\"" + email + "\")";
    let result = [];
    const DB = new sqlite3.Database(DB_PATH, function (err) {
        if (err) {
            console.log(err);
        }
    });
    DB.all(query, function (err, rows) {
        if (err) {
            console.log(err);
        } else {
            console.log(rows[0]);
            console.log(rows[0]['name']);
        }
    });
    DB.close();
    return result;
}

function readDataFromBatch(displayOption) {
    let target;
    if (displayOption === "All") {
        target = '#tableAll'
    }
    if (displayOption === "17") {
        target = '#table17'
    }
    if (displayOption === "21") {
        target = '#table21'
    }
    let query = `SELECT * from Batch `;
    const DB = new sqlite3.Database(db_path, function (err) {
        if (err) {
            console.log(err);
        }
    });
    DB.all(query, function (err, rows) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "An error occurred while tryings to access batches. Please try again or try reloading the app.",
                buttons: ['Close']
            });
            $(target).DataTable().clear();
        } else {
            $(target).DataTable().clear();
            for (var i = 0; i < rows.length; i++) {
                // if (displayOption === "All") {
                let rowData = [];
                rowData[0] = rows[i]['id'];
                rowData[1] = rows[i]['incubatorId'];
                rowData[2] = rows[i]['startingDate'];
                let pastDate = new Date(rowData[2]);
                rowData[3] = rows[i]['date17'];
                rowData[4] = rows[i]['date21'];
                rowData[5] = rows[i]['responsible'];
                rowData[6] = rows[i]['state'];
                rowData[7] = rows[i]['eggPlaques'];
                rowData[8] = rows[i]['totalEggNumber'];
                rowData[9] = rows[i]['brokenEggNumber'];
                rowData[10] = rows[i]['notes'];
                rowData[11] = null;
                /***edit dates***/
                var d1 = rowData[2].split('T')[0];
                var d2 = rowData[3].split('T')[0];
                var d3 = rowData[4].split('T')[0];
                var t1 = rowData[2].split('T')[1];
                var t2 = rowData[3].split('T')[1];
                var t3 = rowData[4].split('T')[1];
                var completeDate1 = d1.toString() + ' At : ' + t1.toString();
                var completeDate2 = d2.toString() + " At : " + t2.toString();
                var completeDate3 = d3.toString() + " At : " + t3.toString();
                rowData[3] = completeDate2;
                rowData[4] = completeDate3;
                if (displayOption === "All") {
                    rowData[2] = completeDate1;
                    $(target).DataTable().row.add(rowData).draw();
                } else if (displayOption === "17") {
                    let delta = getTimeRemaining(pastDate, daysForStep1);
                    if (delta.days < daysForStep1 && delta.days >= 0) {
                        $(target).DataTable().row.add(rowData).draw();
                    }
                } else if (displayOption === "21") {
                    let delta = getTimeRemaining(pastDate, daysForStep2);
                    if (delta.days < daysForStep2 - daysForStep1 && delta.days >= 0) {
                        console.log("here");
                        $(target).DataTable().row.add(rowData).draw();
                    }
                }
            }
            //after for
            if (displayOption === "All") {
                setUpButtons();
            } else if (displayOption === "17" || displayOption === "21") {
                var trIndex = null;
                let target1 = target.toString() + " tr td";
                $(target1).mouseenter(function () {
                    let info = $(this).parent();
                    if (info[0].cells[0].innerHTML !== 'No data available in table') {
                        let startingDate = info[0].cells[2].innerHTML;
                        trIndex = $(this).parent();
                        let div = '<div id="clockdiv">\n' +
                            '    <div>\n' +
                            '        <span class="days" id="days"></span>\n' +
                            '        <div class="smalltext">Days</div>\n' +
                            '    </div>\n' +
                            '    <div>\n' +
                            '        <span class="hours" id="hours"></span>\n' +
                            '        <div class="smalltext">Hours</div>\n' +
                            '    </div>\n' +
                            '    <div>\n' +
                            '        <span class="minutes" id="minutes"></span>\n' +
                            '        <div class="smalltext">Minutes</div>\n' +
                            '    </div>\n' +
                            '</div>';
                        $(trIndex).find("td:last-child").html(div);
                        var clock = document.getElementById("clockdiv");
                        var daysSpan = clock.querySelector('.days');
                        var hoursSpan = clock.querySelector('.hours');
                        var minutesSpan = clock.querySelector('.minutes');
                        let timer;
                        if (displayOption === "17") {
                            timer = getTimeRemaining(new Date(startingDate), daysForStep1);
                        } else if (displayOption === "21") {
                            timer = getTimeRemaining(new Date(startingDate), daysForStep2);
                        }
                        console.log(timer);
                        daysSpan.innerHTML = timer.days;
                        hoursSpan.innerHTML = ('0' + timer.hours).slice(-2);
                        minutesSpan.innerHTML = ('0' + timer.minutes).slice(-2);
                    }
                });
                // remove button on tr mouse leave
                $(target + " tr td").mouseleave(function () {
                    $(trIndex).find('td:last-child').html("&nbsp;");
                });
            } //else if (displayOption === "21") {            }
        }
    });
    DB.close();
}

var readRecordsFromMediaTable = function (callback) {

    var db = new sqlite3.Database("./db/frloum.db", sqlite3.OPEN_READONLY);
    let q = "SELECT * from Users where (email=\"aminov@esi.dz\")";
    console.log(q);
    db.serialize(function () {
        db.all(q, function (err, allRows) {
            if (err != null) {
                console.log(err);
                callback(err);
            }
            // console.log(util.inspect(allRows));
            callback(allRows);
            db.close();
        });
    });
};

var verifyID = function (DB_PATH, table, primaryKey, dialog) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database(DB_PATH, sqlite3.OPEN_READONLY);
        let q;
        if (table === "Users") {
            q = "SELECT * from Users where (email=\"" + primaryKey + "\")";
        } else if (table === "Batch") {
            q = "SELECT * from Batch where (id=\"" + primaryKey + "\")";
        }
        let responseObj;
        db.all(q, function cb(err, rows) {
            if (err) {
                responseObj = {
                    'error': err
                };
                dialog.showMessageBox({
                    title: "Connection to database fails",
                    message: "The APP can not connect to the database, contact the developer to fix this problem .",
                    buttons: ['OK']
                });
                reject(responseObj);
            } else {
                responseObj = {
                    rows: rows
                    // exists: 1
                };
                resolve(responseObj);
            }
            db.close();
        });
    });
};

function deleteBatch(id, action) {
    let query = "DELETE FROM Batch WHERE ID =" + id;
    console.log(query);
    verifyID(db_path, "Batch", id).then(function (results) {
        console.log(results.rows.length);
        if (results.rows.length) {
            console.log("exists");
            const DB = new sqlite3.Database(db_path, function (err) {
                if (err) {
                    dialog.showMessageBox({
                        title: "Connection to database fails",
                        message: "The APP can not connect to the database, contact the developer to fix this problem .",
                        buttons: ['OK']
                    });
                }
            });
            DB.run(query, function (err) {
                if (err) {
                    dialog.showMessageBox({
                        title: "Something went wrong",
                        message: "An error occurred while trying to add the delete. Please try again.",
                        buttons: ['Close']
                    });
                    console.log(err)
                } else {
                    if (action !== "JUST_DELETE") {
                        $('#edit-batch_id').val(results.rows[0]['id']);
                        $('#edit-incubator_id').val(results.rows[0]['incubatorId']);
                        $('#edit-batch_start_date').val(results.rows[0]['startingDate']);
                        changeDate(1);//it will update dates .
                        $('#edit-egg_plaques_number').val(results.rows[0]['eggPlaques']);
                        $('#edit-egg_number').val(results.rows[0]['totalEggNumber']);
                        $('#edit-broken_egg_number').val(results.rows[0]['brokenEggNumber']);
                        $('#edit-notes').val(results.rows[0]['notes']);
                        $('#edit-batch').delay(500).fadeIn();
                    }
                }
            });

        } else {
            dialog.showMessageBox({
                title: "Something went wrong (error)",
                message: "We couldn't find the  batch. Please try again or try reloading the app.",
                buttons: ['OK']
            });
        }


    });

}

function insertDataToWorkers(fullName, date, address, mob1, mob2) {
    let query = "INSERT into Workers(fullName,workerAddress,workerMob1,workerMob2,workerDate)" +
        "VALUES (\"" + fullName + "\",\"" + address + "\",\"" + mob1 + "\",\"" + mob2 + "\",\"" + date + "\")";
    console.log(query);

    const DB = new sqlite3.Database(db_path, function (err) {
        if (err) {
            dialog.showMessageBox({
                title: "Connection to database fails",
                message: "The APP can not connect to the database, contact the developer to fix this problem .",
                buttons: ['OK']
            });
        }
    });
    DB.run(query, function (err) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "An error occurred while trying to add the worker. Please try again.",
                buttons: ['Close']
            });

        } else {
            $('#loader_worker_add').hide();
            $('#workerName_id').val('');
            $('#workerAddress_id').val('');
            $('#workerMobile_id').val('');
            $('#workerMobile2_id').val('');
            $('#worker_start_date').val('');
            dialog.showMessageBox({
                title: "Status Message",
                message: "Worker was successfully added.",
                buttons: ['OK']
            });
            $('#loader_worker_add').fadeOut();
            // fillWorkers();
            document.getElementById("add-worker").classList.add("hidden");

        }
    });
    DB.close();

}

function readDataFromWorkers() {
    let query = "SELECT * from Workers ";
    const DB = new sqlite3.Database(db_path, function (err) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "An error occurred while tryings to access batches. Please try again or try reloading the app.",
                buttons: ['Close']
            });
        }
    });
    DB.all(query, function (err, rows) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "We can not add this Worker. Please try again or try reloading the app.",
                buttons: ['Close']
            });
        } else {
            for (var i = 0; i < rows.length; i++) {
                let rowData = [];
                rowData[0] = rows[i]['workerId'];
                rowData[1] = rows[i]['fullName'];
                rowData[2] = rows[i]['workerDate'];
                rowData[3] = rows[i]['workerAddress'];
                rowData[4] = rows[i]['workerMob1'];
                rowData[5] = rows[i]['workerMob2'];
                rowData[6] = null;
                $("#workerTable").DataTable().row.add(rowData).draw();
            }
            var trIndex = null;
            $("#workerTable tr td").mouseenter(function () {
                let info = $(this).parent();
                if (info[0].cells[0].innerHTML !== 'No data available in table') {
                    trIndex = $(this).parent();
                    let worker_id = info[0].cells[0].innerHTML;
                    let div = '<div id="clockdiv">\n' +
                        '    <div>\n' +
                        '        <span class="days" id="days"></span>\n' +
                        '        <div class="smalltext">DA</div>\n' +
                        '    </div>\n' +
                        '</div>';
                    $(trIndex).find("td:last-child").html(div);
                    var clock = document.getElementById("clockdiv");
                    var allCosts = clock.querySelector('.days');
                    let query = "SELECT cost from Tasks where isPaid=\"NO\" and workerID=" + worker_id;
                    const DB = new sqlite3.Database(db_path, function (err) {
                        if (err) {
                            dialog.showMessageBox({
                                title: "Something went wrong",
                                message: "database connection problem. Please try again or try reloading the app.",
                                buttons: ['Close']
                            });
                        }
                    });
                    DB.all(query, function (err, rows) {
                        if (err) {
                            dialog.showMessageBox({
                                title: "Something went wrong",
                                message: "We can calculate all the costs for this worker. Please try again or try reloading the app.",
                                buttons: ['Close']
                            });
                        } else {
                            let totalCosts = 0;
                            console.log(rows);
                            for (var i = 0; i < rows.length; i++) totalCosts += rows[i]['cost'];
                            allCosts.innerHTML = totalCosts.toString();

                        }
                    });
                    DB.close();
                    $("#workersList tr td").mouseleave(function () {
                        $(trIndex).find('td:last-child').html("&nbsp;");
                    });

                }
            });
        }
    });
}

function insertDataToTasks(taskWorker, task_date, taskInfo, task_cost, paid) {
    let fullName = "aminov";
    getWorkerID(fullName).then(function (results) {
        console.log(results.rows.length);
        console.log(results.rows);
        if (!results.rows.length) {
            dialog.showErrorBox("Task's worker is unknown ", "please reload the APP.");
        } else {
            let workerId = results.rows[0]['workerId'];
            let query = "INSERT into Tasks (workerID,taskDate,taskInfo,cost,isPaid)" +
                "VALUES (" + workerId + ",\"" + task_date + "\",\"" + taskInfo + "\"," + task_cost + ",\"" + paid + "\")";
            console.log(query);
            const DB = new sqlite3.Database(db_path, function (err) {
                if (err) {
                    dialog.showMessageBox({
                        title: "Connection to database fails",
                        message: "The APP can not connect to the database, contact the developer to fix this problem .",
                        buttons: ['OK']
                    });
                }
            });
            DB.run(query, function (err) {
                if (err) {
                    dialog.showMessageBox({
                        title: "Something went wrong",
                        message: "An error occurred while trying to add the task. Please try again.",
                        buttons: ['Close']
                    });
                    console.log(err)
                } else {
                    $('#loader_task_add').hide();
                    $('#taskWorker').val('');
                    $('#task_date').val('');
                    $('#taskInfo').val('');
                    $('#task_cost').val('');
                    $('#paid').val('');
                    dialog.showMessageBox({
                        title: "Status Message",
                        message: "the Task was successfully added.",
                        buttons: ['OK']
                    });
                    $('#loader_task_add').fadeOut();
                    document.getElementById("add-task").classList.add("hidden");
                }
            });
            DB.close();
        }

    });
};

var getWorkerID = function (workerFullName) {
    return new Promise(function (resolve, reject) {
        var db = new sqlite3.Database(db_path, sqlite3.OPEN_READONLY);
        let query = "SELECT workerID from Workers where (fullName=\"" + workerFullName + "\")";
        let responseObj;
        db.all(query, function cb(err, rows) {
            if (err) {
                responseObj = {
                    'error': err
                };
                dialog.showMessageBox({
                    title: "Connection to database fails",
                    message: "The APP can not connect to the database, contact the developer to fix this problem .",
                    buttons: ['OK']
                });
                reject(responseObj);
            } else {
                responseObj = {
                    rows: rows
                };
                resolve(responseObj);
            }
            db.close();
        });
    });
};

function readDataFromTasks() {
    let query = "SELECT * from Tasks ";
    const DB = new sqlite3.Database(db_path, function (err) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "We could not access the database. Please try again or try reloading the app.",
                buttons: ['Close']
            });
        }
    });
    DB.all(query, function (err, rows) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "An error occurred while tryings to access Tasks. Please try again or try reloading the app.",
                buttons: ['Close']
            });

        } else {
            console.log(rows);
            for (var i = 0; i < rows.length; i++) {
                let rowData = [];
                rowData[0] = rows[i]['taskId'];
                rowData[1] = "mee";
                rowData[2] = rows[i]['taskDate'];
                rowData[3] = rows[i]['taskInfo'];
                rowData[4] = rows[i]['cost'];
                rowData[5] = rows[i]['isPaid'];
                rowData[6] = rows[i]['PaidDate'];
                rowData[7] = null;
                $("#tasksTable").DataTable().row.add(rowData).draw();
            }
            setUpTasksButtons();
        }
    });
    DB.close();
}

function fillWorkers() {

    let query = "SELECT fullName from Workers ";
    const DB = new sqlite3.Database(db_path, function (err) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "An error occurred while tryings to access batches. Please try again or try reloading the app.",
                buttons: ['Close']
            });
        }
    });
    DB.all(query, function (err, rows) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "We can not read data from  Worker table. Please try again or try reloading the app.",
                buttons: ['Close']
            });
        } else {
            console.log(rows);
            let select = document.getElementById('taskWorker');
            for (let i = 0; i < rows.length; i++) {
                select.options[select.options.length] = new Option(rows[i]['fullName'], rows[i]['fullName']);

            }
        }
    });
    DB.close();

}


function payTask_db(id) {
    let date = new Date();
    date = date.toString().slice(0, 24);
    let query = "UPDATE Tasks \n" +
        "   SET PaidDate = \"" + date + "\", isPaid = \"YES\"WHERE taskId=\"" + id + "\";";
    console.log(query);
    const DB = new sqlite3.Database(db_path, function (err) {
        if (err) {
            dialog.showMessageBox({
                title: "Connection to database fails",
                message: "The APP can not connect to the database, contact the developer to fix this problem .",
                buttons: ['OK']
            });
        }
    });
    DB.run(query, function (err) {
        if (err) {
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "An error occurred while trying to make the task paid . Please try again.",
                buttons: ['Close']
            });
            // console.log(err);
        } else {
            dialog.showMessageBox({
                title: "Status Message",
                message: "the Task is now paid.",
                buttons: ['OK']
            });
        }
    });
}