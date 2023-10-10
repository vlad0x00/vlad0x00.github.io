const parameterElements = [
    '#max-time-min',
    '#max-time-sec',
    '#time-penalty-step-min',
    '#time-penalty-step-sec',
    '#penalty-per-step'
];

function saveRowValues() {
    const poets = [];
    $('#slam-table-rows .poet-row').each(function() {
        const poetName = $(this).find('.poet-name').val();
        const poetEmail = $(this).find('.poet-email').val();
        const judgeInputs = $(this).find('.judge-input');
        const scores = judgeInputs.map(function() {
            return $(this).val();
        }).get();
        const timeMin = $(this).find('.time-min').val();
        const timeSec = $(this).find('.time-sec').val();
        poets.push({
            poetName: poetName,
            poetEmail: poetEmail,
            scores: scores,
            timeMin: timeMin,
            timeSec: timeSec
        });
    });
    localStorage.setItem('rowValues', JSON.stringify(poets));
}

function loadRowValues() {
    const poetsData = JSON.parse(localStorage.getItem('rowValues')) || [];

    $('#slam-table-rows .poet-row').each(function(index) {
        const poetData = poetsData[index];
        if (poetData) {
            $(this).find('.poet-name').val(poetData.poetName);
            $(this).find('.poet-email').val(poetData.poetEmail);
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
    parameterValues = {};
    for (const element of parameterElements) {
        parameterValues[element] = $(element).val();
    }
    localStorage.setItem('parameterValues', JSON.stringify(parameterValues));
}

function loadParameterValues() {
    const parameterValues = JSON.parse(localStorage.getItem('parameterValues')) || {};
    for (const element of parameterElements) {
        const val = parameterValues[element];
        if (val) {
            $(element).val(val);
        }
    }
}

function saveCounts() {
    localStorage.setItem('counts', JSON.stringify({
        poetCount: poetCount,
        judgeCount: judgeCount
    }));
}

function loadCounts() {
    counts = JSON.parse(localStorage.getItem('counts')) || {};
    if (counts.poetCount) {
        poetCount = counts.poetCount;
    }
    if (counts.judgeCount) {
        judgeCount = counts.judgeCount;
    }
}

function saveHistory() {
    history = {
        undoStack: undoStack,
        redoStack: redoStack
    };
    localStorage.setItem('history', JSON.stringify(history));
}

function loadHistory() {
    history = JSON.parse(localStorage.getItem('history')) || {};
    if (history.undoStack) {
        undoStack = history.undoStack;
    }
    if (history.redoStack) {
        redoStack = history.redoStack;
    }
}

function storageClearParameterValues() {
    localStorage.removeItem('parameterValues');
}

function storageClearRowValues() {
    localStorage.removeItem('rowValues');
}

function storageClearCounts() {
    localStorage.removeItem('counts');
}

function storageClear() {
    storageClearParameterValues();
    storageClearRowValues();
    storageClearCounts();
}

function loadAll() {
    loadCounts();
    loadParameterValues();
    renderTable();
    loadRowValues();
    updateAllRows();
    loadHistory();
}

function saveAll() {
    saveCounts();
    saveParameterValues();
    saveRowValues();
    saveHistory();
}
