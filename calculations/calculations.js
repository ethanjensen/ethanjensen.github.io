import { get_formatted_graded_autos } from './compute_graded_auto_groups.js';

let matrixTable = null;

document.getElementById("generateBtn").addEventListener("click", () => {
    const n = parseInt(document.getElementById("matrixSize").value);

    if (!Number.isInteger(n) || n <= 0 || n >= 20) {
        alert("Please enter a positive integer less than 20.");
        return;
    }

    // Build column definitions
    const columns = [];
    for (let j = 0; j < n; j++) {
        columns.push({
            title: `C${j+1}`,
            field: `c${j}`,
            editor: "input",
            minWidth: 40,
            width: 40,
            maxWidth: 40,
            hozAlign: "center"
        });
    }

    // Build empty rows
    const data = [];
    for (let i = 0; i < n; i++) {
        const row = {};
        for (let j = 0; j < n; j++) {
            row[`c${j}`] = "";   // blank cell
        }
        data.push(row);
    }

    // Destroy old table if it exists
    if (matrixTable) {
        matrixTable.destroy();
    }

    // Create new Tabulator table
    matrixTable = new Tabulator("#matrixTable", {
        data: data,
        columns: columns,
        layout: "fitData",
        reactiveData: true,
        height: "auto"
    });
});

function getMatrix() {
    const raw = matrixTable.getData();
    const matrix = [];

    for (const row of raw) {
        const values = Object.values(row);

        // Check for empty cells
        if (values.some(v => v === "")) {
            return null;   // signal incomplete table
        }

        matrix.push(values);
    }

    return matrix;
}

function matricesToLatex(matrices) {
    // matrices is an array of 2D arrays
    return matrices.map(matrix => {
        const rows = matrix
            .map(row => row.join(" & "))
            .join(" \\\\ ");

        return `
\

\[
\\begin{bmatrix}
${rows}
\\end{bmatrix}
\\]


        `;
    }).join(",\ ");
}

document.getElementById("processBtn").addEventListener("click", () => {
    const matrix = getMatrix();

    if (!matrix) {
        alert("Please fill in all entries before processing.");
        return;
    }

    const result = get_formatted_graded_autos(matrix);
    console.log(result)
    const latex = matricesToLatex(result);
    const out = document.getElementById("automorphisms");
    out.innerHTML = latex;
    MathJax.typesetPromise();
});


function download(filename, text) {
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

document.getElementById("downloadBtn").addEventListener("click", () => {
    const matrix = getMatrix();

    if (!matrix) {
        alert("Please fill in all entries before processing.");
        return;
    }

    const output = get_formatted_graded_autos(matrix);
    download("result.txt", output);
});