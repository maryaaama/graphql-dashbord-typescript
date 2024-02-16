"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const yup = __importStar(require("yup"));
const formik_polaris_1 = require("@satel/formik-polaris");
const polaris_1 = require("@shopify/polaris");
const react_router_dom_1 = require("react-router-dom");
const graphql_1 = require("../../generated/graphql");
require("./LogIn.css");
const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password should be of minimum 4 characters length').required('Password is required'),
});
function LogIn() {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [loginUser, { loading, error }] = (0, graphql_1.useLoginMutation)();
    const initialValues = {
        email: 'maryam@example.com',
        password: 'maryam',
    };
    const handleSubmit = (values) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const { data } = yield loginUser({
                variables: {
                    email: values.email,
                    password: values.password,
                },
            });
            console.log('Token:', data === null || data === void 0 ? void 0 : data.login.token);
            if (data && data.login && data.login.token) {
                localStorage.setItem('token', data.login.token);
                localStorage.setItem('user', (_b = (_a = data.login.user) === null || _a === void 0 ? void 0 : _a.email) !== null && _b !== void 0 ? _b : '');
                navigate('/Dashboard');
            }
            else {
                alert('ایمیل و پسورد را درست وارد کنید');
                console.log('error');
            }
        }
        catch (error) {
            console.error('Error:', error);
        }
        console.log('values: ', values);
    });
    if (loading)
        return null;
    if (error)
        return `Error! ${error}`;
    return (react_1.default.createElement("div", { className: 'form1' },
        react_1.default.createElement(formik_1.Formik, { initialValues: initialValues, validationSchema: validationSchema, onSubmit: handleSubmit }, ({ values, dirty }) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(formik_1.Form, null,
                react_1.default.createElement(polaris_1.Card, null,
                    react_1.default.createElement(formik_polaris_1.TextField, { name: "email", label: "Email", autoComplete: "" }),
                    react_1.default.createElement(formik_polaris_1.TextField, { name: "password", label: "Password", type: "password", autoComplete: "" }),
                    react_1.default.createElement(polaris_1.Button, { submit: true, variant: "primary" }, " LogIn "))))))));
}
exports.default = LogIn;
