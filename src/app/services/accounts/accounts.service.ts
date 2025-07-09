import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Account } from './accounts.service.interface';

@Injectable({ providedIn: 'root' })
export class AccountsService {
  private readonly http = inject(HttpClient);

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>('/assets/data/accounts.json');
  }

  getAccountById(id: number): Observable<Account | null> {
    return this.getAccounts().pipe(
      map((accounts) => accounts.find((acc) => acc.id === id) ?? null),
    );
  }
}
