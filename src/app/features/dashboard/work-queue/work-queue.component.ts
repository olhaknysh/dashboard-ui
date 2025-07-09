import {
  ChangeDetectionStrategy,
  Component,
  signal,
  computed,
  inject,
  DoCheck,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';

import {
  ContainerComponent,
  TableComponent,
  ContainerTitleComponent,
  UserAvatarComponent,
  StatusComponent,
  TabsComponent,
  Tab,
  DialogComponent,
} from '../../../shared';
import { TaskStore } from '../../../store';
import { Task, TaskStatus, TaskType } from '../../../services/tasks';
import { NotificationService } from '../../../services';

import { WorkQueueType } from './work-queue.component.interface';
import {
  WORK_QUEUE_TABLE_ACTIONS,
  WORK_QUEUE_TABLE_COLUMNS,
  WORK_QUEUE_TABLE_HEADER_CONFIG,
} from './work-queue.component.constant';

@Component({
  selector: 'app-work-queue',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    TableComponent,
    ContainerTitleComponent,
    UserAvatarComponent,
    StatusComponent,
    TabsComponent,
  ],
  templateUrl: './work-queue.component.html',
  styleUrls: ['./work-queue.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkQueueComponent implements DoCheck {
  private readonly taskStore = inject(TaskStore);
  private readonly notificationService = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  activeFilter = signal<WorkQueueType>(WorkQueueType.ASSIGNED);

  allTasks = computed(() => this.taskStore.tasks());
  assignedTasksCount = computed(() => this.allTasks().length);
  pendingTasksCount = computed(
    () =>
      this.allTasks().filter((task) => task.status === TaskStatus.PENDING)
        .length,
  );
  referralsCount = computed(
    () =>
      this.allTasks().filter(
        (task) => task.type === TaskType.UNDERWRITER_REFERRAL,
      ).length,
  );

  filteredTasks = computed(() => {
    const tasks = this.allTasks();
    const filter = this.activeFilter();

    switch (filter) {
      case WorkQueueType.ASSIGNED:
        return tasks;
      case WorkQueueType.PENDING:
        return tasks.filter((task) => task.status === TaskStatus.PENDING);
      case WorkQueueType.REFERRALS:
        return tasks.filter(
          (task) => task.type === TaskType.UNDERWRITER_REFERRAL,
        );
      default:
        return tasks;
    }
  });

  tableColumns = WORK_QUEUE_TABLE_COLUMNS;
  tableActions = WORK_QUEUE_TABLE_ACTIONS;
  headerConfig = WORK_QUEUE_TABLE_HEADER_CONFIG;
  tabs: Tab[] = [
    {
      id: WorkQueueType.ASSIGNED,
      label: `Assigned to me (${this.assignedTasksCount()})`,
      icon: 'assignment_ind',
    },
    {
      id: WorkQueueType.PENDING,
      label: `Pending review (${this.pendingTasksCount()})`,
      icon: 'hourglass_empty',
    },
    {
      id: WorkQueueType.REFERRALS,
      label: `Referrals (${this.referralsCount()})`,
      icon: 'supervisor_account',
    },
  ];

  ngDoCheck() {
    this.tabs[0].label = `Assigned to me (${this.assignedTasksCount()})`;
    this.tabs[1].label = `Pending review (${this.pendingTasksCount()})`;
    this.tabs[2].label = `Referrals (${this.referralsCount()})`;
  }

  setActiveFilter(filter: WorkQueueType) {
    this.activeFilter.set(filter);
  }

  onTabChange(tabId: string) {
    this.setActiveFilter(tabId as WorkQueueType);
  }

  onActionSelect(event: { action: string; row: unknown }) {
    if (event.action === 'view') {
      this.dialog.open(DialogComponent, {
        data: {
          title: 'Task Details',
          items: [
            (event.row as Task).originator.name,
            (event.row as Task).client,
            (event.row as Task).line,
            (event.row as Task).type,
          ],
        },
      });
    }

    if (event.action === 'delete') {
      this.taskStore.deleteTask((event.row as Task).id);
    }

    if (event.action === 'complete') {
      this.taskStore.updateTask((event.row as Task).id, {
        status: TaskStatus.COMPLETED,
      });
    }

    if (event.action === 'edit') {
      this.notificationService.show('Not implemented');
    }
  }
}
