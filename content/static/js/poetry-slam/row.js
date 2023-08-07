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
    var timePenaltyStepMin = parseInt($('#time-penalty-step-min').val());
    var timePenaltyStepSec = parseInt($('#time-penalty-step-sec').val());
    var penaltyPerStep = parseFloat($('#penalty-per-step').val());

    // Parse the "Time" input for this row
    var timeMin = parseInt(row.find('.time-min').val());
    var timeSec = parseInt(row.find('.time-sec').val());

    // Check that all values are valid numbers before performing calculation
    if (!isNaN(maxTimeMin) && !isNaN(maxTimeSec) && !isNaN(timePenaltyStepMin) && !isNaN(timePenaltyStepSec) && !isNaN(penaltyPerStep) && !isNaN(timeMin) && !isNaN(timeSec) && !isNaN(total)) {
        var maxTime = maxTimeMin * 60 + maxTimeSec;
        var timePenaltyStep = timePenaltyStepMin * 60 + timePenaltyStepSec;
        var time = timeMin * 60 + timeSec;

        var penalty = Math.ceil((time - maxTime) / timePenaltyStep) * penaltyPerStep;
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

function updateAllRows() {
    $('#slam-table-rows .poet-row').each(function() {
        updateRow($(this));
    });
}

function getRowData(row) {
    var poetName = row.find('.poet-name').val();
    var judgeInputs = row.find('.judge-input');
    var scores = judgeInputs.map(function() {
        return $(this).val();
    }).get();
    var timeMin = row.find('.time-min').val();
    var timeSec = row.find('.time-sec').val();
    var totalScore = row.find('.total-score').val();
    var totalMinusTimeScore = row.find('.total-time-score').val();
    return {
        poetName: poetName,
        scores: scores,
        timeMin: timeMin,
        timeSec: timeSec,
        totalScore: totalScore,
        totalMinusTimeScore: totalMinusTimeScore
    };
}

function getAllRowsData() {
    var data = [];
    $('#slam-table-rows .poet-row').each(function() {
        data.push(getRowData($(this)));
    });
    return data;
}
