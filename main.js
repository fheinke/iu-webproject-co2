document.addEventListener("DOMContentLoaded", function () {
    // change copyright date to current year
    document.getElementById("copyright").innerHTML = "&copy; " + new Date().getFullYear() + " Karl Felix Heinke";

    fillCO2DataTable();
}, false);


function fillCO2DataTable() {
    let table = document.getElementById("CO2DataTable");

    // TODO: remove hardcoded file path
    fetch("/src/data/fictional_co2_emissions_by_country.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(countries => {
            let tbody = document.createElement('tbody');

            countries.forEach(country => {
                const currentCountry = country.country;
                const currentTotalEmissions = country.totalEmissions;

                country.companies.forEach(company => {
                    const tr = tbody.appendChild(document.createElement('tr'));
                    tr.appendChild(document.createElement('td')).innerHTML = currentCountry;
                    tr.appendChild(document.createElement('td')).innerHTML = company.name;
                    tr.appendChild(document.createElement('td')).innerHTML = company.emissions;
                    tr.appendChild(document.createElement('td')).innerHTML = currentTotalEmissions;
                });
            });

            table.append(tbody);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}


// TODO: Docs got script here: https://www.w3schools.com/howto/howto_js_sort_table.asp
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("CO2DataTable");
    switching = true;
    dir = "asc";
    /* Make a loop that will continue until no switching has been done: */
    while (switching) {
        switching = false;
        rows = table.rows;
        /* Loop through all table rows (except the first, which contains table headers): */
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            /* Get the two elements you want to compare, one from current row and one from the next: */
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];
            /* Check if the two rows should switch place, based on the direction, asc or desc: */
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            /* If a switch has been marked, make the switch and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "asc", set the direction to "desc" and run the while loop again. */
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
