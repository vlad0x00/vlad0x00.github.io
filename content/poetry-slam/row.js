function updateRowPlace(row, place) {
    // If place is 0, do nothing (for sacrificial poets)
    if (place === 0) {
        return;
    }

    row.find('.place').val('#' + place);
    // If place is 1, set the color to gold, silver for 2, and bronze for 3
    // Color the background of the place cell
    if (place === 1) {
        row.find('.place').css('background-color', '#FFD700');
    } else if (place === 2) {
        row.find('.place').css('background-color', '#C0C0C0');
    } else if (place === 3) {
        row.find('.place').css('background-color', '#CD7F32');
    } else {
        row.find('.place').css('background-color', 'white');
    }
}

function updateRowTotal(row) {
    var judgeInputs = row.find('.judge-input'); // Get all judge inputs in this row
    
    var total = 0;
    // Bool to check if all inputs are valid
    var allValid = true;
    var minScore = -1;
    var minScoreIdx = -1;
    var maxScore = -1;
    var maxScoreIdx = -1;
    var idx = 0;
    judgeInputs.each(function() {
        var value = $(this).val();
        if ($.isNumeric(value)) {
            if (minScore === -1 || value < minScore) {
                minScore = value;
                minScoreIdx = idx;
            }
            if (maxScore === -1 || value > maxScore) {
                maxScore = value;
                maxScoreIdx = idx;
            }
            total += parseFloat(value);
        } else {
            allValid = false;
        }
        idx++;
    });

    // If all inputs are valid and we have 5 judges, subtract the min and max scores
    if (allValid) {
        if (judgeInputs.length === 5) {
            total -= minScore;
            total -= maxScore;
        } else if (judgeInputs.length === 4) {
            total -= minScore;
        }

        // Color the text of min and max score inputs red
        // Only color at most one of each
        // If all scores are the same, still color two inputs
        var idx = 0;
        judgeInputs.each(function() {
            if ((judgeInputs.length === 5 && (idx === minScoreIdx || idx === maxScoreIdx)) || (judgeInputs.length === 4 && idx === minScoreIdx)) {
                $(this).css('color', 'red');
            } else {
                $(this).css('color', 'black');
            }
            idx++;
        });
    }

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

function updateAllRows() {
    // Update scores
    $('#slam-table-rows .poet-row').each(function() {
        updateRowTotal($(this));
        updateRowTotalMinusTime($(this));
    });

    // Get row total scores after time in a list
    var rows = [];
    var n = 0;
    $('#slam-table-rows .poet-row').each(function() {
        var totalMinusTime = parseFloat($(this).find('.total-time-score').val());
        rows.push({
            row_num: n++,
            row: $(this),
            totalMinusTime: totalMinusTime
        });
    });

    // Sort the list by total score, descending
    rows.sort(function(a, b) {
        return b.totalMinusTime - a.totalMinusTime;
    });

    // Update rows
    place = 1;
    for (var i = 0; i < rows.length; i++) {
        // Use place 0 for row nums < sacrificial poet count
        if (rows[i].row_num < SACRIFICIAL_POET_COUNT) {
            updateRowPlace(rows[i].row, 0);
        } else {
            updateRowPlace(rows[i].row, place);
            place++;
        }
    }
}

function getRowData(row) {
    var place = row.find('.place').val();
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
        place: place,
        poetName: poetName,
        scores: scores,
        totalScore: totalScore,
        timeMin: timeMin,
        timeSec: timeSec,
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
