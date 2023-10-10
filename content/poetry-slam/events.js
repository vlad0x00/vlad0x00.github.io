function focusChangeOnInput(event) {
    var inputVal = $(event.target).val();
    var maxLength = $(event.target).attr('maxlength');
    if (inputVal.length === parseInt(maxLength, 10)) {
        var allInputs = $(event.target).closest('.poet-row').find(':input').filter(function() {
            return !$(this).prop('disabled') && $(this).is(':visible') && $(this).attr('type') !== 'hidden';
        });
        var currentIndex = allInputs.index(event.target);
        if (currentIndex < allInputs.length - 1) {
            allInputs.eq(currentIndex + 1).focus();
        } else {
            // Unfocus the current element if there's no next element
            $(event.target).blur();
        }
    }
}

function handleRowInputChange(event) {
    updateHistory();
    updateAllRows();
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

    $(document).on('input', '.judge-input, .time-min, .time-sec', focusChangeOnInput);

    $(document).on('change', '.poet-name, .poet-email, .judge-input, .time-min, .time-sec', handleRowInputChange);

    $(document).on('change', '#max-time-min, #max-time-sec, #time-penalty-step-min, #time-penalty-step-sec, #penalty-per-step', handleParametersChange);
});
