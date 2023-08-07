const parameterElements = [
    '#max-time-min',
    '#max-time-sec',
    '#penalty-step-time-min',
    '#penalty-step-time-sec',
    '#time-penalty'
];

function saveRowValues() {
    const poets = [];
    $('#slam-table-rows .row.text-center').each(function() {
        const poetName = $(this).find('.poet-name').val();
        const judgeInputs = $(this).find('.judge-input');
        const scores = judgeInputs.map(function() {
            return $(this).val();
        }).get();
        const timeMin = $(this).find('.time-min').val();
        const timeSec = $(this).find('.time-sec').val();
        poets.push({
            poetName: poetName,
            scores: scores,
            timeMin: timeMin,
            timeSec: timeSec
        });
    });
    localStorage.setItem('rowValues', JSON.stringify(poets));
}

function loadRowValues() {
    const poetsData = JSON.parse(localStorage.getItem('rowValues')) || [];

    $('#slam-table-rows .row.text-center').each(function(index) {
        const poetData = poetsData[index];
        if (poetData) {
            $(this).find('.poet-name').val(poetData.poetName);
            const judgeInputs = $(this).find('.judge-input');
            poetData.scores.forEach((score, i) => {
                if (judgeInputs[i]) {
                    judgeInputs[i].value = score;
                }
            });
            $(this).find('.time-min').val(poetData.timeMin);
            $(this).find('.time-sec').val(poetData.timeSec);
        }
    });
    updateAllRows();
}

function saveParameterValues() {
    for (const element of parameterElements) {
        localStorage.setItem(element, $(element).val());
    }
}

function loadParameterValues() {
    for (const element of parameterElements) {
        val = localStorage.getItem(element);
        if (val) {
            $(element).val(val);
        }
    }
}

function saveCounts() {
    localStorage.setItem('poetCount', poetCount);
    localStorage.setItem('judgeCount', judgeCount);
}

function loadCounts() {
    val = localStorage.getItem('poetCount');
    if (val) {
        poetCount = val;
    }

    val = localStorage.getItem('judgeCount');
    if (val) {
        judgeCount = val;
    }
}

function loadAll() {
    loadCounts();
    loadParameterValues();
    loadRowValues();
}

function saveAll() {
    saveCounts();
    saveParameterValues();
    saveRowValues();
}

function clearRowValues() {
    localStorage.removeItem('rowValues');
}
