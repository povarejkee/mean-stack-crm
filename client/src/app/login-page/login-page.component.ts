import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../shared/services/auth.service'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ErrorObserver, Subscription } from 'rxjs'
import { MaterialService } from '../shared/services/material.service'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  public form: FormGroup
  private loginSub: Subscription

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })

    this.route.queryParams.subscribe((qp: Params) => {
      if (qp.registered) {
        MaterialService.toast('Теперь можно войти в систему под логопасом')
      } else if (qp.loginFirst) {
        MaterialService.toast(
          'Для просмотра этой страницы необходимо авторизоваться'
        )
      } else if (qp.sessionIsOver) {
        MaterialService.toast('Сессия истекла. Повторите вход')
      }
    })
  }

  onSubmit(): void {
    this.form.disable() // можно использовать вместо флага (см. в register-page)

    this.loginSub = this.authService.login(this.form.value).subscribe(
      () => {
        this.form.enable()
        this.form.reset()
        this.router.navigate(['/overview'])
      },
      (error: ErrorEvent) => {
        this.form.enable()
        MaterialService.toast(error.error.message)
      }
    )
  }

  ngOnDestroy(): void {
    if (this.loginSub) this.loginSub.unsubscribe()
  }
}
