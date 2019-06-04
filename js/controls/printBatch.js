function printBatch() {
    let idToPrint = window.value;
    let query = "SELECT * from Batch where id =" + idToPrint;
    const DB = new sqlite3.Database(db_path, function (err) {
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
            dialog.showMessageBox({
                title: "Something went wrong",
                message: "An error occurred while tryings to access batches. Please try again or try reloading the app.",
                buttons: ['Close']
            });
        } else {
            console.log(rows);
            createPDF(rows[0]['startingDate'], rows[0]['date17'], rows[0]['date21'],
                rows[0]['incubatorId'], rows[0]['responsible'], rows[0]['eggPlaques'], rows[0]['brokenEggNumber']);
        }

    });
    DB.close();
}
