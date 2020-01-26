/* eslint-disable */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** Monetary value type */
  Monetary: any,
};

export type AuthResponse = {
   __typename?: 'AuthResponse',
  token: Scalars['String'],
  user: User,
};

export type Currency = {
   __typename?: 'Currency',
  exchangeRateDollar: Scalars['Float'],
  id: Scalars['ID'],
  name: Scalars['String'],
};

export type CurrencyAccount = {
   __typename?: 'CurrencyAccount',
  balance: Scalars['Float'],
  currency: Currency,
  id: Scalars['ID'],
  walletId: Scalars['String'],
};

export type CurrencyAccountInput = {
  balance: Scalars['Float'],
  currencyName: Scalars['String'],
  walletId: Scalars['String'],
};


export type Mutation = {
   __typename?: 'Mutation',
  addCurrencyAccount: User,
  deleteCurrencyAccount: User,
  dropAndSeedDB: Scalars['Boolean'],
  login: AuthResponse,
  register: AuthResponse,
  submitTransaction: Transaction,
};


export type MutationAddCurrencyAccountArgs = {
  data: CurrencyAccountInput
};


export type MutationDeleteCurrencyAccountArgs = {
  currencyName: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationRegisterArgs = {
  data: RegisterInput
};


export type MutationSubmitTransactionArgs = {
  data: SubmitTransactionInput
};

export type Query = {
   __typename?: 'Query',
  currencies: Array<Currency>,
  me: User,
  otherUsers: Array<User>,
  transaction: Transaction,
  transactions: Array<Transaction>,
};


export type QueryTransactionArgs = {
  transactionId: Scalars['String']
};

export type RegisterInput = {
  description?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  maxAmountPerTransactionDollar: Scalars['Float'],
  name: Scalars['String'],
  password: Scalars['String'],
};

export type SubmitTransactionInput = {
  amount: Scalars['Float'],
  currencyName: Scalars['String'],
  targetUserId: Scalars['String'],
};

export type Transaction = {
   __typename?: 'Transaction',
  amount: Scalars['Float'],
  createdAt: Scalars['String'],
  currency: Currency,
  error?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  processedAt?: Maybe<Scalars['String']>,
  source: User,
  state: Scalars['String'],
  target: User,
};

export type User = {
   __typename?: 'User',
  currencyAccounts: Array<CurrencyAccount>,
  description?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  id: Scalars['ID'],
  maxAmountPerTransactionDollar: Scalars['Float'],
  name: Scalars['String'],
};

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'maxAmountPerTransactionDollar' | 'description'>
  ) }
);

export type CurrenciesQueryVariables = {};


export type CurrenciesQuery = (
  { __typename?: 'Query' }
  & { currencies: Array<(
    { __typename?: 'Currency' }
    & Pick<Currency, 'id' | 'name' | 'exchangeRateDollar'>
  )> }
);

export type AddCurrencyAccountMutationVariables = {
  data: CurrencyAccountInput
};


export type AddCurrencyAccountMutation = (
  { __typename?: 'Mutation' }
  & { addCurrencyAccount: (
    { __typename?: 'User' }
    & Pick<User, 'id'>
  ) }
);

export type CurrencyAccountsQueryVariables = {};


export type CurrencyAccountsQuery = (
  { __typename?: 'Query' }
  & { me: (
    { __typename?: 'User' }
    & { currencyAccounts: Array<(
      { __typename?: 'CurrencyAccount' }
      & Pick<CurrencyAccount, 'id' | 'balance' | 'walletId'>
      & { currency: (
        { __typename?: 'Currency' }
        & Pick<Currency, 'name' | 'exchangeRateDollar'>
      ) }
    )> }
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type RegisterMutationVariables = {
  data: RegisterInput
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name'>
    ) }
  ) }
);

export type SubmitTransactionMutationVariables = {
  data: SubmitTransactionInput
};


export type SubmitTransactionMutation = (
  { __typename?: 'Mutation' }
  & { submitTransaction: (
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id'>
  ) }
);

export type OtherUsersQueryVariables = {};


export type OtherUsersQuery = (
  { __typename?: 'Query' }
  & { otherUsers: Array<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name'>
  )> }
);

export type TransactionsQueryVariables = {};


export type TransactionsQuery = (
  { __typename?: 'Query' }
  & { transactions: Array<(
    { __typename?: 'Transaction' }
    & Pick<Transaction, 'id' | 'amount' | 'createdAt' | 'processedAt' | 'state' | 'error'>
    & { currency: (
      { __typename?: 'Currency' }
      & Pick<Currency, 'name'>
    ), target: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ), source: (
      { __typename?: 'User' }
      & Pick<User, 'name'>
    ) }
  )> }
);


export const MeDocument = gql`
    query me {
  me {
    id
    name
    email
    maxAmountPerTransactionDollar
    description
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const CurrenciesDocument = gql`
    query currencies {
  currencies {
    id
    name
    exchangeRateDollar
  }
}
    `;

/**
 * __useCurrenciesQuery__
 *
 * To run a query within a React component, call `useCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrenciesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, baseOptions);
      }
export function useCurrenciesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, baseOptions);
        }
export type CurrenciesQueryHookResult = ReturnType<typeof useCurrenciesQuery>;
export type CurrenciesLazyQueryHookResult = ReturnType<typeof useCurrenciesLazyQuery>;
export type CurrenciesQueryResult = ApolloReactCommon.QueryResult<CurrenciesQuery, CurrenciesQueryVariables>;
export const AddCurrencyAccountDocument = gql`
    mutation addCurrencyAccount($data: CurrencyAccountInput!) {
  addCurrencyAccount(data: $data) {
    id
  }
}
    `;
