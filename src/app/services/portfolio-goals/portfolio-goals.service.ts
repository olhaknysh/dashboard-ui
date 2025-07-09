import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  PortfolioGoal,
  TargetProgressBarData,
} from './portfolio-goals.service.interface';

@Injectable({ providedIn: 'root' })
export class PortfolioGoalsService {
  private readonly http = inject(HttpClient);

  getPortfolioGoals(): Observable<PortfolioGoal[]> {
    return this.http.get<PortfolioGoal[]>('/assets/data/portfolio-goals.json');
  }

  getTargetProgressBars(): Observable<TargetProgressBarData[]> {
    return this.http.get<TargetProgressBarData[]>(
      '/assets/data/portfolio-goals-target-progress.json',
    );
  }
}
