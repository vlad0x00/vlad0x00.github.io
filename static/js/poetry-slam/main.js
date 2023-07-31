$(document).ready(function() {
    loadFromLocalStorage();
    loadInputValues();

    if($('#slam-table .row').length === 0) {
        addPoet();
    }

    $('#remove-poet').click(function() {
        removePoet();
    });

    $('#add-poet').click(function() {
        addPoet();
    });

    $('#add-judge').click(function() {
        addJudge();
    });

    $('#remove-judge').click(function() {
        removeJudge();
    });

    $('#clear-table').click(function() {
        var confirmation = window.confirm("Are you sure you want to clear the table?");
        if (confirmation) {
            clearTable();
        }
    });
});
