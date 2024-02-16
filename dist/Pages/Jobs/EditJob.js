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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const react_router_dom_2 = require("react-router-dom");
const formik_1 = require("formik");
const polaris_1 = require("@shopify/polaris");
const formik_polaris_1 = require("@satel/formik-polaris");
const yup = __importStar(require("yup"));
require("./NewJob.css");
const Skills_1 = __importDefault(require("./Skills"));
const graphql_1 = require("../../generated/graphql");
const cityOptions = [
    { label: "Select", value: "select" },
    { label: "tehran", value: "tehran" },
    { label: "ahvaz", value: "ahvaz" },
    { label: "shiraz", value: "shiraz" },
    { label: "esfahan", value: "esfahan" },
    { label: "mashhad", value: "mashhad" },
    { label: "tabriz", value: "tabriz" },
    { label: "zanjan", value: "zanjan" },
    { label: "boshehr", value: "boshehr" },
];
const validationSchemaForm = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('description is required'),
    city: yup.string().required('City is required'),
    skills: yup.array().min(1).required("required !"),
});
function EditJob() {
    var _a;
    const navigate = (0, react_router_dom_2.useNavigate)();
    let params = (0, react_router_dom_1.useParams)();
    const itemID = parseInt(params.id || "", 10);
    console.log('params', itemID);
    const [updateJob, error] = (0, graphql_1.useUpdateJobMutation)();
    const { data, loading, error: queryError } = (0, graphql_1.useJobQuery)({
        variables: { id: itemID },
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first",
    });
    console.log('data', data);
    const value = (_a = data === null || data === void 0 ? void 0 : data.job) === null || _a === void 0 ? void 0 : _a.job;
    console.log('value.title', value === null || value === void 0 ? void 0 : value.title);
    const formSkills = ((value === null || value === void 0 ? void 0 : value.skills) || []).map((skill) => {
        if (skill && typeof skill.title === 'string') {
            return skill.title.toLowerCase();
        }
        else {
            return '';
        }
    });
    console.log('formSkills', formSkills);
    const initialValuesForm = {
        title: (value === null || value === void 0 ? void 0 : value.title) || "",
        description: (value === null || value === void 0 ? void 0 : value.description) || "",
        city: (value === null || value === void 0 ? void 0 : value.city) || "",
        skills: formSkills || [],
    };
    const handleSubmitForm = (0, react_1.useCallback)((formValues) => __awaiter(this, void 0, void 0, function* () {
        var _b;
        try {
            const { data } = yield updateJob({
                variables: {
                    id: itemID,
                    title: formValues.title,
                    description: formValues.description,
                    city: formValues.city,
                    skills: formValues.skills,
                },
            });
            if ((_b = data === null || data === void 0 ? void 0 : data.updateJob) === null || _b === void 0 ? void 0 : _b.status) {
                navigate("/JobList");
            }
        }
        catch (err) {
            console.log('err', err);
        }
    }), [updateJob, itemID]);
    if (loading) {
        return react_1.default.createElement("p", null, "Loading...");
    }
    if (queryError) {
        return react_1.default.createElement("p", null,
            "Error fetching data: ",
            queryError.message);
    }
    return (react_1.default.createElement("div", { className: "contain" },
        react_1.default.createElement(polaris_1.Page, { fullWidth: true, title: "Edit Job" },
            react_1.default.createElement(polaris_1.Frame, null, data && (react_1.default.createElement(formik_1.Formik, { initialValues: initialValuesForm, validationSchema: validationSchemaForm, onSubmit: handleSubmitForm }, ({ values, dirty, submitForm }) => (react_1.default.createElement(react_1.default.Fragment, null,
                react_1.default.createElement(formik_1.Form, null,
                    react_1.default.createElement(polaris_1.ContextualSaveBar, { message: "updete Job", discardAction: {
                            onAction: () => {
                                navigate("/JobList");
                            },
                        }, saveAction: {
                            disabled: !dirty,
                            onAction: submitForm,
                        } }),
                    react_1.default.createElement(polaris_1.Card, null,
                        react_1.default.createElement(polaris_1.FormLayout, null,
                            react_1.default.createElement(formik_polaris_1.TextField, { label: "Title", name: "title", autoComplete: "" }),
                            react_1.default.createElement(formik_polaris_1.TextField, { label: "Description", name: "description", multiline: 4, autoComplete: "" }),
                            react_1.default.createElement(formik_polaris_1.Select, { label: "city", name: "city", options: cityOptions }),
                            react_1.default.createElement("div", { className: "skills" },
                                react_1.default.createElement(Skills_1.default, { label: "Skills", name: "skills", initialSelectedSkills: formSkills }))))),
                react_1.default.createElement("br", null),
                react_1.default.createElement(polaris_1.Card, null,
                    react_1.default.createElement("pre", null, JSON.stringify(values, null, 2)))))))))));
}
exports.default = EditJob;
