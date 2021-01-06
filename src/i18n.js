import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import Cache from "i18next-localstorage-cache";
import { initReactI18next } from "react-i18next";
import Moment from "moment";

i18n
    .use(Backend)
    .use(Cache)
    .use(initReactI18next)
    .init({
        lng: "en",
        backend: {
            /* translation file path */
            loadPath: "/assets/i18n/{{ns}}/{{lng}}.json"
        },
        fallbackLng: "en",
        debug: false,
        /* can have multiple namespace, in case you want to divide a huge translation into smaller pieces and load them on demand */
        ns: ["translations"],
        defaultNS: "translations",
        keySeparator: false,
        transSupportBasicHtmlNodes: true, // allow <br/> and simple html elements in translations
        interpolation: {
            escapeValue: false,
            formatSeparator: ",",

            format: function (value, format, lng) {
                if (format === 'uppercase')
                    return value.toUpperCase();

                if (format === 'decimal') {
                    if (value !== undefined) {
                        return new Intl.NumberFormat(lng, { style: 'decimal' }).format(value);
                    }
                } else if (format === 'decimalES') {
                    if (value !== undefined) {
                        return new Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(value);
                    }
                } else if (format === 'decimalWithSpace') {
                    if (value !== undefined) {
                        return new Intl.NumberFormat(lng, { style: 'decimal' }).format(value);
                    }
                }

                if (value instanceof Date)
                    return Moment(value).format(format);

                return value;
            }
        },
        react: {
            wait: true
        }
    });

export default i18n;
