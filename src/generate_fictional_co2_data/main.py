import random
import json
from names_generator import generate_name


countries = ["Andorra", "Vereinigte Arabische Emirate", "Afghanistan", "Antigua und Barbuda", "Anguilla", "Albanien", "Armenien", "Niederländische Antillen", "Angola", "Antarktis", "Argentinien", "Amerikanisch-Samoa", "Österreich", "Australien", "Aruba", "Aserbaidschan", "Bosnien und Herzegowina", "Barbados", "Bangladesch", "Belgien", "Burkina Faso", "Bulgarien", "Bahrain", "Burundi", "Benin", "Bermuda", "Brunei Darussalam", "Bolivien", "Brasilien", "Bahamas", "Bhutan", "Bouvetinsel", "Botsuana", "Belarus", "Belize", "Kanada", "Kokosinseln (auch Keelinginseln)", "Kongo (Demokratische Republik)", "Zentralafrikanische Republik", "Kongo (Republik)", "Schweiz", "Côte d'Ivoire", "Cookinseln", "Chile", "Kamerun", "China", "Kolumbien", "Costa Rica", "Kuba", "Cabo Verde", "Weihnachtsinsel", "Zypern", "Tschechien", "Deutschland", "Dschibuti", "Dänemark", "Dominica", "Dominikanische Republik", "Algerien", "Ecuador", "Estland", "Ägypten", "Westsahara", "Eritrea", "Spanien", "Äthiopien", "Finnland", "Fidschi", "Falklandinseln (Malwinen)", "Mikronesien", "Färöer", "Frankreich", "Gabun", "Vereinigtes Königreich", "Grenada", "Georgia", "Französisch-Guayana", "Guernsey", "Ghana", "Gibraltar", "Grönland", "Gambia", "Guinea", "Guadeloupe", "Äquatorialguinea", "Griechenland", "Südgeorgien und die Südlichen Sandwichinseln", "Guatemala", "Guam", "Guinea-Bissau", "Guyana", "Gazastreifen", "Hongkong", "Heard und die McDonaldinseln", "Honduras", "Kroatien", "Haiti", "Ungarn", "Indonesien", "Irland", "Israel", "Isle of Man", "Indien", "Britisches Territorium im Indischen Ozean", "Irak", "Iran", "Island", "Italien", "Jersey", "Jamaika", "Jordanien", "Japan", "Kenia", "Kirgisistan", "Kambodscha", "Kiribati", "Komoren", "St. Kitts und Nevis", "Nordkorea", "Südkorea", "Kuwait", "Kaimaninseln", "Kasachstan", "Laos", "Libanon", "St. Lucia", "Liechtenstein", "Sri Lanka", "Liberia", "Lesotho", "Litauen", "Luxemburg", "Lettland", "Libyen", "Marokko", "Monaco", "Moldau, Republik", "Montenegro", "Madagaskar", "Marshallinseln", "Nordmazedonien", "Mali", "Myanmar (Burma)", "Mongolei", "Macau", "Nördliche Marianen", "Martinique", "Mauretanien", "Montserrat", "Malta", "Mauritius", "Malediven", "Malawi", "Mexiko", "Malaysia", "Mosambik", "Namibia", "Neukaledonien", "Niger", "Norfolkinsel", "Nigeria", "Nicaragua", "Niederlande", "Norwegen", "Nepal", "Nauru", "Niue", "Neuseeland", "Oman", "Panama", "Peru", "Französisch-Polynesien", "Papua-Neuguinea", "Philippinen", "Pakistan", "Polen", "St. Pierre und Miquelon", "Pitcairninseln", "Puerto Rico", "Palästinensische Autonomiegebiete", "Portugal", "Palau", "Paraguay", "Katar", "Réunion", "Rumänien", "Serbien", "Russland", "Ruanda", "Saudi-Arabien", "Salomonen", "Seychellen", "Sudan", "Schweden", "Singapur", "St. Helena", "Slowenien", "Svalbard und Jan Mayen", "Slowakei", "Sierra Leone", "San Marino", "Senegal", "Somalia", "Suriname", "São Tomé und Príncipe", "El Salvador", "Syrien", "Swasiland", "Turks- und Caicosinseln", "Tschad", "Französische Südgebiete", "Togo", "Thailand", "Tadschikistan", "Tokelau", "Timor-Leste", "Turkmenistan", "Tunesien", "Tonga", "Türkei", "Trinidad und Tobago", "Tuvalu", "Taiwan", "Tansania", "Ukraine", "Uganda", "Kleinere Amerikanische Überseeinseln", "USA", "Uruguay", "Usbekistan", "Vatikanstadt", "St. Vincent und die Grenadinen", "Venezuela", "Britische Jungferninseln", "Amerikanische Jungferninseln", "Vietnam", "Vanuatu", "Wallis und Futuna", "Samoa", "Kosovo", "Jemen", "Mayotte", "Südafrika", "Sambia", "Simbabwe"]
company_types = ["", "GmbH", "AG", "SE", "OHG", "GbR", "ev", "VVaG"]


def main():
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
    for id in range(random.randint(5, 50)):
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
