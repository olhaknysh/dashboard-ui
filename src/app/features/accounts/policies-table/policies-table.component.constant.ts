import { TableColumn, TableHeaderConfig, TableAction } from '../../../shared';

export const POLICIES_COLUMNS: TableColumn[] = [
  { key: 'line', label: 'Line', sortable: true, type: 'custom' },
  { key: 'effDate', label: 'Eff. Date', sortable: true, type: 'date' },
  { key: 'expDate', label: 'Exp. Date', sortable: true, type: 'date' },
  { key: 'status', label: 'Status', sortable: true, type: 'custom' },
  {
    key: 'expiringTech',
    label: 'Expiring Tech',
    sortable: true,
    type: 'custom',
  },
  {
    key: 'expiringPremium',
    label: 'Expiring Premium',
    sortable: true,
    type: 'custom',
  },
  {
    key: 'renewalToTech',
    label: 'Renewal To Tech',
    sortable: true,
    type: 'custom',
  },
  { key: 'renewalTech', label: 'Renewal Tech', sortable: true, type: 'custom' },
  {
    key: 'renewalPremium',
    label: 'Renewal Premium',
    sortable: true,
    type: 'custom',
  },
  { key: 'rateChange', label: 'Rate Change', sortable: true, type: 'custom' },
  { key: 'lossRatio', label: 'Loss Ratio', sortable: true, type: 'custom' },
  { key: 'actions', label: '', type: 'action' },
];

export const POLICIES_TABLE_HEADER_CONFIG: TableHeaderConfig = {
  showSearch: true,
  showFilter: true,
  showSort: true,
  showCreate: false,
  showGroup: false,
  createButtonLabel: '',
  searchPlaceholder: 'Search policies...',
};

export const POLICIES_TABLE_ACTIONS: TableAction[] = [
  { label: 'View', icon: 'visibility', action: 'view' },
  { label: 'Edit', icon: 'edit', action: 'edit' },
  { label: 'Delete', icon: 'delete', action: 'delete', color: 'warn' },
];
