import { Account, AccountInfo } from '../../services';

export interface AccountsState {
  accounts: Account[];
  isLoading: boolean;
  error: string | null;
  selectedAccount: Account | null;
}

export interface AccountInfoState {
  selectedAccountInfo: AccountInfo | null;
  isLoading: boolean;
  error: string | null;
}
