import json

with open('./currency-names.json') as names_file:
    currency_names = json.load(names_file)
    with open('./currency-formats.json') as formats_file:
        currency_formats = json.load(formats_file)
        output = {}
        for name in currency_names['symbols']:
            if name in currency_formats:
                output[name] = currency_formats[name]
        with open('./currencies.json', 'w+') as outfile:
            json.dump(output, outfile, sort_keys=True, indent=4, separators=(',',':'))
