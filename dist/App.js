"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./Pages/Home/Home"));
const NewJob_1 = __importDefault(require("./Pages/Jobs/NewJob"));
const Register_1 = __importDefault(require("./Pages/Register/Register"));
const JobList_1 = __importDefault(require("./Pages/Jobs/JobList"));
const Job_1 = __importDefault(require("./Pages/Jobs/Job"));
const LogIn_1 = __importDefault(require("./Pages/LogIn/LogIn"));
const client_1 = require("@apollo/client");
const SetClient_1 = require("./component/SetClient/SetClient");
require("@shopify/polaris/build/esm/styles.css");
const Dashboard_1 = __importDefault(require("./component/Dashboard/Dashboard"));
const EditJob_1 = __importDefault(require("./Pages/Jobs/EditJob"));
function App() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(client_1.ApolloProvider, { client: SetClient_1.SetClient },
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: "/Dashboard", element: react_1.default.createElement(Dashboard_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Home_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: "/JobList", element: react_1.default.createElement(JobList_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/NewJob', element: react_1.default.createElement(NewJob_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/Register', element: react_1.default.createElement(Register_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/LogIn', element: react_1.default.createElement(LogIn_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/Job', element: react_1.default.createElement(Job_1.default, null) }),
                react_1.default.createElement(react_router_dom_1.Route, { path: '/JobList/Job/:id', element: react_1.default.createElement(EditJob_1.default, null) })))));
}
exports.default = App;
