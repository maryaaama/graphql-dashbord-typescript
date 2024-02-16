"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_JOB = exports.CREATE_JOB = exports.DELETE_JOB = exports.CREATE_USER = exports.LOGIN_USER = void 0;
const client_1 = require("@apollo/client");
exports.LOGIN_USER = (0, client_1.gql) `
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
exports.CREATE_USER = (0, client_1.gql) `
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      message
      status
    }
  }
`;
exports.DELETE_JOB = (0, client_1.gql) `
  mutation DeleteJob($id: Int!) {
    deleteJob(id: $id) {
      message
      status
    }
  }
`;
exports.CREATE_JOB = (0, client_1.gql) `
  mutation CreateJob(
    $title: String!
    $description: String!
    $city: String!
    $skills: [String]!
  ) {
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
exports.UPDATE_JOB = (0, client_1.gql) `
  mutation UpdateJob(
    $id: Int!
    $title: String!
    $description: String!
    $city: String!
    $skills: [String]!
  ) {
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
