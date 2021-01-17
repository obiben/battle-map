import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Monster } from '@bm/data/models';
import { Observable } from 'rxjs';

import { DND_BASE_URL } from '../tokens';

Injectable()
export class Monsters {
  constructor(
    private http: HttpClient,
    @Inject(DND_BASE_URL) private baseUrl: string
  ) { }

  get(): Observable<Monster[]> {
    return this.http.get<Monster[]>(this.baseUrl + 'assets/monsters.json');
  }

  resolveImage(url: string): string {
    return this.baseUrl + 'assets/images/tokens/' + url;
  }
}
