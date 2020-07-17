import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Subscription } from 'rxjs'
import { AuthService } from '../shared/services/auth.service'
import { Router } from '@angular/router'
import { MaterialService } from '../shared/services/material.service'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  public form: FormGroup
  public isSubmitting: boolean = false
  private registerSub: Subscription

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  onSubmit(): void {
    this.isSubmitting = true

    this.registerSub = this.authService.register(this.form.value).subscribe(
      () => {
        this.isSubmitting = false
        this.form.reset()
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
          },
        })
      },
      (error: ErrorEvent) => {
        this.isSubmitting = false
        MaterialService.toast(error.error.message)
      }
    )
  }

  ngOnDestroy(): void {
    if (this.registerSub) this.registerSub.unsubscribe()
  }
}
