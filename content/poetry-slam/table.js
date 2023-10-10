const INITIAL_JUDGE_COUNT = 3;
const INITIAL_POET_COUNT = 2;
const SACRIFICIAL_POET_COUNT = 1;
const MAX_JUDGE_COUNT = 5;

let judgeCount = INITIAL_JUDGE_COUNT;
let poetCount = INITIAL_POET_COUNT;

function getHeaderHTML(judgeCount) {
    return `
    <div class="header">
        <div class="d-flex flex-wrap text-center border-bottom pb-2 mb-2">
            <div class="col-12 col-sm-1">
                Place
            </div>
            <div class="col-12 col-sm-3 ps-1 pe-1">
                <div class="row">
                    <div class="col-6 col-sm-6 ps-6 pe-1">Poet</div>
                    <div class="col-6 col-sm-6 ps-1 pe-6">Email</div>
                </div>
            </div>
            <div class="col-12 col-sm-5">
                <div class="row">
                    ${Array.from({ length: judgeCount }, (_, i) => `<div class="col">Judge ${i + 1}</div>`).join('')}
                </div>
            </div>
            <div class="col-12 col-sm-3">
                <div class="row">
                    <div class="col">Total</div>
                    <div class="col">Time</div>
                    <div class="col">Total - Time</div>
                </div>
            </div>
        </div>
    </div>`;
}

function getJudgeInputHTML() {
    return `<div class="col"><input type="text" class="form-control judge-input text-center" onkeypress="return /[0-9.]*/i.test(event.key)" inputmode="decimal" maxlength="3" placeholder="0.0"></div>`;
}

function getTimeInputHTML() {
    return `
    <div class="col">
        <div class="time-input-container">
            <input type="text" class="form-control time-input time-min text-center" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" inputmode="numeric" placeholder="00">
            <span class="time-colon">:</span>
            <input type="text" class="form-control time-input time-sec text-center" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" inputmode="numeric" placeholder="00">
        </div>
    </div>`;
}

function getRowHTML(judgeCount, bgColor = "transparent") {
    return `
    <div class="poet-row" style="background-color: ${bgColor}">
        <div class="d-flex flex-wrap text-center border-bottom pb-1 pt-1 mb-1 mt-1">
            <div class="col-12 col-sm-1 ps-1 pe-1">
                <input type="text" class="form-control text-center place" disabled>
            </div>
            <div class="col-12 col-sm-3 ps-1 pe-1">
                <div class="row">
                    <div class="col-6 col-sm-6 ps-6 pe-1"><input type="text" class="form-control text-center poet-name"></div>
                    <div class="col-6 col-sm-6 ps-1 pe-6"><input type="email" class="form-control text-center poet-email"></div>
                </div>
            </div>
            <div class="col-12 col-sm-5 ps-1 pe-1"><div class="row">${getJudgeInputHTML().repeat(judgeCount)}</div></div>
            <div class="col-12 col-sm-3 ps-1 pe-1">
                <div class="row">
                    <div class="col"><input type="text" class="form-control text-center total-score" disabled></div>
                    ${getTimeInputHTML()}
                    <div class="col"><input type="text" class="form-control text-center total-time-score" disabled></div>
                </div>
            </div>
        </div>
    </div>`;
}

function renderTable() {
    const header = getHeaderHTML(judgeCount);
    $('#slam-table-header').html(header);

    const rows = Array.from({ length: poetCount }, (_, i) => {
        let color;
        if (i < SACRIFICIAL_POET_COUNT) {
          color = '#FF7979';
        } else if (i % 2 === 0) {
          color = 'white';
        } else {
          color = '#E8E8E8';
        }
        return getRowHTML(judgeCount, color);
    }).join('');

    $('#slam-table-rows').html(rows);
}

function addPoet() {
    updateHistory();
    poetCount++;
    saveRowValues();
    renderTable();
    loadRowValues();
    saveCounts();
}

function addJudge() {
    if (judgeCount < MAX_JUDGE_COUNT) {
        updateHistory();
        judgeCount++;
        saveRowValues();
        renderTable();
        loadRowValues();
        saveCounts();
    }
}

function removePoet() {
    if (poetCount > 1) {
        updateHistory();
        poetCount--;
        saveRowValues();
        renderTable();
        loadRowValues();
        saveCounts();
    }
}

function removeJudge() {
    if (judgeCount > 1) {
        updateHistory();
        judgeCount--;
        saveRowValues();
        renderTable();
        loadRowValues();
        saveCounts();
    }
}

function clearTable() {
    updateHistory();
    judgeCount = INITIAL_JUDGE_COUNT;
    poetCount = INITIAL_POET_COUNT;
    storageClearRowValues();
    saveCounts();
    renderTable();
    updateAllRows();
}
