import {
  Component,
  signal,
  computed,
  input,
  AfterViewInit,
  effect,
  ContentChild,
  TemplateRef,
  viewChild,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import { SearchComponent } from '../search';
import { ButtonComponent } from '../button';

import {
  TableAction,
  TableColumn,
  TableHeaderConfig,
} from './table.component.interface';

@Component({
  selector: 'app-table',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    MatChipsModule,
    MatTooltipModule,
    SearchComponent,
    ButtonComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements AfterViewInit {
  columns = input<TableColumn[]>([]);
  data = input<unknown[]>([]);
  actions = input<TableAction[]>([]);
  headerConfig = input<TableHeaderConfig>({});

  actionSelect = output<{ action: string; row: unknown }>();
  createClick = output<void>();
  searchChange = output<string>();

  sort = viewChild.required<MatSort>(MatSort);
  paginator = viewChild.required<MatPaginator>(MatPaginator);

  searchTerm = '';
  selectedRow = signal<unknown>(null);

  isFilterActive = signal(false);
  isSortActive = signal(false);
  isGroupActive = signal(false);

  isHeaderShown = computed(() => {
    return (
      this.headerConfig().showSearch ||
      this.headerConfig().showFilter ||
      this.headerConfig().showSort ||
      this.headerConfig().showGroup ||
      this.headerConfig().showCreate
    );
  });

  displayedColumns = computed(() => {
    return this.columns().map((col) => col.key);
  });

  @ContentChild('customCell', { static: false })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customCellTemplate!: TemplateRef<any>;

  private _dataSource = new MatTableDataSource<unknown>([]);

  constructor() {
    this._dataSource.filterPredicate = (data: unknown, filter: string) => {
      const searchStr = filter.toLowerCase();

      return Object.values(data as Record<string, unknown>).some((value) =>
        String(value).toLowerCase().includes(searchStr),
      );
    };

    effect(() => {
      this._dataSource.data = this.data();
    });
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this._dataSource.paginator = this.paginator();
    }

    if (this.sort) {
      this._dataSource.sort = this.sort();
    }
  }

  get dataSource() {
    return this._dataSource;
  }

  onSearchChangeFromComponent(value: string) {
    this.searchTerm = value;
    this._dataSource.filter = value;
    this.searchChange.emit(value);
  }

  onClearSearch() {
    this.searchTerm = '';
    this._dataSource.filter = '';
    this.searchChange.emit('');
  }

  toggleFilter() {
    this.isFilterActive.update((active) => !active);
  }

  toggleSort() {
    this.isSortActive.update((active) => !active);
  }

  toggleGroup() {
    this.isGroupActive.update((active) => !active);
  }

  onCreateClick() {
    this.createClick.emit();
  }

  onActionClick(event: Event, row: unknown) {
    event.stopPropagation();
    this.selectedRow.set(row);
  }

  onActionSelect(action: TableAction, row: unknown) {
    this.actionSelect.emit({ action: action.action, row });
  }
}
