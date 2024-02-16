import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Upload: { input: any; output: any; }
};

export type ActiveToken = {
  __typename?: 'ActiveToken';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  tokens?: Maybe<Array<Maybe<Tokendata>>>;
};

export type Booleaninfo = {
  __typename?: 'Booleaninfo';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Job = {
  __typename?: 'Job';
  city?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
  skills?: Maybe<Array<Maybe<Skills>>>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Jobinfo = {
  __typename?: 'Jobinfo';
  job?: Maybe<Job>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type Jobinfopaginate = {
  __typename?: 'Jobinfopaginate';
  jobs?: Maybe<Array<Maybe<Job>>>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPage?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createJob: Jobinfo;
  createSkill?: Maybe<Booleaninfo>;
  createUser?: Maybe<Booleaninfo>;
  deleteJob?: Maybe<Booleaninfo>;
  deleteToken?: Maybe<Booleaninfo>;
  deleteUser?: Maybe<Booleaninfo>;
  login: Token;
  logout?: Maybe<Booleaninfo>;
  updateJob?: Maybe<Booleaninfo>;
  updateUser: Userwithinfo;
};


export type MutationCreateJobArgs = {
  city: Scalars['String']['input'];
  description: Scalars['String']['input'];
  skills: Array<InputMaybe<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};


export type MutationCreateSkillArgs = {
  title: Scalars['String']['input'];
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteJobArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationDeleteTokenArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationLogoutArgs = {
  token: Scalars['String']['input'];
};


export type MutationUpdateJobArgs = {
  city: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['Int']['input'];
  skills: Array<InputMaybe<Scalars['String']['input']>>;
  title: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  password: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  job?: Maybe<Jobinfo>;
  jobs?: Maybe<Jobinfopaginate>;
  searchJob?: Maybe<SearchJobInfo>;
  showtokens?: Maybe<ActiveToken>;
  skills?: Maybe<Skillinfo>;
  user?: Maybe<User>;
};


export type QueryJobArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryJobsArgs = {
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sort: Scalars['String']['input'];
};


export type QuerySearchJobArgs = {
  limit: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  sort: Scalars['String']['input'];
};


export type QuerySkillsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  title: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['Int']['input'];
};

export type Token = {
  __typename?: 'Token';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type Tokendata = {
  __typename?: 'Tokendata';
  createdAt?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type Userwithinfo = {
  __typename?: 'Userwithinfo';
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type SearchJobInfo = {
  __typename?: 'searchJobInfo';
  jobs?: Maybe<Array<Maybe<Job>>>;
  message: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  totalCount?: Maybe<Scalars['Int']['output']>;
  totalPage?: Maybe<Scalars['Int']['output']>;
};

export type Skillinfo = {
  __typename?: 'skillinfo';
  message: Scalars['String']['output'];
  skills?: Maybe<Array<Maybe<Skills>>>;
  status: Scalars['Boolean']['output'];
};

export type Skills = {
  __typename?: 'skills';
  id?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'Token', token?: string | null, status: boolean, user?: { __typename?: 'User', email?: string | null } | null } };

export type CreateUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'Booleaninfo', message: string, status: boolean } | null };

export type DeleteJobMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteJobMutation = { __typename?: 'Mutation', deleteJob?: { __typename?: 'Booleaninfo', message: string, status: boolean } | null };

export type CreateJobMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  city: Scalars['String']['input'];
  skills: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type CreateJobMutation = { __typename?: 'Mutation', createJob: { __typename?: 'Jobinfo', status: boolean, message: string, job?: { __typename?: 'Job', title?: string | null, description?: string | null, city?: string | null, skills?: Array<{ __typename?: 'skills', title?: string | null, id?: number | null } | null> | null } | null } };

export type UpdateJobMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  city: Scalars['String']['input'];
  skills: Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateJobMutation = { __typename?: 'Mutation', updateJob?: { __typename?: 'Booleaninfo', status: boolean } | null };

export type ShowtokensQueryVariables = Exact<{ [key: string]: never; }>;


export type ShowtokensQuery = { __typename?: 'Query', showtokens?: { __typename?: 'ActiveToken', message: string, status: boolean } | null };

export type JobsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sort: Scalars['String']['input'];
}>;


export type JobsQuery = { __typename?: 'Query', jobs?: { __typename?: 'Jobinfopaginate', message: string, totalPage?: number | null, jobs?: Array<{ __typename?: 'Job', id?: number | null, title?: string | null, description?: string | null, city?: string | null, updatedAt?: string | null, skills?: Array<{ __typename?: 'skills', id?: number | null, title?: string | null } | null> | null } | null> | null } | null };

export type SearchJobQueryVariables = Exact<{
  name: Scalars['String']['input'];
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  sort: Scalars['String']['input'];
}>;


export type SearchJobQuery = { __typename?: 'Query', searchJob?: { __typename?: 'searchJobInfo', jobs?: Array<{ __typename?: 'Job', id?: number | null, title?: string | null, description?: string | null, city?: string | null, updatedAt?: string | null, skills?: Array<{ __typename?: 'skills', id?: number | null, title?: string | null } | null> | null } | null> | null } | null };

export type SkillsQueryVariables = Exact<{
  title: Scalars['String']['input'];
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type SkillsQuery = { __typename?: 'Query', skills?: { __typename?: 'skillinfo', message: string, status: boolean, skills?: Array<{ __typename?: 'skills', id?: number | null, title?: string | null } | null> | null } | null };

export type JobQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type JobQuery = { __typename?: 'Query', job?: { __typename?: 'Jobinfo', job?: { __typename?: 'Job', title?: string | null, description?: string | null, city?: string | null, updatedAt?: string | null, skills?: Array<{ __typename?: 'skills', id?: number | null, title?: string | null } | null> | null } | null } | null };


export const LoginDocument = gql`
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
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!) {
  createUser(email: $email, password: $password) {
    message
    status
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteJobDocument = gql`
    mutation DeleteJob($id: Int!) {
  deleteJob(id: $id) {
    message
    status
  }
}
    `;
export type DeleteJobMutationFn = Apollo.MutationFunction<DeleteJobMutation, DeleteJobMutationVariables>;

/**
 * __useDeleteJobMutation__
 *
 * To run a mutation, you first call `useDeleteJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteJobMutation, { data, loading, error }] = useDeleteJobMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteJobMutation(baseOptions?: Apollo.MutationHookOptions<DeleteJobMutation, DeleteJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteJobMutation, DeleteJobMutationVariables>(DeleteJobDocument, options);
      }
export type DeleteJobMutationHookResult = ReturnType<typeof useDeleteJobMutation>;
export type DeleteJobMutationResult = Apollo.MutationResult<DeleteJobMutation>;
export type DeleteJobMutationOptions = Apollo.BaseMutationOptions<DeleteJobMutation, DeleteJobMutationVariables>;
export const CreateJobDocument = gql`
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
export type CreateJobMutationFn = Apollo.MutationFunction<CreateJobMutation, CreateJobMutationVariables>;

/**
 * __useCreateJobMutation__
 *
 * To run a mutation, you first call `useCreateJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJobMutation, { data, loading, error }] = useCreateJobMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      city: // value for 'city'
 *      skills: // value for 'skills'
 *   },
 * });
 */
