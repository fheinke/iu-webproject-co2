var jsonData;

document.addEventListener("DOMContentLoaded", function () {
    // change copyright date to current year
    document.getElementById("copyright").innerHTML = "&copy; " + new Date().getFullYear() + " Karl Felix Heinke";

    if (document.title === "Ecotrack") {
        jsonData = fetchJsonData('/src/data/fictional_co2_emissions_by_country.json');
        fillCO2DataTable();
    }
}, false);


async function fetchJsonData(url) {
    const fetchData = async url => {
        try {
            const request = await fetch(url);
            const response = await request.json();
            return response;
        } catch (err) {
            console.error('Could not load data:', err);
            return null;
        }
    }

    return await fetchData(url);
}


async function fillCO2DataTable() {
    let tbody = document.createElement('tbody');

    await jsonData.then(response => {
        for (country in response) {
            const currentCountry = response[country].country;
            const currentTotalEmissions = response[country].totalEmissions;

            for (company in response[country].companies) {
                const tr = tbody.appendChild(document.createElement('tr'));
                tr.appendChild(document.createElement('td')).innerHTML = currentCountry;
                tr.appendChild(document.createElement('td')).innerHTML = response[country].companies[company].name;
                tr.appendChild(document.createElement('td')).innerHTML = response[country].companies[company].emissions;
                tr.appendChild(document.createElement('td')).innerHTML = currentTotalEmissions;
            }
        }
    })

    let table = document.getElementById("CO2DataTable");
    table.append(tbody);
}


// TODO: Docs got script here: https://www.w3schools.com/howto/howto_js_sort_table.asp changed: Elementtype (string, float)
function sortTable(n, elementType) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("CO2DataTable");
    switching = true;
    dir = "desc";

    // TODO: Docs: Changes were made here
    buttonIcons = table.getElementsByTagName("i");
    for (i = 0; i < buttonIcons.length; i++) {
        buttonIcon = buttonIcons[i];
        if (i !== n) {
            buttonIcons[i].classList = 'bi bi-arrow-down-up';
        }
    }

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
                if (elementType === "float") {
                    if (parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            } else if (dir == "desc") {
                if (elementType === "float") {
                    if (parseFloat(x.innerHTML) < parseFloat(y.innerHTML)) {
                        shouldSwitch = true;
                        break;
                    }
                } else {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
        }

        if (shouldSwitch) {
            /* If a switch has been marked, make the switch and mark that a switch has been done: */
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            switchcount++;
        } else {
            /* If no switching has been done AND the direction is "desc", set the direction to "asc" and run the while loop again. */
            if (switchcount == 0 && dir == "desc") {
                dir = "asc";
                switching = true;
            }
        }
    }

    // TODO: Docs: Changes were made here
    if (dir === "asc") {
        buttonIcons[n].classList = 'bi bi-arrow-up';
    } else if (dir === "desc") {
        buttonIcons[n].classList = 'bi bi-arrow-down';
    }
}
