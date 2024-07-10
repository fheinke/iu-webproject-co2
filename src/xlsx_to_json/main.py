import pandas
import json

excel_file_path = "./EDGARv8.0_FT2022_GHG_booklet_2023_fossilCO2_only.xlsx"
sheet_names = ["fossil_CO2_totals_by_country", "fossil_CO2_by_sector_country_su", "fossil_CO2_per_GDP_by_country", "fossil_CO2_per_capita_by_countr"]
json_export_filename = "fossil_CO2_only"

for sheet_name in sheet_names:
    excel_data_df = pandas.read_excel(excel_file_path, sheet_name=sheet_name)

    excel_data_json = excel_data_df.to_json(orient='records')
    excel_data_json_dict = json.loads(excel_data_json)

    json_export_filename_complete = json_export_filename + "_" + sheet_name + ".json"
    with open(json_export_filename_complete, "w") as file:
        json.dump(excel_data_json_dict, file)