export function useCreateJobMutation(baseOptions?: Apollo.MutationHookOptions<CreateJobMutation, CreateJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJobMutation, CreateJobMutationVariables>(CreateJobDocument, options);
      }
export type CreateJobMutationHookResult = ReturnType<typeof useCreateJobMutation>;
export type CreateJobMutationResult = Apollo.MutationResult<CreateJobMutation>;
export type CreateJobMutationOptions = Apollo.BaseMutationOptions<CreateJobMutation, CreateJobMutationVariables>;
export const UpdateJobDocument = gql`
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
export type UpdateJobMutationFn = Apollo.MutationFunction<UpdateJobMutation, UpdateJobMutationVariables>;

/**
 * __useUpdateJobMutation__
 *
 * To run a mutation, you first call `useUpdateJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJobMutation, { data, loading, error }] = useUpdateJobMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      city: // value for 'city'
 *      skills: // value for 'skills'
 *   },
 * });
 */
export function useUpdateJobMutation(baseOptions?: Apollo.MutationHookOptions<UpdateJobMutation, UpdateJobMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateJobMutation, UpdateJobMutationVariables>(UpdateJobDocument, options);
      }
export type UpdateJobMutationHookResult = ReturnType<typeof useUpdateJobMutation>;
export type UpdateJobMutationResult = Apollo.MutationResult<UpdateJobMutation>;
export type UpdateJobMutationOptions = Apollo.BaseMutationOptions<UpdateJobMutation, UpdateJobMutationVariables>;
export const ShowtokensDocument = gql`
    query Showtokens {
  showtokens {
    message
    status
  }
}
    `;

/**
 * __useShowtokensQuery__
 *
 * To run a query within a React component, call `useShowtokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useShowtokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShowtokensQuery({
 *   variables: {
 *   },
 * });
 */
export function useShowtokensQuery(baseOptions?: Apollo.QueryHookOptions<ShowtokensQuery, ShowtokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShowtokensQuery, ShowtokensQueryVariables>(ShowtokensDocument, options);
      }
export function useShowtokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShowtokensQuery, ShowtokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShowtokensQuery, ShowtokensQueryVariables>(ShowtokensDocument, options);
        }