export type AddCurrencyAccountMutationFn = ApolloReactCommon.MutationFunction<AddCurrencyAccountMutation, AddCurrencyAccountMutationVariables>;

/**
 * __useAddCurrencyAccountMutation__
 *
 * To run a mutation, you first call `useAddCurrencyAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCurrencyAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCurrencyAccountMutation, { data, loading, error }] = useAddCurrencyAccountMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddCurrencyAccountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddCurrencyAccountMutation, AddCurrencyAccountMutationVariables>) {
        return ApolloReactHooks.useMutation<AddCurrencyAccountMutation, AddCurrencyAccountMutationVariables>(AddCurrencyAccountDocument, baseOptions);
      }
export type AddCurrencyAccountMutationHookResult = ReturnType<typeof useAddCurrencyAccountMutation>;
export type AddCurrencyAccountMutationResult = ApolloReactCommon.MutationResult<AddCurrencyAccountMutation>;
export type AddCurrencyAccountMutationOptions = ApolloReactCommon.BaseMutationOptions<AddCurrencyAccountMutation, AddCurrencyAccountMutationVariables>;
export const CurrencyAccountsDocument = gql`
    query currencyAccounts {
  me {
    currencyAccounts {
      id
      balance
      walletId
      currency {
        name
        exchangeRateDollar
      }
    }
  }
}
    `;

/**
 * __useCurrencyAccountsQuery__
 *
 * To run a query within a React component, call `useCurrencyAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrencyAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrencyAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrencyAccountsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrencyAccountsQuery, CurrencyAccountsQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrencyAccountsQuery, CurrencyAccountsQueryVariables>(CurrencyAccountsDocument, baseOptions);
      }
export function useCurrencyAccountsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrencyAccountsQuery, CurrencyAccountsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrencyAccountsQuery, CurrencyAccountsQueryVariables>(CurrencyAccountsDocument, baseOptions);
        }
export type CurrencyAccountsQueryHookResult = ReturnType<typeof useCurrencyAccountsQuery>;
export type CurrencyAccountsLazyQueryHookResult = ReturnType<typeof useCurrencyAccountsLazyQuery>;
export type CurrencyAccountsQueryResult = ApolloReactCommon.QueryResult<CurrencyAccountsQuery, CurrencyAccountsQueryVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      name
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation register($data: RegisterInput!) {
  register(data: $data) {
    token
    user {
      id
      name
    }
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SubmitTransactionDocument = gql`
    mutation submitTransaction($data: SubmitTransactionInput!) {
  submitTransaction(data: $data) {
    id
  }
}
    `;
export type SubmitTransactionMutationFn = ApolloReactCommon.MutationFunction<SubmitTransactionMutation, SubmitTransactionMutationVariables>;

/**
 * __useSubmitTransactionMutation__
 *
 * To run a mutation, you first call `useSubmitTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitTransactionMutation, { data, loading, error }] = useSubmitTransactionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSubmitTransactionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubmitTransactionMutation, SubmitTransactionMutationVariables>) {
        return ApolloReactHooks.useMutation<SubmitTransactionMutation, SubmitTransactionMutationVariables>(SubmitTransactionDocument, baseOptions);
      }
export type SubmitTransactionMutationHookResult = ReturnType<typeof useSubmitTransactionMutation>;
export type SubmitTransactionMutationResult = ApolloReactCommon.MutationResult<SubmitTransactionMutation>;
export type SubmitTransactionMutationOptions = ApolloReactCommon.BaseMutationOptions<SubmitTransactionMutation, SubmitTransactionMutationVariables>;
export const OtherUsersDocument = gql`
    query otherUsers {
  otherUsers {
    id
    name
  }
}
    `;

/**
 * __useOtherUsersQuery__
 *
 * To run a query within a React component, call `useOtherUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOtherUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOtherUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useOtherUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OtherUsersQuery, OtherUsersQueryVariables>) {
        return ApolloReactHooks.useQuery<OtherUsersQuery, OtherUsersQueryVariables>(OtherUsersDocument, baseOptions);
      }
export function useOtherUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OtherUsersQuery, OtherUsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<OtherUsersQuery, OtherUsersQueryVariables>(OtherUsersDocument, baseOptions);
        }
export type OtherUsersQueryHookResult = ReturnType<typeof useOtherUsersQuery>;
export type OtherUsersLazyQueryHookResult = ReturnType<typeof useOtherUsersLazyQuery>;
export type OtherUsersQueryResult = ApolloReactCommon.QueryResult<OtherUsersQuery, OtherUsersQueryVariables>;
export const TransactionsDocument = gql`
    query transactions {
  transactions {
    id
    amount
    currency {
      name
    }
    createdAt
    processedAt
    target {
      name
    }
    source {
      name
    }
    state
    error
  }
}
    `;

/**
 * __useTransactionsQuery__
 *
 * To run a query within a React component, call `useTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransactionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTransactionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
        return ApolloReactHooks.useQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
      }
export function useTransactionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TransactionsQuery, TransactionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TransactionsQuery, TransactionsQueryVariables>(TransactionsDocument, baseOptions);
        }
export type TransactionsQueryHookResult = ReturnType<typeof useTransactionsQuery>;
export type TransactionsLazyQueryHookResult = ReturnType<typeof useTransactionsLazyQuery>;
export type TransactionsQueryResult = ApolloReactCommon.QueryResult<TransactionsQuery, TransactionsQueryVariables>;