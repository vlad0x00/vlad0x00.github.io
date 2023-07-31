function loadFromLocalStorage() {
    if(localStorage.getItem('table')) {
        $('#slam-table').html(localStorage.getItem('table'));
        $('#judge-headers').html(localStorage.getItem('headers'));
        judgeCount = $('#slam-table .row:first .judge-input').length;
    }
    if(localStorage.getItem('max-time-min')) {
        $('#max-time-min').val(localStorage.getItem('max-time-min'));
    }
    if(localStorage.getItem('max-time-sec')) {
        $('#max-time-sec').val(localStorage.getItem('max-time-sec'));
    }
    if(localStorage.getItem('penalty-step-time-min')) {
        $('#penalty-step-time-min').val(localStorage.getItem('penalty-step-time-min'));
    }
    if(localStorage.getItem('penalty-step-time-sec')) {
        $('#penalty-step-time-sec').val(localStorage.getItem('penalty-step-time-sec'));
    }
    if(localStorage.getItem('time-penalty')) {
        $('#time-penalty').val(localStorage.getItem('time-penalty'));
    }
}

function updateLocalStorage() {
    localStorage.setItem('table', $('#slam-table').html());
    localStorage.setItem('headers', $('#judge-headers').html());
    localStorage.setItem('max-time-min', $('#max-time-min').val());
    localStorage.setItem('max-time-sec', $('#max-time-sec').val());
    localStorage.setItem('penalty-step-time-min', $('#penalty-step-time-min').val());
    localStorage.setItem('penalty-step-time-sec', $('#penalty-step-time-sec').val());
    localStorage.setItem('time-penalty', $('#time-penalty').val());
}

function saveInputValues() {
    var values = [];
    $('input').each(function() {
        values.push($(this).val());
    });
    localStorage.setItem('inputValues', JSON.stringify(values));
}

function loadInputValues() {
    var values = JSON.parse(localStorage.getItem('inputValues')) || [];
    var inputs = $('input');
    for (var i = 0; i < values.length; i++) {
        if(inputs[i] !== undefined) {
            inputs[i].value = values[i];
        }
    }
}
