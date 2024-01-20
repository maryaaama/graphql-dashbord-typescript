import { gql } from "@apollo/client";

export const SHOW_TOKENS = gql`
  query Showtokens {
    showtokens {
      message
      status
    }
  }
`;
export const JOB_QUERY = gql`
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
export const SEARCH_QUERY = gql`
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

export const SKILLS = gql`
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

export const JOB = gql`
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