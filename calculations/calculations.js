import { get_formatted_graded_autos } from './compute_graded_auto_groups.js';

//define data array
var tabledata = [
    {id:1, name:"Oli Bob", progress:12, gender:"male", rating:1, col:"red", dob:"19/02/1984", car:1},
    {id:2, name:"Mary May", progress:1, gender:"female", rating:2, col:"blue", dob:"14/05/1982", car:true},
    {id:3, name:"Christine Lobowski", progress:42, gender:"female", rating:0, col:"green", dob:"22/05/1982", car:"true"},
    {id:4, name:"Brendon Philips", progress:100, gender:"male", rating:1, col:"orange", dob:"01/08/1980"},
    {id:5, name:"Margret Marmajuke", progress:16, gender:"female", rating:5, col:"yellow", dob:"31/01/1999"},
    {id:6, name:"Frank Harbours", progress:38, gender:"male", rating:4, col:"red", dob:"12/05/1966", car:1},
];

var table = new Tabulator("#example-table", {
    data:tabledata,           //load row data from array
    layout:"fitColumns",      //fit columns to width of table
    responsiveLayout:"hide",  //hide columns that don't fit on the table
    addRowPos:"top",          //when adding a new row, add it to the top of the table
    history:true,             //allow undo and redo actions on the table
    pagination:"local",       //paginate the data
    paginationSize:7,         //allow 7 rows per page of data
    paginationCounter:"rows", //display count of paginated rows in footer
    movableColumns:true,      //allow column order to be changed
    initialSort:[             //set the initial sort order of the data
        {column:"name", dir:"asc"},
    ],
    columnDefaults:{
        tooltip:true,         //show tool tips on cells
    },
    columns:[                 //define the table columns
        {title:"Name", field:"name", editor:"input"},
        {title:"Task Progress", field:"progress", hozAlign:"left", formatter:"progress", editor:true},
        {title:"Gender", field:"gender", width:95, editor:"list", editorParams:{values:["male", "female"]}},
        {title:"Rating", field:"rating", formatter:"star", hozAlign:"center", width:100, editor:true},
        {title:"Color", field:"col", width:130, editor:"input"},
        {title:"Date Of Birth", field:"dob", width:130, sorter:"date", hozAlign:"center"},
        {title:"Driver", field:"car", width:90,  hozAlign:"center", formatter:"tickCross", sorter:"boolean", editor:true},
    ],
});

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
            editor: "input"
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
        layout: "fitColumns",
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

document.getElementById("processBtn").addEventListener("click", () => {
    const matrix = getMatrix();

    if (!matrix) {
        alert("Please fill in all entries before processing.");
        return;
    }

    const result = get_formatted_graded_autos(matrix);

    document.getElementById("automorphisms").textContent =
        typeof result === "object"
            ? JSON.stringify(result, null, 2)
            : String(result);
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
    const output = document.getElementById("automorphisms").textContent;
    download("result.txt", output);
});