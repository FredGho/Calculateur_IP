function hiddenResult() {
    var x = document.getElementById('resultat-id');
    if (x.style.visibility === 'hidden') {
        x.style.visibility = 'visible';
    } else {
        x.style.visibility = 'visible';
    }
}

function reloadResult() {
    window.location.reload(true);
}

function hideButton() {
    var y = document.getElementById('btncalc-id');
    if (y.style.visibility === "visible") {
        y.style.visibility = "hidden";
    } 
    else {
        y.style.visibility = "hidden";
    }
}

window.onbeforeunload = function goTop() {
    window.scrollTo(0, 0);
  }

