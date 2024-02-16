"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const polaris_1 = require("@shopify/polaris");
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
function Dashboard() {
    const token = localStorage.getItem('token');
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(polaris_1.Frame, null,
            react_1.default.createElement(polaris_1.Navigation, { location: "/" },
                react_1.default.createElement(react_router_dom_1.Link, { to: '/NewJob' },
                    react_1.default.createElement(polaris_1.Navigation.Section, { items: [
                            {
                                label: 'NewJob',
                            },
                        ] })),
                react_1.default.createElement(react_router_dom_1.Link, { to: '/' },
                    react_1.default.createElement(polaris_1.Navigation.Section, { items: [
                            {
                                label: 'Home',
                            },
                        ] }))))));
}
exports.default = Dashboard;
