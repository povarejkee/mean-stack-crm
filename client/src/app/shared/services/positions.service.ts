import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { IPosition, IResponseMessage } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root',
})
export class PositionsService {
  constructor(private http: HttpClient) {}

  getAll(categoryId: string): Observable<IPosition[]> {
    return this.http.get<IPosition[]>(`/api/position/${categoryId}`)
  }

  create(newPosition: IPosition): Observable<IPosition> {
    return this.http.post<IPosition>('/api/position', newPosition)
  }

  update(id: string, newPosition: IPosition): Observable<IPosition> {
    return this.http.patch<IPosition>(`/api/position/${id}`, newPosition)
  }

  remove(id: string): Observable<IResponseMessage> {
    return this.http.delete<IResponseMessage>(`/api/position/${id}`)
  }
}
