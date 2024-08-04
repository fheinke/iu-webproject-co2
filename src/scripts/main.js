let jsonData;

// At Startup: change copyright and fill ecotrack data table
document.addEventListener('DOMContentLoaded', () => {
    // Change copyright date to the current year
    document.getElementById('copyright').innerHTML = '&copy; ' + new Date().getFullYear() + ' Karl Felix Heinke';

    // If current page has element with id 'CO2DataTable', fill it with data
    if (document.getElementById('CO2DataTable') != null) {
        fetchJsonData('/src/data/fictional_co2_emissions_by_country.json')
            .then(data => {
                jsonData = data;
                fillCO2DataTable();
            });
    }
}, false);

async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('HTTP error, status: ' + response.status);
        return await response.json();
    } catch (err) {
        console.error('Could not load data: ' + err);
        return null;
    }
}

async function fillCO2DataTable() {
    const tbody = document.createElement('tbody');
    const searchString = document.getElementById('input-search-co2data').value.toLowerCase().replace(/[^a-z0-9äöü ]/g, '');

    if (!jsonData) {
        console.error('jsonData is not available');
        return;
    }

    jsonData.forEach(countryData => {
        const { country, totalEmissions, companies } = countryData;
        companies.forEach(companyData => {
            const { name: companyName, emissions: companyEmissions } = companyData;

            if (searchString === "" || country.toLowerCase().startsWith(searchString) || companyName.toLowerCase().startsWith(searchString)) {
                const tr = tbody.appendChild(document.createElement('tr'));
                tr.appendChild(createTableCell(country));
                tr.appendChild(createTableCell(companyName));
                tr.appendChild(createTableCell(companyEmissions));
                tr.appendChild(createTableCell(totalEmissions));
            }
        });
    });

    const table = document.getElementById('CO2DataTable');
    const oldTbody = table.querySelector('tbody');
    if (oldTbody) table.removeChild(oldTbody);
    table.appendChild(tbody);

    resetButtonIcons();
}

function createTableCell(content) {
    const td = document.createElement('td');
    td.innerHTML = content;
    return td;
}

function resetButtonIcons() {
    const table = document.getElementById('CO2DataTable');
    const buttonIcons = table.querySelectorAll('i');
    buttonIcons.forEach(icon => {
        icon.classList = 'bi bi-arrow-down-up';
    });
}

function sortTable(n, elementType) {
    const table = document.getElementById('CO2DataTable');
    if (!table) return;

    const rows = Array.from(table.rows).slice(1);
    let dir = table.dataset.sortDir === 'asc' ? 'desc' : 'asc';
    table.dataset.sortDir = dir;

    updateButtonIcons(n, dir);

    const compare = (a, b) => {
        const x = a.cells[n].innerText.trim();
        const y = b.cells[n].innerText.trim();

        if (elementType === 'float') {
            return dir === 'asc' ? parseFloat(x) - parseFloat(y) : parseFloat(y) - parseFloat(x);
        } else {
            return dir === 'asc' ? x.localeCompare(y) : y.localeCompare(x);
        }
    };

    rows.sort(compare);

    rows.forEach(row => table.tBodies[0].appendChild(row));
}

function updateButtonIcons(n, dir) {
    const table = document.getElementById('CO2DataTable');
    const buttonIcons = table.getElementsByTagName('i');

    for (let i = 0; i < buttonIcons.length; i++) {
        buttonIcons[i].classList = 'bi bi-arrow-down-up';
    }

    if (dir === 'asc') {
        buttonIcons[n].classList = 'bi bi-arrow-up';
    } else {
        buttonIcons[n].classList = 'bi bi-arrow-down';
    }
}
