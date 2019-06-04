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
);`;
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

// function deleteBatch(id) {
//     let query = "DELETE FROM Batch WHERE ID =" + id;
//     console.log(query);
//     verifyID(db_path, "Batch", id).then(function (results) {
//         console.log(results.rows.length);
//         if (results.rows.length) {
//             console.log("exists");
//             const DB = new sqlite3.Database(db_path, function (err) {
//                 if (err) {
//                     dialog.showMessageBox({
//                         title: "Connection to database fails",
//                         message: "The APP can not connect to the database, contact the developer to fix this problem .",
//                         buttons: ['OK']
//                     });
//                 }
//             });
//             DB.run(query, function (err) {
//                 if (err) {
//                     dialog.showMessageBox({
//                         title: "Something went wrong",
//                         message: "An error occurred while trying to add the batch. Please try again.",
//                         buttons: ['Close']
//                     });
//                     console.log(err)
//                 } else {
//                     $('#edit-batch_id').val(results.rows[0]['id']);
//                     $('#edit-incubator_id').val(results.rows[0]['incubatorId']);
//                     $('#edit-batch_start_date').val(results.rows[0]['startingDate']);
//                     changeDate(1);//it will update dates .
//                     $('#edit-egg_plaques_number').val(results.rows[0]['eggPlaques']);
//                     $('#edit-egg_number').val(results.rows[0]['totalEggNumber']);
//                     $('#edit-broken_egg_number').val(results.rows[0]['brokenEggNumber']);
//                     $('#edit-notes').val(results.rows[0]['notes']);
//                     $('#edit-batch').delay(500).fadeIn();
//                 }
//             });
//
//         } else {
//             dialog.showMessageBox({
//                 title: "Something went wrong (error)",
//                 message: "We couldn't find the  batch. Please try again or try reloading the app.",
//                 buttons: ['OK']
//             });
//         }
//
//
//     });
//
// }