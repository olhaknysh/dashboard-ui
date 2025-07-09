import {
  AccountInfoState,
  AccountSpecificationState,
} from './accounts.interface';

export const ACCOUNTS_INITIAL_STATE = {
  accounts: [],
  isLoading: false,
  error: null,
  selectedAccount: null,
};

export const ACCOUNT_INFO_INITIAL_STATE: AccountInfoState = {
  selectedAccountInfo: null,
  isLoading: false,
  error: null,
  messages: [],
  policies: [],
};

export const ACCOUNT_SPECIFICATION_INITIAL_STATE: AccountSpecificationState = {
  tree: [],
  selectedNodeId: null,
  isLoading: false,
  error: null,
};
