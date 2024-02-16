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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const polaris_1 = require("@shopify/polaris");
const react_1 = __importStar(require("react"));
const use_debounce_1 = require("use-debounce");
const Job_1 = __importDefault(require("./Job"));
require("./JobList.css");
const graphql_1 = require("../../generated/graphql");
function JobList() {
    const [queryValue, setQueryValue] = (0, react_1.useState)("");
    const [sortValue, setSortValue] = (0, react_1.useState)("DESC");
    const [pageValue, setPageValue] = (0, react_1.useState)(1);
    const [value, setValue] = (0, react_1.useState)([]);
    const [input] = (0, use_debounce_1.useDebounce)(queryValue, 350);
    const [sort, setSort] = (0, react_1.useState)('');
    const { loading, data: listJob } = (0, graphql_1.useJobsQuery)({
        variables: {
            page: pageValue,
            pageSize: 2,
            sort: sortValue,
        },
        fetchPolicy: "network-only",
        skip: queryValue === "" ? false : true,
    });
    const { loading: searchJobLoading, data: SearchJob, error: searchJobError } = (0, graphql_1.useSearchJobQuery)({
        variables: {
            name: input,
            page: 1,
            limit: 4,
            sort: sortValue,
        },
        fetchPolicy: "network-only",
        skip: queryValue !== "" ? false : true,
    });
    const handleSortChange = (0, react_1.useCallback)((value) => setSort(value), []);
    const handleFiltersQueryChange = (0, react_1.useCallback)((value) => setQueryValue(value), []);
    const handleSortRemove = (0, react_1.useCallback)(() => setSort(''), []);
    const handleQueryValueRemove = (0, react_1.useCallback)(() => setQueryValue(''), []);
    const handleFiltersClearAll = (0, react_1.useCallback)(() => {
        handleSortRemove();
        handleQueryValueRemove();
    }, [
        handleSortRemove,
        handleQueryValueRemove,
    ]);
    const filters = [
        {
            key: 'sort',
            label: 'Sort',
            filter: (react_1.default.createElement(polaris_1.ChoiceList, { title: "Sort", titleHidden: true, choices: [
                    { label: 'Newest update', value: 'DESC' },
                    { label: 'Oldest update', value: 'ASC' },
                ], selected: (sort || []), onChange: handleSortChange })),
            shortcut: true,
        },
    ];
    const appliedFilters = [];
    if (!isEmpty(sort)) {
        const key = 'sort';
        appliedFilters.push({
            key,
            label: disambiguateLabel(key, sort),
            onRemove: handleSortRemove,
        });
    }
    (0, react_1.useEffect)(() => {
        if (listJob && listJob.jobs && listJob.jobs.jobs) {
            console.log(listJob.jobs.jobs);
            setValue(listJob.jobs.jobs);
        }
        if (searchJobError) {
            console.error("Error fetching search results:", searchJobError);
        }
    }, [listJob, pageValue, SearchJob]);
    const items = (0, react_1.useMemo)(() => {
        var _a, _b;
        if (listJob) {
            return (_a = listJob === null || listJob === void 0 ? void 0 : listJob.jobs) === null || _a === void 0 ? void 0 : _a.jobs;
        }
        if (SearchJob) {
            return (_b = SearchJob === null || SearchJob === void 0 ? void 0 : SearchJob.searchJob) === null || _b === void 0 ? void 0 : _b.jobs;
        }
        return [];
    }, [listJob, SearchJob]);
    const filteredItems = items ? items.filter((item) => {
        return (!queryValue ||
            item.title.toLowerCase().includes(queryValue.toLowerCase()) ||
            item.description.toLowerCase().includes(queryValue.toLowerCase()));
    }) : [];
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(polaris_1.Page, { backAction: { content: 'Products', url: '#' }, title: "Job List", titleMetadata: react_1.default.createElement(polaris_1.Badge, { tone: "attention" }, "Verified"), primaryAction: { content: 'Create Job',
                url: "./NewJob",
            } },
            react_1.default.createElement("div", { style: { height: '568px' } },
                react_1.default.createElement(polaris_1.Card, null,
                    react_1.default.createElement(polaris_1.ResourceList, { resourceName: { singular: 'customer', plural: 'customers' }, filterControl: react_1.default.createElement(polaris_1.Filters, { queryValue: queryValue, filters: filters, appliedFilters: appliedFilters, onQueryChange: handleFiltersQueryChange, onQueryClear: handleQueryValueRemove, onClearAll: handleFiltersClearAll }), flushFilters: true, items: filteredItems, renderItem: (item) => {
                            console.log('item', item);
                            return (react_1.default.createElement(polaris_1.ResourceList.Item, { id: item.id, accessibilityLabel: `View details for ${item.id}`, onClick: () => { } },
                                react_1.default.createElement(Job_1.default, { value: item, key: item.index })));
                        } }))),
            react_1.default.createElement(polaris_1.Divider, null),
            react_1.default.createElement("div", { className: 'paginathionStyle' },
                react_1.default.createElement(polaris_1.Pagination, { hasPrevious: true, onPrevious: () => {
                        console.log('Previous', pageValue);
                        if (pageValue > 1) {
                            setPageValue(pageValue - 1);
                        }
                        else {
                            alert('first page');
                            setPageValue(1);
                        }
                    }, hasNext: true, onNext: () => {
                        console.log('Next', pageValue);
                        if (pageValue > 0) {
                            setPageValue(pageValue + 1);
                        }
                        else {
                            alert('end page');
                            setPageValue(3);
                        }
                    } })))));
    function disambiguateLabel(key, value) {
        switch (key) {
            case 'moneySpent':
                return `Money spent is between $${value[0]} and $${value[1]}`;
            default:
                return value;
        }
    }
    function isEmpty(value) {
        if (Array.isArray(value)) {
            return value.length === 0;
        }
        else {
            return value === '' || value == null;
        }
    }
}
exports.default = JobList;
