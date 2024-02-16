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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const formik_1 = require("formik");
const react_1 = __importStar(require("react"));
const polaris_1 = require("@shopify/polaris");
const graphql_1 = require("../../generated/graphql");
const Skills = (_a) => {
    var { label, initialSelectedSkills } = _a, props = __rest(_a, ["label", "initialSelectedSkills"]);
    const { setFieldValue, setFieldError } = (0, formik_1.useFormikContext)();
    const [field, meta] = (0, formik_1.useField)(props);
    const [selectedTags, setSelectedTags] = (0, react_1.useState)(initialSelectedSkills || []);
    const [value, setValue] = (0, react_1.useState)('');
    const [valueData, setValueData] = (0, react_1.useState)([]);
    const [suggestion, setSuggestion] = (0, react_1.useState)('');
    const { data, refetch } = (0, graphql_1.useSkillsQuery)({
        variables: {
            title: value,
            limit: 10,
        },
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first",
    });
    const name = props.name;
    const handleBlur = (0, react_1.useCallback)(() => {
        field.onBlur({ target: { name } });
    }, [field, name]);
    const handleFocus = (0, react_1.useCallback)(() => {
        setFieldError(name, "");
    }, [name, setFieldError]);
    const error = (0, react_1.useMemo)(() => {
        if (meta.error && meta.touched) {
            return meta.error;
        }
        return undefined;
    }, [meta.error, meta.touched]);
    const handleActiveOptionChange = (0, react_1.useCallback)((activeOption) => {
        const activeOptionIsAction = activeOption === value;
        if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
            setSuggestion(activeOption);
        }
        else {
            setSuggestion('');
        }
    }, [value, selectedTags]);
    const handleSelectChange = (0, react_1.useCallback)((value) => {
        setFieldValue(name, value);
        console.log(value);
    }, [name, setFieldValue]);
    const updateSelection = (0, react_1.useCallback)((selected) => {
        const nextSelectedTags = new Set([...selectedTags]);
        if (nextSelectedTags.has(selected)) {
            nextSelectedTags.delete(selected);
        }
        else {
            nextSelectedTags.add(selected);
        }
        setSelectedTags([...nextSelectedTags]);
        setValue('');
        setSuggestion('');
        handleSelectChange([...nextSelectedTags]);
    }, [selectedTags, setValue, setSuggestion, handleSelectChange]);
    const removeTag = (0, react_1.useCallback)((tag) => () => {
        updateSelection(tag);
    }, [updateSelection]);
    const getAllTags = (0, react_1.useCallback)(() => {
        var _a;
        let savedTags = [];
        if ((_a = data === null || data === void 0 ? void 0 : data.skills) === null || _a === void 0 ? void 0 : _a.skills) {
            savedTags = data.skills.skills.map((saveData) => saveData.title);
        }
        else {
            console.log(error);
        }
        const allTags = [...new Set([...savedTags, ...selectedTags].sort())];
        setValueData(allTags);
        return allTags;
    }, [data === null || data === void 0 ? void 0 : data.skills, selectedTags, setValueData, error]);
    const options = (0, react_1.useMemo)(() => {
        let list;
        const allTags = getAllTags();
        console.log('allTags', allTags);
        const filterRegex = new RegExp(value, 'i');
        if (value) {
            list = allTags.filter((tag) => tag.match(filterRegex));
        }
        else {
            list = allTags;
        }
        return [...list];
    }, [value, getAllTags]);
    const verticalContentMarkup = selectedTags.length > 0 ? (react_1.default.createElement(polaris_1.BlockStack, { gap: "500" }, selectedTags.map((tag) => (react_1.default.createElement(polaris_1.Tag, { key: `option-${tag}`, onRemove: removeTag(tag) }, tag))))) : null;
    const optionMarkup = options.length > 0
        ? options.map((option) => {
            return (react_1.default.createElement(polaris_1.Listbox.Option, { key: option, value: option, selected: selectedTags.includes(option), accessibilityLabel: option },
                react_1.default.createElement(polaris_1.Listbox.TextOption, { selected: selectedTags.includes(option) }, option)));
        })
        : null;
    const noResults = value && !getAllTags().includes(value);
    const actionMarkup = noResults ? (react_1.default.createElement(polaris_1.Listbox.Action, { value: value }, `Add "${value}"`)) : null;
    const emptyStateMarkup = optionMarkup ? null : (react_1.default.createElement(polaris_1.EmptySearchResult, { title: "", description: `No tags found matching "${value}"` }));
    const listboxMarkup = optionMarkup || actionMarkup || emptyStateMarkup ? (react_1.default.createElement(polaris_1.Listbox, { autoSelection: polaris_1.AutoSelection.None, onSelect: updateSelection, onActiveOptionChange: handleActiveOptionChange },
        actionMarkup,
        optionMarkup)) : null;
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("label", { htmlFor: props.id || name }, label),
        react_1.default.createElement(polaris_1.Combobox, { allowMultiple: true, activator: react_1.default.createElement(polaris_1.Combobox.TextField, { autoComplete: "off", label: label, labelHidden: true, value: value, suggestion: suggestion, placeholder: "Search tags", verticalContent: verticalContentMarkup, onChange: setValue, error: error ? "required !" : false, onBlur: handleBlur, onFocus: handleFocus }) }, listboxMarkup)));
};
exports.default = Skills;
