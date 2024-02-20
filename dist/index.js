"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
require("./index.css");
const App_1 = __importDefault(require("./App"));
const polaris_1 = require("@shopify/polaris");
const en_json_1 = __importDefault(require("@shopify/polaris/locales/en.json"));
const reportWebVitals_1 = __importDefault(require("./reportWebVitals"));
require("@shopify/polaris/build/esm/styles.css");
react_dom_1.default.render(react_1.default.createElement(polaris_1.AppProvider, { i18n: en_json_1.default },
    react_1.default.createElement(App_1.default, null)), document.getElementById("root"));
(0, reportWebVitals_1.default)();
