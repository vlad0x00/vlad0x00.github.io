function downloadCSV() {
    // Write human readable headers
    csvContent = 'Max Time,Time Penalty Step,Penalty Per Step\n';

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

    csvContent += 'Place,Poet';
    for (let i = 1; i <= judgeCount; i++) {
        csvContent += `,Judge ${i}`;
    }
    csvContent += ',Total,Time,Total - Time\n';
    rowsData = getAllRowsData();

    for (let i = 0; i < poetCount; i++) {
        const poetData = rowsData[i];
        csvContent += `${poetData.place},${poetData.poetName}`;

        // If there are 5 judges, find min and max scores
        if (judgeCount === 5) {
            const minScore = Math.min(...poetData.scores);
            const maxScore = Math.max(...poetData.scores);

            // Check if scores are all valid
            let allValid = true;
            for (const score of poetData.scores) {
                // Check if score is an empty string
                if (score === '') {
                    allValid = false;
                    break;
                }
            }

            // Surround min and max scores with parentheses
            var minScoreFound = false;
            var maxScoreFound = false;
            for (const score of poetData.scores) {
                if (score == minScore && !minScoreFound && allValid) {
                    csvContent += `,"(${score})"`;
                    minScoreFound = true;
                } else if (score == maxScore && !maxScoreFound && allValid) {
                    csvContent += `,"(${score})"`;
                    maxScoreFound = true;
                } else {
                    csvContent += `,${score}`;
                }
            }
        } else {
            for (const score of poetData.scores) {
                csvContent += `,${score}`;
            }
        }
        csvContent += `,${poetData.totalScore}`;

        // If poetData.timeSec is not empty, prepend a 0 if it's less than 10
        const timeSec = poetData.timeSec ? (poetData.timeSec < 10 ? '0' + poetData.timeSec : poetData.timeSec) : '';
        // If both timeSec and timeMin are not empty, insert a colon between them, otherwise write a question mark
        const time = poetData.timeMin && timeSec ? `${poetData.timeMin}:${timeSec}` : '?';

        csvContent += `,${time}`;

        csvContent += `,${poetData.totalMinusTimeScore}\n`;
    }

    const date = new Date();
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "poetry-slam-" + formattedDate + ".csv");
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
}
