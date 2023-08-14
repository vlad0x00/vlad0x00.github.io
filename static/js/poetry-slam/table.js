let judgeCount = 3;
let poetCount = 1;

function getHeaderHTML(judgeCount) {
    return `
    <div class="header">
        <div class="d-flex flex-wrap text-center border-bottom pb-2 mb-2">
            <div class="col-12 col-sm-2">
                Poet
            </div>
            <div class="col-12 col-sm-6">
                <div class="row">
                    ${Array.from({ length: judgeCount }, (_, i) => `<div class="col">Judge ${i + 1}</div>`).join('')}
                </div>
            </div>
            <div class="col-12 col-sm-4">
                <div class="row">
                    <div class="col">Total</div>
                    <div class="col">Time</div>
                    <div class="col">Total - Time</div>
                </div>
            </div>
        </div>
    </div>`;
}

function getJudgeHTML() {
    return `<div class="col"><input type="text" class="form-control judge-input text-center" onkeypress="return /[0-9.]*/i.test(event.key)" inputmode="numeric" maxlength="3" placeholder="0.0"></div>`;
}

function getTimeHTML() {
    return `
    <div class="col">
        <div class="time-input-container">
            <input type="text" class="form-control time-input time-min text-center" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" inputmode="numeric" placeholder="00">
            <span class="time-colon">:</span>
            <input type="text" class="form-control time-input time-sec text-center" onkeypress="return /[0-9]/i.test(event.key)" maxlength="2" inputmode="numeric" placeholder="00">
        </div>
    </div>`;
}

function getRowHTML(judgeCount) {
    return `
    <div class="poet-row">
        <div class="d-flex flex-wrap text-center border-bottom pb-2 mb-2">
            <div class="col-12 col-sm-2"><input type="text" class="form-control text-center poet-name"></div>
            <div class="col-12 col-sm-6"><div class="row">${getJudgeHTML().repeat(judgeCount)}</div></div>
            <div class="col-12 col-sm-4">
                <div class="row">
                    <div class="col"><input type="text" class="form-control text-center total-score" disabled></div>
                    ${getTimeHTML()}
                    <div class="col"><input type="text" class="form-control text-center total-time-score" disabled></div>
                </div>
            </div>
        </div>
    </div>`;
}

function renderTable() {
    const header = getHeaderHTML(judgeCount);
    $('#slam-table-header').html(header);

    const rows = Array.from({ length: poetCount }, () => getRowHTML(judgeCount)).join('');
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
    updateHistory();
    judgeCount++;
    saveRowValues();
    renderTable();
    loadRowValues();
    saveCounts();
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
    judgeCount = 3;
    poetCount = 1;
    storageClearRowValues();
    saveCounts();
    renderTable();
}

function downloadCSV() {
    let csvContent = 'data:text/csv;charset=utf-8,';
    // Write human readable headers
    csvContent += 'Max Time,Time Penalty Step,Penalty Per Step\n';

    // Write parameter values
    let maxTimeMin = $('#max-time-min').val();
    let maxTimeSec = $('#max-time-sec').val();
    // Convert seconds to ss format
    if (maxTimeSec < 10) {
        maxTimeSec = '0' + maxTimeSec;
    }

    let timePenaltyStepMin = $('#time-penalty-step-min').val();
    let timePenaltyStepSec = $('#time-penalty-step-sec').val();
    // Convert seconds to ss format
    if (timePenaltyStepSec < 10) {
        timePenaltyStepSec = '0' + timePenaltyStepSec;
    }

    let penaltyPerStep = $('#penalty-per-step').val();

    csvContent += `${maxTimeMin}:${maxTimeSec},${timePenaltyStepMin}:${timePenaltyStepSec},${penaltyPerStep}\n`;

    // Separate parameters from data with a blank line
    csvContent += '\n';

    csvContent += 'Poet';
    for (let i = 1; i <= judgeCount; i++) {
        csvContent += `,Judge ${i}`;
    }
    csvContent += ',Total,Time,Total - Time\n';
    rowsData = getAllRowsData();

    for (let i = 0; i < poetCount; i++) {
        const poetData = rowsData[i];
        csvContent += poetData.poetName;
        for (const score of poetData.scores) {
            csvContent += `,${score}`;
        }
        csvContent += `,${poetData.totalScore}`;

        // If poetData.timeSec is not empty, prepend a 0 if it's less than 10
        const timeSec = poetData.timeSec ? (poetData.timeSec < 10 ? '0' + poetData.timeSec : poetData.timeSec) : '';
        // If both timeSec and timeMin are not empty, insert a colon between them, otherwise write a question mark
        const time = poetData.timeMin && timeSec ? `${poetData.timeMin}:${timeSec}` : '?';

        csvContent += `,${time}`;

        csvContent += `,${poetData.totalMinusTimeScore}\n`;
    }

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "poetry_slam.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
