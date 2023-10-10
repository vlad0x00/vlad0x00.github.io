const MAX_HISTORY_SIZE = 10;  // Set the limit for undo and redo stacks

let undoStack = [];
let redoStack = [];

function captureState() {
    return {
        counts: JSON.parse(localStorage.getItem('counts')),
        rowValues: JSON.parse(localStorage.getItem('rowValues')),
        parameterValues: JSON.parse(localStorage.getItem('parameterValues')),
    };
}

function loadState(state) {
    localStorage.setItem('counts', JSON.stringify(state.counts));
    localStorage.setItem('rowValues', JSON.stringify(state.rowValues));
    localStorage.setItem('parameterValues', JSON.stringify(state.parameterValues));
}

function updateHistory() {
    undoStack.push(captureState());
    while (undoStack.length > MAX_HISTORY_SIZE) {  // Ensure undoStack never exceeds the limit
        undoStack.shift();
    }
    redoStack = [];  // Clear the redo stack on new action
    saveHistory();
    localStorage.setItem('lastModified', Date.now());
}

function undo() {
    if (undoStack.length === 0) return;

    // Move current state to redo stack
    redoStack.push(captureState());
    while (redoStack.length > MAX_HISTORY_SIZE) {  // Ensure redoStack never exceeds the limit
        redoStack.shift();
    }

    // Load previous state from undo stack
    const prevState = undoStack.pop();
    storageClear();
    loadState(prevState);

    loadAll();
    saveHistory();
}

function redo() {
    if (redoStack.length === 0) return;

    // Move current state to undo stack
    undoStack.push(captureState());
    while (undoStack.length > MAX_HISTORY_SIZE) {  // Ensure undoStack never exceeds the limit
        undoStack.shift();
    }

    // Load next state from redo stack
    const nextState = redoStack.pop();
    storageClear();
    loadState(nextState);

    loadAll();
    saveHistory();
}
