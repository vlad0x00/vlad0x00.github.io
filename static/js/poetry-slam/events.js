function handleTimeMinInput(event) {
    var inputVal = $(event.target).val();
    if (inputVal.length === 2) {
        $(event.target).nextAll('.time-sec').first().focus();
    }
}

function handleRowInputEvent(event) {
    var row = $(event.target).closest('.poet-row'); 
    updateRow(row);
    saveRowValues();
}

function handleParametersChanged() {
    updateAllRows();
    saveParameterValues();
}

$(document).ready(function() {
    loadCounts();
    loadParameterValues();
    renderTable();
    loadRowValues();
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
    $('#download-csv').click(downloadCSV);

    $(document).on('change', '.time-min', handleTimeMinInput);

    $(document).on('change input', '.judge-input, .time-min, .time-sec', handleRowInputEvent);

    $(document).on('change input', '#max-time-min, #max-time-sec, #penalty-step-time-min, #penalty-step-time-sec, #time-penalty', handleParametersChanged);
});
