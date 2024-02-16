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
const react_router_dom_1 = require("react-router-dom");
const polaris_1 = require("@shopify/polaris");
const graphql_1 = require("../../generated/graphql");
function Job(value) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [jobId, setJobId] = (0, react_1.useState)(0);
    const [deleteJob] = (0, graphql_1.useDeleteJobMutation)();
    const [activeModal, setActiveModal] = (0, react_1.useState)(false);
    const handleChange = (0, react_1.useCallback)(() => setActiveModal(!activeModal), [activeModal]);
    const handleDeleteAction = (0, react_1.useCallback)((id) => {
        setJobId(id);
        setActiveModal(true);
    }, [setJobId, setActiveModal]);
    const deletHandler = (0, react_1.useCallback)(() => __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const { data } = yield deleteJob({
                variables: {
                    id: jobId,
                },
            });
            if ((_a = data === null || data === void 0 ? void 0 : data.deleteJob) === null || _a === void 0 ? void 0 : _a.status) {
                navigate("/JobList");
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            setActiveModal(false);
        }
    }), [deleteJob, jobId, navigate, setActiveModal]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(polaris_1.Card, { key: value.id, roundedAbove: "sm" },
            react_1.default.createElement(polaris_1.BlockStack, { gap: "400" },
                react_1.default.createElement(polaris_1.BlockStack, { gap: "200" },
                    react_1.default.createElement(polaris_1.Text, { as: "h2", variant: "headingSm" }, value.title),
                    react_1.default.createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, value.description)),
                react_1.default.createElement(polaris_1.BlockStack, { gap: "200" },
                    react_1.default.createElement(polaris_1.InlineGrid, { columns: "1fr auto" },
                        react_1.default.createElement(polaris_1.Text, { as: "h3", variant: "headingSm", fontWeight: "medium" }, value.skills.map((skill) => (react_1.default.createElement(polaris_1.Tag, { key: skill.id }, skill.title)))),
                        react_1.default.createElement(polaris_1.ButtonGroup, null,
                            react_1.default.createElement(polaris_1.Button, { variant: "primary", tone: "critical", onClick: () => handleDeleteAction(value.id), accessibilityLabel: "Delete" }, "Delete"),
                            activeModal && (react_1.default.createElement(polaris_1.Modal, { open: activeModal, onClose: handleChange, title: "DLETE MODAL", primaryAction: {
                                    content: 'DELETE',
                                    onAction: deletHandler,
                                }, secondaryActions: [
                                    {
                                        content: 'CLOSE',
                                        onAction: handleChange,
                                    },
                                ] },
                                react_1.default.createElement(polaris_1.Modal.Section, null,
                                    react_1.default.createElement(polaris_1.Banner, { tone: "warning" },
                                        react_1.default.createElement("p", null, "Are you sure you want to delete the job?"))))),
                            react_1.default.createElement(polaris_1.Button, { variant: "primary", onClick: () => { navigate(`./Job/${value.id}`); }, accessibilityLabel: "Edit" }, "Edit"))),
                    react_1.default.createElement(polaris_1.Text, { as: "p", variant: "bodyMd" }, value.city))))));
}
exports.default = Job;
