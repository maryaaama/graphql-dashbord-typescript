"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JOB = exports.SKILLS = exports.SEARCH_QUERY = exports.JOB_QUERY = exports.SHOW_TOKENS = void 0;
const client_1 = require("@apollo/client");
exports.SHOW_TOKENS = (0, client_1.gql) `
  query Showtokens {
    showtokens {
      message
      status
    }
  }
`;
exports.JOB_QUERY = (0, client_1.gql) `
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
exports.SEARCH_QUERY = (0, client_1.gql) `
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
exports.SKILLS = (0, client_1.gql) `
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
exports.JOB = (0, client_1.gql) `
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
