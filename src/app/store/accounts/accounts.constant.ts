import { AccountInfoState } from './accounts.interface';

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
};
