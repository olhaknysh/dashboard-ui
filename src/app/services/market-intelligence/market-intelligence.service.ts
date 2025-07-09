import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { MarketIntelligencePoint } from './market-intelligence.interface';

@Injectable({ providedIn: 'root' })
export class MarketIntelligenceService {
  private readonly http = inject(HttpClient);

  getMarketIntelligencePoints(): Observable<MarketIntelligencePoint[]> {
    return this.http.get<MarketIntelligencePoint[]>(
      '/assets/data/market-intelligence-points.json',
    );
  }
}
