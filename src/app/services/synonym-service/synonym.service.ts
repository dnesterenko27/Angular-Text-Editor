import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, debounceTime, distinctUntilChanged, take, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

const SYNONYMS_API_URL = 'https://api.datamuse.com';

@Injectable({
  providedIn: 'root',
})
export class SynonymService {

  synonyms$ = new Subject();

  constructor(private http: HttpClient) {
  }

  retrieveSynonyms(query: string): Observable<any> {
    if (!query) {
      return;
    }
    query = query.replace('.', '');
    const max = 3;
    return this.http.get(`${SYNONYMS_API_URL}/words`,
      {params: {ml: query, max: max.toString()}})
      .pipe(
        debounceTime(500),
        tap(data => this.synonyms$.next(data)),
        take(1),
        distinctUntilChanged(),
        catchError(e => of(e)),
      );
  }

  getSynonyms() {
    return this.synonyms$.asObservable();
  }
}
