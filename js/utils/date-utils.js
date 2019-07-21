// automatic fill of post dates (after 17 or 21 days)
function changeDate(id) {
    var tt;
    if (id === 0) {
        tt = document.getElementById('batch_start_date').value;
        // let pastDate = new Date(tt);
        // let delta = getTimeRemaining(pastDate, daysForStep2);
        // console.log(delta.days);
        // if (delta.days < daysForStep2 && delta.days >= 0) {
        //     console.log("here");
        //     document.getElementById('state').value = 'TEST';
        // }
    } else if (id === 1) {
        tt = document.getElementById('edit-batch_start_date').value;
    }
    var date = new Date(tt);
    var newDateAfter17 = new Date(date);
    var newDateAfter21 = new Date(date);
    newDateAfter17.setHours(newDateAfter17.getHours() - newDateAfter17.getTimezoneOffset() / 60);
    newDateAfter17.setDate(newDateAfter17.getDate() + 17);
    newDateAfter21.setHours(newDateAfter21.getHours() - newDateAfter17.getTimezoneOffset() / 60);
    newDateAfter21.setDate(newDateAfter21.getDate() + 21);
    var dateValueAfter17 = new Date(newDateAfter17).toJSON().slice(0, 16);
    var dateValueAfter21 = new Date(newDateAfter21).toJSON().slice(0, 16);
    if (id === 0) {
        document.getElementById('batch_17_date').value = dateValueAfter17;
        document.getElementById('batch_4_date').value = dateValueAfter21;
        document.getElementById("batch_4_date").classList.remove("hidden");
        document.getElementById("batch_17_date").classList.remove("hidden");

    } else if (id === 1) {
        document.getElementById('edit-batch_17_date').value = dateValueAfter17;
        document.getElementById('edit-batch_4_date').value = dateValueAfter21;
        document.getElementById("edit-batch_4_date").classList.remove("hidden");
        document.getElementById("edit-batch_17_date").classList.remove("hidden");
    }

}

// invert the date in the UTC format
function FormatDate(t) {
    let i = [];
    let j = [];
    i[0] = t[8];
    i[1] = t[9];
    i[2] = '-';
    i[3] = t[5];
    i[4] = t[6];
    i[5] = '-';
    i[6] = t[0];
    i[7] = t[1];
    i[8] = t[2];
    i[9] = t[3];
    // j[0]=t[0];
    return i.join('');
}

//calculate remaining days from the moment to reach delay

function getTimeRemaining(endtime, delay) {
    var t = -Date.parse(endtime) + Date.parse(new Date());
    t = delay * 24 * 60 * 60 * 1000 - t;
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}