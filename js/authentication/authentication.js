//signup
$("#signup-submit").click(function () {
    var email = $('#mail').val();
    var name = $('#name').val();
    var mobile = $('#mobile').val();
    var mobile2 = $('#mobile2').val();
    var address = $('#reg').val();
    var password = $('#pwd').val();
    if (!mobile2) {
        mobile2 = '-';
    }
    if (!email) {
        dialog.showErrorBox("Email missing", "Please provide a valid email id.");
    } else if (!name) {
        dialog.showErrorBox("Name missing", "Please provide a valid full name.");
    } else if (!mobile) {
        dialog.showErrorBox("Mobile Number missing", "Please provide a valid mobile number.");
    } else if (!address) {
        dialog.showErrorBox("Address is missing", "Please provide a valid address.");
    } else if (!password) {
        dialog.showErrorBox("Password is required", "Please provide a strong password.");
    } else if ($('#pic').get(0).files.length === 0) {
        dialog.showErrorBox("Image is required", "Please provide a valid image.");
    } else {
        const fs = require('fs');
        const path = require('path');
        var appPath = app.getAppPath();
        var oldFile = $("#filepath").html();
        var newFile = path.join(appPath, '/images/userImages/');
        var fname = $.now() + "." + oldFile.substring(oldFile.length - 3, oldFile.length);
        newFile = newFile + fname;
        console.log("oldFile" + oldFile);
        console.log("newFile" + newFile);
        console.log("fname" + fname);
        fs.copyFile(oldFile, newFile, (err) => {
                if (err) {
                    dialog.showErrorBox("", "Something went wrong while uploading the image. Please try again.");
                } else {

                    insertDataToUsers(email, name, mobile, mobile2, address, newFile, password, fs);

                }
            }
        );
    }
})
;

// signin
$("#signin-submit").click(function () {

    var email = $('#email').val();
    var password = $('#password').val();
    if (!email) {
        dialog.showErrorBox("Email missing", "Please provide a valid email id.");
    } else if (!password) {
        dialog.showErrorBox("Password is required", "Please provide your pasword.");
    } else {
        $('#signin').hide();
        $('.nav-wrapper').hide();
        $('.header').hide();
        $('#loader').fadeIn();
        // createDB()
        // insertDataToUsers(path, "aminov", "Mahamdi", "00", "01", "vfhghf", "454", "5222");
        checkLogIn(db_path, email, password);

    }
});
