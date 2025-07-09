import { TableAction, TableColumn } from '../../../shared';

export const WORK_QUEUE_TABLE_COLUMNS: TableColumn[] = [
  {
    key: 'originator',
    label: 'Originator',
    sortable: true,
    filterable: false,
    type: 'custom',
  },
  {
    key: 'clientLine',
    label: 'Client/Line',
    sortable: true,
    filterable: false,
    type: 'custom',
  },
  {
    key: 'type',
    label: 'Type',
    sortable: true,
    filterable: false,
  },
  {
    key: 'status',
    label: 'Status',
    sortable: true,
    filterable: false,
    type: 'custom',
  },
  {
    key: 'created',
    label: 'Created',
    sortable: true,
    type: 'date',
  },
  {
    key: 'actions',
    label: 'Actions',
    type: 'action',
  },
];

export const WORK_QUEUE_TABLE_ACTIONS: TableAction[] = [
  { label: 'View Details', icon: 'visibility', action: 'view' },
  { label: 'Edit Task', icon: 'edit', action: 'edit' },
  { label: 'Mark Complete', icon: 'check_circle', action: 'complete' },
  { label: 'Delete', icon: 'delete', action: 'delete', color: 'warn' },
];

export const WORK_QUEUE_TABLE_HEADER_CONFIG = {
  showSearch: false,
  showFilter: false,
  showSort: false,
  showGroup: false,
  showCreate: false,
  showDataSwitcher: false,
};
