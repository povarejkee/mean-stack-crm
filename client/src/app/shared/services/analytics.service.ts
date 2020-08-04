import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IAnalytics, IAnalyticsOverview } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  constructor(private http: HttpClient) {}

  getOverviewData(): Observable<IAnalyticsOverview> {
    return this.http.get<IAnalyticsOverview>('/api/analytics/overview')
  }

  getAnalytics(): Observable<IAnalytics> {
    return this.http.get<IAnalytics>('/api/analytics/analytics')
  }
}
