(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.fr = {}));
  }(this, (function (exports) { 'use strict';

    var fp = typeof window !== "undefined" && window.flatpickr !== undefined
        ? window.flatpickr
        : {
            l10ns: {},
        };
    var Malagasy = {
        firstDayOfWeek: 1,
        weekdays: {
            shorthand: ["alah", "alats", "tal", "alar", "alak", "zom", "sab"],
            longhand: [
                "Alahady",
                "Alatsinainy",
                "Talata",
                "Alarobia",
                "Alakamisy",
                "Zoma",
                "Asabotsy",
            ],
        },
        months: {
            shorthand: [
                "jan",
                "feb",
                "mar",
                "apr",
                "may",
                "jon",
                "jol",
                "aog",
                "sept",
                "okt",
                "nov",
                "des",
            ],
            longhand: [
                "janoary",
                "febroary",
                "marsa",
                "aprily",
                "may",
                "jona",
                "jolay",
                "aogositra",
                "septambra",
                "oktobra",
                "novambra",
                "desambra",
            ],
        },
        ordinal: function (nth) {
            if (nth > 1)
                return "";
            return "er";
        },
        rangeSeparator: " au ",
        weekAbbreviation: "Sem",
        scrollTitle: "Apidino raha hampiakatra ny isa",
        toggleTitle: "Tsindrio raha hivadika",
        time_24hr: true,
    };
    fp.l10ns.mg = Malagasy;
    var mg = fp.l10ns;

    exports.Malagasy = Malagasy;
    exports.default = mg;

    Object.defineProperty(exports, '__esModule', { value: true });

  })));
