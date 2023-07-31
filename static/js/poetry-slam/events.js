function updateRowTotal(row) {
    var judgeInputs = row.find('.judge-input'); // Get all judge inputs in this row
    
    var total = 0;
    // Bool to check if all inputs are valid
    var allValid = true;
    judgeInputs.each(function() {
        var value = $(this).val();
        if ($.isNumeric(value)) {
            total += parseFloat(value);
        } else {
            allValid = false;
        }
    });

    //var totalCell = row.find('.col-4 .row .col').first().find('input');
    var totalCell = row.find('.total-score');
    if (allValid) {
        totalCell.val(total.toFixed(1));
    } else {
        totalCell.val('?');
    }
}

function updateRowTotalMinusTime(row) {
    var totalTimeCell = row.find('.total-time-score'); // Get the "Total - Time" cell in this row
    var total = row.find('.total-score').val(); // Get the "Total" cell in this row

    var maxTimeMin = parseInt($('#max-time-min').val());
    var maxTimeSec = parseInt($('#max-time-sec').val());
    var penaltyStepTimeMin = parseInt($('#penalty-step-time-min').val());
    var penaltyStepTimeSec = parseInt($('#penalty-step-time-sec').val());
    var timePenalty = parseFloat($('#time-penalty').val());

    // Parse the "Time" input for this row
    var timeMin = parseInt(row.find('.time-min').val());
    var timeSec = parseInt(row.find('.time-sec').val());

    // Check that all values are valid numbers before performing calculation
    if (!isNaN(maxTimeMin) && !isNaN(maxTimeSec) && !isNaN(penaltyStepTimeMin) && !isNaN(penaltyStepTimeSec) && !isNaN(timePenalty) && !isNaN(timeMin) && !isNaN(timeSec)) {
        var maxTime = maxTimeMin * 60 + maxTimeSec;
        var penaltyStepTime = penaltyStepTimeMin * 60 + penaltyStepTimeSec;
        var time = timeMin * 60 + timeSec;

        var penalty = Math.ceil((time - maxTime) / penaltyStepTime) * timePenalty;
        if (penalty < 0) {
            penalty = 0;
        }

        var result = total - penalty;

        // Update the "Total - Time" cell
        totalTimeCell.val(result.toFixed(1));
    } else {
        totalTimeCell.val('?');
    }
}

function updateRow(row) {
    updateRowTotal(row);
    updateRowTotalMinusTime(row);
}

$(document).ready(function() {
    $(document).on('input', '.time-min', function() {
        var inputVal = $(this).val();
        if(inputVal.length === 2){
            $(this).nextAll('.time-sec').first().focus();
        }
    });

    $(document).on('input', '.judge-input, .time-min, .time-sec', function() {
        var row = $(this).closest('.row.text-center'); // Get the row containing the changed input
        updateRow(row);
    });
    
    $(document).on('input', '#max-time-min, #max-time-sec, #penalty-step-time-min, #penalty-step-time-sec, #time-penalty', function() {
        $('.row.text-center').each(function() {
            updateRow($(this));
        });
    });

    $('#slam-table, #max-time-min, #max-time-sec, #time-penalty, #penalty-step-time-min, #penalty-step-time-sec').on('change', function() {
        updateLocalStorage();
        saveInputValues();
    });
});
