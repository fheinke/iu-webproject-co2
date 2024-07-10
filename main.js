document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("copyright").innerHTML = "&copy; " + new Date().getFullYear() + " Karl Felix Heinke";
}, false);

// Get CO2 Data from JSON File and create a table
async function fetchCo2DataAsJson() {
    const response = await fetch("/src/data/fossil_CO2_only_fossil_CO2_totals_by_country.json");
    const jsonData = await response.json();
    return jsonData[0];
}

function fillCO2DataTable() {
    let table = document.getElementById("CO2DataTable");
}

function sortTable(columnIndex) {
    let table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("CO2DataTable");
    switching = true;

    while (switching) {
        switching = false;
        rows = table.rows;

        for (i = 1; i < rows.length - 1; i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("td")[columnIndex];
            y = rows[i + 1].getElementsByTagName("td")[columnIndex];

            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                shouldSwitch = true;
                break;
            }
        }

        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