export function useShowtokensSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ShowtokensQuery, ShowtokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ShowtokensQuery, ShowtokensQueryVariables>(ShowtokensDocument, options);
        }
export type ShowtokensQueryHookResult = ReturnType<typeof useShowtokensQuery>;
export type ShowtokensLazyQueryHookResult = ReturnType<typeof useShowtokensLazyQuery>;
export type ShowtokensSuspenseQueryHookResult = ReturnType<typeof useShowtokensSuspenseQuery>;
export type ShowtokensQueryResult = Apollo.QueryResult<ShowtokensQuery, ShowtokensQueryVariables>;
export const JobsDocument = gql`
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

/**
 * __useJobsQuery__
 *
 * To run a query within a React component, call `useJobsQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useJobsQuery(baseOptions: Apollo.QueryHookOptions<JobsQuery, JobsQueryVariables> & ({ variables: JobsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
      }
export function useJobsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobsQuery, JobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
        }
export function useJobsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<JobsQuery, JobsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<JobsQuery, JobsQueryVariables>(JobsDocument, options);
        }
export type JobsQueryHookResult = ReturnType<typeof useJobsQuery>;
export type JobsLazyQueryHookResult = ReturnType<typeof useJobsLazyQuery>;
export type JobsSuspenseQueryHookResult = ReturnType<typeof useJobsSuspenseQuery>;
export type JobsQueryResult = Apollo.QueryResult<JobsQuery, JobsQueryVariables>;
export const SearchJobDocument = gql`
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

/**
 * __useSearchJobQuery__
 *
 * To run a query within a React component, call `useSearchJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchJobQuery({
 *   variables: {
 *      name: // value for 'name'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *      sort: // value for 'sort'
 *   },
 * });
 */
export function useSearchJobQuery(baseOptions: Apollo.QueryHookOptions<SearchJobQuery, SearchJobQueryVariables> & ({ variables: SearchJobQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchJobQuery, SearchJobQueryVariables>(SearchJobDocument, options);
      }
export function useSearchJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchJobQuery, SearchJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchJobQuery, SearchJobQueryVariables>(SearchJobDocument, options);
        }
export function useSearchJobSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchJobQuery, SearchJobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchJobQuery, SearchJobQueryVariables>(SearchJobDocument, options);
        }
export type SearchJobQueryHookResult = ReturnType<typeof useSearchJobQuery>;
export type SearchJobLazyQueryHookResult = ReturnType<typeof useSearchJobLazyQuery>;
export type SearchJobSuspenseQueryHookResult = ReturnType<typeof useSearchJobSuspenseQuery>;
export type SearchJobQueryResult = Apollo.QueryResult<SearchJobQuery, SearchJobQueryVariables>;
export const SkillsDocument = gql`
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

/**
 * __useSkillsQuery__
 *
 * To run a query within a React component, call `useSkillsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSkillsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSkillsQuery({
 *   variables: {
 *      title: // value for 'title'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useSkillsQuery(baseOptions: Apollo.QueryHookOptions<SkillsQuery, SkillsQueryVariables> & ({ variables: SkillsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, options);
      }
export function useSkillsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SkillsQuery, SkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, options);
        }
export function useSkillsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SkillsQuery, SkillsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SkillsQuery, SkillsQueryVariables>(SkillsDocument, options);
        }
export type SkillsQueryHookResult = ReturnType<typeof useSkillsQuery>;
export type SkillsLazyQueryHookResult = ReturnType<typeof useSkillsLazyQuery>;
export type SkillsSuspenseQueryHookResult = ReturnType<typeof useSkillsSuspenseQuery>;
export type SkillsQueryResult = Apollo.QueryResult<SkillsQuery, SkillsQueryVariables>;
export const JobDocument = gql`
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

/**
 * __useJobQuery__
 *
 * To run a query within a React component, call `useJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useJobQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJobQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useJobQuery(baseOptions: Apollo.QueryHookOptions<JobQuery, JobQueryVariables> & ({ variables: JobQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<JobQuery, JobQueryVariables>(JobDocument, options);
      }
export function useJobLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<JobQuery, JobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<JobQuery, JobQueryVariables>(JobDocument, options);
        }
export function useJobSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<JobQuery, JobQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<JobQuery, JobQueryVariables>(JobDocument, options);
        }
export type JobQueryHookResult = ReturnType<typeof useJobQuery>;
export type JobLazyQueryHookResult = ReturnType<typeof useJobLazyQuery>;
export type JobSuspenseQueryHookResult = ReturnType<typeof useJobSuspenseQuery>;
export type JobQueryResult = Apollo.QueryResult<JobQuery, JobQueryVariables>;