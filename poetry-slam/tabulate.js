async function processZip() {
    const input = document.getElementById('zipFileInput');
    const file = input.files[0];
    const zip = await JSZip.loadAsync(file);
    const scores = {};

    for (const fileName in zip.files) {
        // Check if the file is a CSV file
        if (fileName.endsWith('.csv')) {
            const fileData = await zip.files[fileName].async("string");
            processCSV(fileData, scores);
        }
    }

    // Convert scores object to CSV and download
    downloadCSVTabulated(scores);
}


function processCSV(fileData, scores) {
    Papa.parse(fileData, {
        header: true,
        skipEmptyLines: true,
        beforeFirstChunk: function(chunk) {
            var rows = chunk.split(/\r\n|\r|\n/);
            rows.splice(0, 3); // Skip the first 3 lines
            return rows.join('\n');
        },
        complete: function(results) {
            results.data.forEach(row => {
                const { Poet: name, Email: email, Place: place } = row;

                if (['#1', '#2', '#3'].includes(place)) {
                    if (!scores[email]) {
                        scores[email] = { name, "#1": 0, "#2": 0, "#3": 0 };
                    }
                    scores[email][place]++;
                }
            });
        }
    });
}

function downloadCSVTabulated(scores) {
    const rows = Object.entries(scores).map(([email, data]) => ({
        email,
        name: data.name,
        "#1": data["#1"],
        "#2": data["#2"],
        "#3": data["#3"]
    }));

    // Convert to CSV format
    const csvContent = Papa.unparse(rows);

    // Create a link and download the CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "scores.csv");
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
