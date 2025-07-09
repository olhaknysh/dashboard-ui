import { TableAction, TableColumn, TableHeaderConfig } from '../../../shared';

export const MY_ACCOUNTS_COLUMNS: TableColumn[] = [
  { key: 'accountName', label: 'Account Name/Type', sortable: true },
  { key: 'line', label: 'Line', sortable: true },
  { key: 'broker', label: 'Broker', sortable: true },
  { key: 'renewalDate', label: 'Renewal Date', sortable: true, type: 'date' },
  { key: 'premium', label: 'Premium', sortable: true, type: 'custom' },
  {
    key: 'ratedPremium',
    label: 'Rated Premium',
    sortable: true,
    type: 'custom',
  },
  { key: 'lossRatio', label: 'Loss Ratio', sortable: true, type: 'custom' },
  { key: 'appetite', label: 'Appetite', sortable: true, type: 'custom' },
  { key: 'status', label: 'Status', sortable: true, type: 'custom' },
  { key: 'triage', label: 'Triage', sortable: true, type: 'custom' },
  { key: 'winnability', label: 'Winnability', sortable: false, type: 'custom' },
  { key: 'actions', label: '', type: 'action' },
];

export const MY_ACCOUNTS_TABLE_HEADER_CONFIG: TableHeaderConfig = {
  showSearch: true,
  showFilter: true,
  showSort: true,
  showCreate: true,
  showGroup: true,
  createButtonLabel: 'Create New',
  searchPlaceholder: 'Search accounts...',
};

export const MY_ACCOUNTS_TABLE_ACTIONS: TableAction[] = [
  { label: 'View', icon: 'visibility', action: 'view' },
  { label: 'Edit', icon: 'edit', action: 'edit' },
  { label: 'Delete', icon: 'delete', action: 'delete', color: 'warn' },
];
