import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Task } from './task.service.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly http = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('/assets/data/tasks.json').pipe(
      map((tasks) =>
        tasks.map((task) => ({
          ...task,
          created: new Date(task.created),
        })),
      ),
    );
  }
}
