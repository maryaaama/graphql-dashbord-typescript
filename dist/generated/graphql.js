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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useJobSuspenseQuery = exports.useJobLazyQuery = exports.useJobQuery = exports.JobDocument = exports.useSkillsSuspenseQuery = exports.useSkillsLazyQuery = exports.useSkillsQuery = exports.SkillsDocument = exports.useSearchJobSuspenseQuery = exports.useSearchJobLazyQuery = exports.useSearchJobQuery = exports.SearchJobDocument = exports.useJobsSuspenseQuery = exports.useJobsLazyQuery = exports.useJobsQuery = exports.JobsDocument = exports.useShowtokensSuspenseQuery = exports.useShowtokensLazyQuery = exports.useShowtokensQuery = exports.ShowtokensDocument = exports.useUpdateJobMutation = exports.UpdateJobDocument = exports.useCreateJobMutation = exports.CreateJobDocument = exports.useDeleteJobMutation = exports.DeleteJobDocument = exports.useCreateUserMutation = exports.CreateUserDocument = exports.useLoginMutation = exports.LoginDocument = exports.CacheControlScope = void 0;
const client_1 = require("@apollo/client");
const Apollo = __importStar(require("@apollo/client"));
const defaultOptions = {};
var CacheControlScope;
(function (CacheControlScope) {
    CacheControlScope["Private"] = "PRIVATE";
    CacheControlScope["Public"] = "PUBLIC";
})(CacheControlScope || (exports.CacheControlScope = CacheControlScope = {}));
exports.LoginDocument = (0, client_1.gql) `
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    user {
      email
    }
    token
    status
  }
}
    `;
function useLoginMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.LoginDocument, options);
}
exports.useLoginMutation = useLoginMutation;
exports.CreateUserDocument = (0, client_1.gql) `
    mutation CreateUser($email: String!, $password: String!) {
  createUser(email: $email, password: $password) {
    message
    status
  }
}
    `;
function useCreateUserMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateUserDocument, options);
}
exports.useCreateUserMutation = useCreateUserMutation;
exports.DeleteJobDocument = (0, client_1.gql) `
    mutation DeleteJob($id: Int!) {
  deleteJob(id: $id) {
    message
    status
  }
}
    `;
function useDeleteJobMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.DeleteJobDocument, options);
}
exports.useDeleteJobMutation = useDeleteJobMutation;
exports.CreateJobDocument = (0, client_1.gql) `
    mutation CreateJob($title: String!, $description: String!, $city: String!, $skills: [String]!) {
  createJob(
    title: $title
    description: $description
    city: $city
    skills: $skills
  ) {
    job {
      title
      description
      city
      skills {
        title
        id
      }
    }
    status
    message
  }
}
    `;
function useCreateJobMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.CreateJobDocument, options);
}
exports.useCreateJobMutation = useCreateJobMutation;
exports.UpdateJobDocument = (0, client_1.gql) `
    mutation UpdateJob($id: Int!, $title: String!, $description: String!, $city: String!, $skills: [String]!) {
  updateJob(
    id: $id
    title: $title
    description: $description
    city: $city
    skills: $skills
  ) {
    status
  }
}
    `;
function useUpdateJobMutation(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(exports.UpdateJobDocument, options);
}
exports.useUpdateJobMutation = useUpdateJobMutation;
exports.ShowtokensDocument = (0, client_1.gql) `
    query Showtokens {
  showtokens {
    message
    status
  }
}
    `;
function useShowtokensQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.ShowtokensDocument, options);
}
exports.useShowtokensQuery = useShowtokensQuery;
function useShowtokensLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.ShowtokensDocument, options);
}
exports.useShowtokensLazyQuery = useShowtokensLazyQuery;
function useShowtokensSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(exports.ShowtokensDocument, options);
}
exports.useShowtokensSuspenseQuery = useShowtokensSuspenseQuery;
exports.JobsDocument = (0, client_1.gql) `
    query Jobs($page: Int!, $pageSize: Int!, $sort: String!) {
  jobs(page: $page, pageSize: $pageSize, sort: $sort) {
    jobs {
      id
      title
      description
      city
      updatedAt
      skills {
        id
        title
      }
    }
    message
    totalPage
  }
}
    `;
function useJobsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.JobsDocument, options);
}
exports.useJobsQuery = useJobsQuery;
function useJobsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.JobsDocument, options);
}
exports.useJobsLazyQuery = useJobsLazyQuery;
function useJobsSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(exports.JobsDocument, options);
}
exports.useJobsSuspenseQuery = useJobsSuspenseQuery;
exports.SearchJobDocument = (0, client_1.gql) `
    query SearchJob($name: String!, $page: Int!, $limit: Int!, $sort: String!) {
  searchJob(name: $name, page: $page, limit: $limit, sort: $sort) {
    jobs {
      id
      title
      description
      city
      updatedAt
      skills {
        id
        title
      }
    }
  }
}
    `;
function useSearchJobQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SearchJobDocument, options);
}
exports.useSearchJobQuery = useSearchJobQuery;
function useSearchJobLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SearchJobDocument, options);
}
exports.useSearchJobLazyQuery = useSearchJobLazyQuery;
function useSearchJobSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(exports.SearchJobDocument, options);
}
exports.useSearchJobSuspenseQuery = useSearchJobSuspenseQuery;
exports.SkillsDocument = (0, client_1.gql) `
    query skills($title: String!, $limit: Int) {
  skills(title: $title, limit: $limit) {
    skills {
      id
      title
    }
    message
    status
  }
}
    `;
function useSkillsQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.SkillsDocument, options);
}
exports.useSkillsQuery = useSkillsQuery;
function useSkillsLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.SkillsDocument, options);
}
exports.useSkillsLazyQuery = useSkillsLazyQuery;
function useSkillsSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(exports.SkillsDocument, options);
}
exports.useSkillsSuspenseQuery = useSkillsSuspenseQuery;
exports.JobDocument = (0, client_1.gql) `
    query job($id: Int!) {
  job(id: $id) {
    job {
      title
      description
      city
      updatedAt
      skills {
        id
        title
      }
    }
  }
}
    `;
function useJobQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(exports.JobDocument, options);
}
exports.useJobQuery = useJobQuery;
function useJobLazyQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(exports.JobDocument, options);
}
exports.useJobLazyQuery = useJobLazyQuery;
function useJobSuspenseQuery(baseOptions) {
    const options = Object.assign(Object.assign({}, defaultOptions), baseOptions);
    return Apollo.useSuspenseQuery(exports.JobDocument, options);
}
exports.useJobSuspenseQuery = useJobSuspenseQuery;
