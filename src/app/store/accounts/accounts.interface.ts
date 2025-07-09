import {
  Account,
  AccountInfo,
  AccountSpecificationNode,
  Message,
  Policy,
} from '../../services';

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
  messages: Message[];
  policies: Policy[];
}

export interface AccountSpecificationState {
  tree: AccountSpecificationNode[];
  selectedNodeId: string | null;
  isLoading: boolean;
  error: string | null;
}
