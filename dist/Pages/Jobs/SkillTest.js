"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const formik_1 = require("formik");
const polaris_1 = require("@shopify/polaris");
const react_2 = require("react");
const graphql_1 = require("../../generated/graphql");
function SkillTest(_a) {
    var { label, initialSelectedSkills } = _a, props = __rest(_a, ["label", "initialSelectedSkills"]);
    const { setFieldValue, setFieldError } = (0, formik_1.useFormikContext)();
    const [field, meta] = (0, formik_1.useField)(props);
    const [selectedTags, setSelectedTags] = (0, react_2.useState)(['frountend']);
    const [value, setValue] = (0, react_2.useState)('');
    const [suggestion, setSuggestion] = (0, react_2.useState)('');
    const { data, refetch } = (0, graphql_1.useSkillsQuery)({
        variables: {
            title: value,
            limit: 10,
        },
        fetchPolicy: "network-only",
        nextFetchPolicy: "cache-first",
    });
    const name = props.name;
    const handleSelectChange = (0, react_2.useCallback)((value) => {
        setFieldValue(name, value);
        console.log(value);
    }, [name, setFieldValue]);
    const handleActiveOptionChange = (0, react_2.useCallback)((activeOption) => {
        const activeOptionIsAction = activeOption === value;
        if (!activeOptionIsAction && !selectedTags.includes(activeOption)) {
            setSuggestion(activeOption);
        }
        else {
            setSuggestion('');
        }
    }, [value, selectedTags]);
    const updateSelection = (0, react_2.useCallback)((selected) => {
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
    }, [selectedTags]);
    const removeTag = (0, react_2.useCallback)((tag) => () => {
        updateSelection(tag);
    }, [updateSelection]);
    const getAllTags = (0, react_2.useCallback)(() => {
        var _a;
        let savedTags = [];
        if ((_a = data === null || data === void 0 ? void 0 : data.skills) === null || _a === void 0 ? void 0 : _a.skills) {
            savedTags = data.skills.skills.map((saveData) => saveData.title);
        }
        else {
            console.log("error");
        }
        const allTags = [...new Set([...savedTags, ...selectedTags].sort())];
        return allTags;
    }, [data === null || data === void 0 ? void 0 : data.skills, selectedTags]);
    const formatOptionText = (0, react_2.useCallback)((option) => {
        const trimValue = value.trim().toLocaleLowerCase();
        const matchIndex = option.toLocaleLowerCase().indexOf(trimValue);
        if (!value || matchIndex === -1)
            return option;
        const start = option.slice(0, matchIndex);
        const highlight = option.slice(matchIndex, matchIndex + trimValue.length);
        const end = option.slice(matchIndex + trimValue.length, option.length);
        return (react_1.default.createElement("p", null,
            start,
            react_1.default.createElement(polaris_1.Text, { fontWeight: "bold", as: "span" }, highlight),
            end));
    }, [value]);
    const escapeSpecialRegExCharacters = (0, react_2.useCallback)((value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), []);
    const options = (0, react_2.useMemo)(() => {
        let list;
        const allTags = getAllTags();
        const filterRegex = new RegExp(escapeSpecialRegExCharacters(value), 'i');
        if (value) {
            list = allTags.filter((tag) => tag.match(filterRegex));
        }
        else {
            list = allTags;
        }
        return [...list];
    }, [value, getAllTags, escapeSpecialRegExCharacters]);
    const verticalContentMarkup = selectedTags.length > 0 ? (react_1.default.createElement(polaris_1.BlockStack, { gap: "500" }, selectedTags.map((tag) => (react_1.default.createElement(polaris_1.Tag, { key: `option-${tag}`, onRemove: removeTag(tag) }, tag))))) : null;
    const optionMarkup = options.length > 0
        ? options.map((option) => {
            return (react_1.default.createElement(polaris_1.Listbox.Option, { key: option, value: option, selected: selectedTags.includes(option), accessibilityLabel: option },
                react_1.default.createElement(polaris_1.Listbox.TextOption, { selected: selectedTags.includes(option) }, formatOptionText(option))));
        })
        : null;
    const noResults = value && !getAllTags().includes(value);
    const actionMarkup = noResults ? (react_1.default.createElement(polaris_1.Listbox.Action, { value: value }, `Add "${value}"`)) : null;
    const emptyStateMarkup = optionMarkup ? null : (react_1.default.createElement(polaris_1.EmptySearchResult, { title: "", description: `No tags found matching "${value}"` }));
    const listboxMarkup = optionMarkup || actionMarkup || emptyStateMarkup ? (react_1.default.createElement(polaris_1.Listbox, { autoSelection: polaris_1.AutoSelection.None, onSelect: updateSelection, onActiveOptionChange: handleActiveOptionChange },
        actionMarkup,
        optionMarkup)) : null;
    return (react_1.default.createElement("div", { style: { height: '225px' } },
        react_1.default.createElement(polaris_1.Combobox, { allowMultiple: true, activator: react_1.default.createElement(polaris_1.Combobox.TextField, { autoComplete: "off", label: label, labelHidden: true, value: value, suggestion: suggestion, placeholder: "Search tags", verticalContent: verticalContentMarkup, onChange: setValue }) }, listboxMarkup)));
}
exports.default = SkillTest;
