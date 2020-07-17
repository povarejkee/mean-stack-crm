import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IToken, IUser } from '../interfaces/interfaces'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // private token: string = localStorage.getItem('token') // таким образом гвард не работает!

  get token(): string | null {
    const token: string = localStorage.getItem('token')
    return token ? token : null // todo почему гвард работает только в том случае, если токен записан как getter?
  }

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('/api/auth/registry', user)
  }

  login(user: IUser): Observable<IToken> {
    return this.http
      .post<IToken>('/api/auth/login', user)
      .pipe(tap(this.setToken))
  }

  setToken(response: IToken): void {
    localStorage.setItem('token', response.token)
  }

  logout(): void {
    //this.token = null
    localStorage.removeItem('token')
  }

  isAuth(): boolean {
    return Boolean(this.token)
  }
}
