import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Tariff } from './tariff.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  private mockDataUrl = '../assets/mock-data.json';

  constructor(private http: HttpClient) {}

  getMockData(): Observable<Tariff[]> {
    return this.http.get<Tariff[]>(this.mockDataUrl);
  }
}
