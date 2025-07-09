import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import {
  AccountSpecificationInfo,
  AccountSpecificationNode,
} from './accounts.service.interface';

@Injectable({ providedIn: 'root' })
export class AccountSpecificationService {
  private readonly http = inject(HttpClient);

  getSpecificationTree(): Observable<AccountSpecificationNode[]> {
    return this.http.get<AccountSpecificationNode[]>(
      '/assets/data/account-specification.json',
    );
  }

  getSpecificationInfo(
    id: string,
  ): Observable<AccountSpecificationInfo | null> {
    return this.http
      .get<
        AccountSpecificationInfo[]
      >(`/assets/data/account-specification-info.json`)
      .pipe(
        map(
          (info: AccountSpecificationInfo[]) =>
            info.find((info) => info.id === id) ?? null,
        ),
      );
  }
}
