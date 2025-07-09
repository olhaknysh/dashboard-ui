import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AccountInfo, Message, Policy } from './account-info.service.interface';

@Injectable({ providedIn: 'root' })
export class AccountInfoService {
  private readonly http = inject(HttpClient);

  getAccountInfo(): Observable<AccountInfo> {
    return this.http.get<AccountInfo>('/assets/data/account-info.json');
  }

  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>('/assets/data/messages.json');
  }

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>('/assets/data/policies.json');
  }
}
