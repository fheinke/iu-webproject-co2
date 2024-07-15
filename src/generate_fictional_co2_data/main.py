import random
import json
from names_generator import generate_name


countries = ["Vereinigte Arabische Emirate",  "Afghanistan",  "Albanien",  "Argentinien",  "Österreich",  "Australien",  "Belgien",  "Brasilien",  "Kanada",  "Schweiz",  "Chile",  "Kamerun",  "China",  "Kolumbien",  "Tschechien",  "Deutschland",  "Dänemark",  "Spanien",  "Finnland",  "Frankreich",  "Vereinigtes Königreich",  "Griechenland",  "Hongkong",  "Ungarn",  "Irland",  "Italien",  "Japan",  "Liechtenstein",  "Monaco",  "Niederlande",  "Norwegen",  "Polen",  "Saudi-Arabien", "Schweden",  "Thailand",  "USA",  "Südafrika"]
company_types = ["", "GmbH", "AG", "SE"]

min_amount_companies_per_country = 2
max_amount_companies_per_country = 6


def main():
    countries.sort()
    json_data = list()
    for country in countries:
        current_country = dict()
        current_country["country"] = country
        current_country["totalEmissions"], current_country["companies"] = generate_company_data()
        json_data.append(current_country)

    with open("fictional_co2_emissions_by_country.json", "w") as file:
        json.dump(json_data, file)


def generate_company_data():
    companies = list()
    total_company_emissions = 0.0
    for id in range(random.randint(min_amount_companies_per_country, max_amount_companies_per_country)):
        company_emissions = random.randint(0, 1000000) / 100.0
        total_company_emissions += company_emissions
        
        current_company = dict()
        current_company["id"] = id
        current_company["name"] = (generate_name(style='capital') + " " + random.choice(company_types)).strip()
        current_company["emissions"] = company_emissions
        companies.append(current_company)
    total_company_emissions = round(total_company_emissions, 2)
    return total_company_emissions, companies


if __name__ == "__main__":
    main()
