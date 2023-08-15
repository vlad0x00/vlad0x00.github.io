function handleTimeMinChange(event) {
    var inputVal = $(event.target).val();
    if (inputVal.length === 2) {
        $(event.target).nextAll('.time-sec').first().focus();
    }
}

function handleRowInputChange(event) {
    console.log("okay?");
    updateHistory();
    var row = $(event.target).closest('.poet-row'); 
    updateRow(row);
    saveRowValues();
}

function handleParametersChange() {
    updateHistory();
    updateAllRows();
    saveParameterValues();
}

$(document).ready(function() {
    loadAll();

    // If the undo stack is empty, add the current state
    if (undoStack.length === 0) {
        saveAll();
        updateHistory();
    } else {
        loadHistory();
    }

    updateAllRows();

    $('#add-poet').click(addPoet);
    $('#add-judge').click(addJudge);
    $('#remove-poet').click(removePoet);
    $('#remove-judge').click(removeJudge);
    $('#clear-table').click(function() {
        var confirmation = window.confirm("Are you sure you want to clear the table?");
        if (confirmation) {
            clearTable();
        }
    });
    $('#undo').click(undo);
    $('#redo').click(redo);
    $('#download-csv').click(downloadCSV);

    $(document).on('change', '.time-min', handleTimeMinChange);

    $(document).on('change', '.poet-name, .judge-input, .time-min, .time-sec', handleRowInputChange);

    $(document).on('change', '#max-time-min, #max-time-sec, #time-penalty-step-min, #time-penalty-step-sec, #penalty-per-step', handleParametersChange);
});
