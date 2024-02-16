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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const formik_1 = require("formik");
const yup = __importStar(require("yup"));
const polaris_1 = require("@shopify/polaris");
const formik_polaris_1 = require("@satel/formik-polaris");
const react_router_dom_1 = require("react-router-dom");
const graphql_1 = require("../../generated/graphql");
require("./Register.css");
const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(6, 'Password should be of minimum 4 characters length').required('Password is required'),
    confirmpassword: yup.string().min(6, 'confirmpassword should be of minimum 4 characters length').required('confirmpassword is required'),
});
function Register() {
    const [createUser, { loading, error }] = (0, graphql_1.useCreateUserMutation)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [users, setUsers] = (0, react_1.useState)([]);
    const initialValues = {
        email: 'maryam@example.com',
        password: 'maryam',
        confirmpassword: 'maryam',
    };
    const handleSubmit = (0, react_1.useCallback)((values) => __awaiter(this, void 0, void 0, function* () {
        console.log('handelsubmit value', values);
        if (values.password === values.confirmpassword) {
            try {
                const { data } = yield createUser({
                    variables: {
                        email: values.email,
                        password: values.password,
                    },
                });
                setUsers(values);
                navigate('/LogIn');
            }
            catch (error) {
                console.error('error: ', error);
                alert('error: ' + error);
            }
        }
        else {
            alert('match password and confirmpassword');
        }
    }), [createUser, error]);
    if (loading)
        return 'Submitting...';
    if (error)
        return `Submission error! ${error.message}`;
    return (react_1.default.createElement("div", { className: 'form2' },
        react_1.default.createElement(formik_1.Formik, { initialValues: initialValues, validationSchema: validationSchema, onSubmit: handleSubmit }, ({ dirty }) => (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(formik_1.Form, null,
                react_1.default.createElement(polaris_1.Card, null,
                    react_1.default.createElement(polaris_1.FormLayout, null,
                        react_1.default.createElement(formik_polaris_1.TextField, { label: "Email", name: "email", autoComplete: "" }),
                        react_1.default.createElement(formik_polaris_1.TextField, { label: "Password", name: "password", autoComplete: "" }),
                        react_1.default.createElement(formik_polaris_1.TextField, { label: "Confirm Password", name: "confirmpassword", autoComplete: "" }),
                        react_1.default.createElement(polaris_1.Button, { submit: true, variant: "primary" }, " Save ")))))))));
}
exports.default = Register;
