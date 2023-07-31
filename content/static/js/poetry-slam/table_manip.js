var judgeCount = 3;
var poetCount = 1;

function addPoet() {
    poetCount++;
    var newPoetRow = `
        <div class="row text-center border-bottom pb-2 mb-2">
            <div class="col-2"><input type="text" class="form-control text-center"></div>
            <div class="col-6">
                <div class="row">
                    ${'<div class="col"><input type="text" class="form-control judge-input text-center" onkeypress="return /[0-9.]*/i.test(event.key)" inputmode="numeric" maxlength="3" placeholder="0.0"></div>'.repeat(judgeCount)}
                </div>
            </div>
            <div class="col-4">
                <div class="row">
                    <div class="col"><input type="text" class="form-control text-center total-score" disabled></div>
                    <div class="col">
                        <div class="time-input-container">
                            <input type="text" class="form-control time-input time-min text-center" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" inputmode="numeric" placeholder="00">
                            <span class="time-colon">:</span>
                            <input type="text" class="form-control time-input time-sec text-center" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" inputmode="numeric" placeholder="00">
                        </div>
                    </div>
                    <div class="col"><input type="text" class="form-control text-center total-time-score" disabled></div>
                </div>
            </div>
        </div>`;
    $('#slam-table').append(newPoetRow);
    updateLocalStorage();
    saveInputValues();
}

function clearTable() {
    judgeCount = 3;
    poetCount = 1;
    var initialRow = `
        <div class="row text-center border-bottom pb-2 mb-2">
            <div class="col-2"><input type="text" class="form-control text-center"></div>
            <div class="col-6">
                <div class="row">
                    ${'<div class="col"><input type="text" class="form-control judge-input text-center" onkeypress="return /[0-9.]*/i.test(event.key)" inputmode="numeric" maxlength="3" placeholder="0.0"></div>'.repeat(judgeCount)}
                </div>
            </div>
            <div class="col-4">
                <div class="row">
                    <div class="col"><input type="text" class="form-control text-center total-score" disabled></div>
                    <div class="col">
                        <div class="time-input-container">
                            <input type="text" class="form-control time-input time-min text-center" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" inputmode="numeric" placeholder="00">
                            <span class="time-colon">:</span>
                            <input type="text" class="form-control time-input time-sec text-center" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" inputmode="numeric" placeholder="00">
                        </div>
                    </div>
                    <div class="col"><input type="text" class="form-control text-center total-time-score" disabled></div>
                </div>
            </div>
        </div>`;
    $('#slam-table').html(initialRow);
    $('#judge-headers').html(`
        <div class="col">Judge 1</div>
        <div class="col">Judge 2</div>
        <div class="col">Judge 3</div>
    `);
    updateLocalStorage();
    localStorage.removeItem('inputValues'); // Clear the stored input values when the table is cleared
}

function addJudge() {
    judgeCount++;
    $('#slam-table').find('.row').each(function() {
        $(this).find('.row').first().append('<div class="col"><input type="text" class="form-control judge-input text-center" onkeypress="return /[0-9.]*/i.test(event.key)" inputmode="numeric" maxlength="3" placeholder="0.0"></div>');
    });
    $('#judge-headers').append('<div class="col">Judge' + judgeCount + '</div>');
    updateLocalStorage();
    saveInputValues();
}

function removePoet() {
    if ($('#slam-table > .row').length > 1) { // This ensures that we never remove the last remaining row
        $('#slam-table > .row').last().remove();
        poetCount--;
        updateLocalStorage();
        saveInputValues();
    }
}

function removeJudge() {
    if (judgeCount > 1) { // This ensures that we never remove the last remaining judge
        $('#slam-table').find('.row').each(function() {
            $(this).find('.row').first().children().last().remove();
        });
        $('#judge-headers').children().last().remove();
        judgeCount--;
        updateLocalStorage();
        saveInputValues();
    }
}
