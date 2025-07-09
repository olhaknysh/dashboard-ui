import { computed } from '@angular/core';
import { inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  signalStore,
  withState,
  withMethods,
  withHooks,
  withComputed,
  withProps,
} from '@ngrx/signals';
import { patchState } from '@ngrx/signals';
import { catchError, of, tap } from 'rxjs';

import {
  Task,
  TaskService,
  NotificationService,
  TaskStatus,
} from '../../services';

import { TASK_INITIAL_STATE } from './task.store.constant';
import { TaskState } from './task.store.interface';

export const TaskStore = signalStore(
  { providedIn: 'root' },
  withState<TaskState>(TASK_INITIAL_STATE),
  withComputed((state) => ({
    allTasksCount: computed(() => state.tasks().length),
  })),
  withProps(() => ({
    taskService: inject(TaskService),
    notificationService: inject(NotificationService),
  })),
  withMethods(({ taskService, notificationService, ...store }) => ({
    loadTasks(): void {
      patchState(store, { isLoading: true, error: null });

      taskService
        .getTasks()
        .pipe(
          tap((tasks) => {
            patchState(store, { tasks, isLoading: false });
          }),
          catchError(() => {
            notificationService.error('Error loading tasks');
            return of([]);
          }),
          takeUntilDestroyed(),
        )
        .subscribe();
    },

    addTask(task: Omit<Task, 'id' | 'created'>): void {
      const newTask: Task = {
        ...task,
        id: Date.now(),
        created: new Date(),
      };
      patchState(store, {
        tasks: [...store.tasks(), newTask],
      });
    },

    updateTask(id: number, updates: Partial<Task>): void {
      const tasks = store
        .tasks()
        .map((task) => (task.id === id ? { ...task, ...updates } : task));
      patchState(store, { tasks });
    },

    deleteTask(id: number): void {
      const tasks = store.tasks().filter((task) => task.id !== id);
      patchState(store, { tasks });
    },

    toggleTaskStatus(id: number): void {
      const tasks = store.tasks().map((task) => {
        if (task.id === id) {
          const newStatus: Task['status'] =
            task.status === TaskStatus.COMPLETED
              ? TaskStatus.NEW
              : TaskStatus.COMPLETED;
          return { ...task, status: newStatus };
        }
        return task;
      });
      patchState(store, { tasks });
    },

    setSearchTerm(searchTerm: string): void {
      patchState(store, { searchTerm });
    },

    clearSearch(): void {
      patchState(store, { searchTerm: '' });
    },

    clearError(): void {
      patchState(store, { error: null });
    },

    reset(): void {
      patchState(store, {
        tasks: [],
        isLoading: false,
        error: null,
        searchTerm: '',
      });
    },
  })),
  withHooks({
    onInit({ loadTasks }) {
      loadTasks();
    },
  }),
);
