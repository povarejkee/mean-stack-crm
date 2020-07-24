import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ICategory, IResponseMessage } from '../interfaces/interfaces'

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>('/api/category')
  }

  getSingle(id): Observable<ICategory> {
    return this.http.get<ICategory>(`/api/category/${id}`)
  }

  create(name: string, image?: File): Observable<ICategory> {
    const data: FormData = new FormData()

    if (image) data.append('image', image, image.name)
    data.append('name', name)

    return this.http.post<ICategory>('/api/category', data)
  }

  update(id: string, name: string, image?: File): Observable<ICategory> {
    const data: FormData = new FormData()

    if (image) data.append('image', image, image.name)
    data.append('name', name)

    return this.http.patch<ICategory>(`/api/category/${id}`, data)
  }

  remove(id: string): Observable<IResponseMessage> {
    return this.http.delete<IResponseMessage>(`/api/category/${id}`)
  }
}
