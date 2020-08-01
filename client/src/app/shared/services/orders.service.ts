import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IOrder } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>('/api/order', order)
  }
}
