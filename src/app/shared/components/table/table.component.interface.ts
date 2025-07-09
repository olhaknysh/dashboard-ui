export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  type?: TableColumnType;
}

export type TableColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'boolean'
  | 'action'
  | 'custom';
export type TableActionColor = 'primary' | 'accent' | 'warn';

export interface TableAction {
  label: string;
  icon: string;
  action: string;
  disabled?: boolean;
  color?: TableActionColor;
}

export interface TableHeaderConfig {
  showSearch?: boolean;
  showFilter?: boolean;
  showSort?: boolean;
  showGroup?: boolean;
  showCreate?: boolean;
  showDataSwitcher?: boolean;
  dataSwitcherOptions?: { label: string; value: string }[];
  createButtonLabel?: string;
  searchPlaceholder?: string;
}
