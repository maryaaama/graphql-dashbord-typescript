import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
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

export const CREATE_USER = gql`
  mutation CreateUser($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      message
      status
    }
  }
`;
export const DELETE_JOB = gql`
  mutation DeleteJob($id: Int!) {
    deleteJob(id: $id) {
      message
      status
    }
  }
`;

export const CREATE_JOB = gql`
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

export const UPDATE_JOB = gql`
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