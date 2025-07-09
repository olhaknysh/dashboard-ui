import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountInfo } from './account-info.service.interface';

@Injectable({ providedIn: 'root' })
export class AccountInfoService {
  private readonly http = inject(HttpClient);

  getAccountInfo(): Observable<AccountInfo> {
    return this.http.get<AccountInfo>('/assets/data/account-info.json');
  }
}
