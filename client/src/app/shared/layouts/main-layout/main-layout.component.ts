import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core'
import { ILink } from '../../interfaces/interfaces'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'
import { MaterialService } from '../../services/material.service'

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements AfterViewInit {
  @ViewChild('floatingBtn') floatingBthRef: ElementRef

  public links: ILink[] = [
    { url: '/overview', name: 'Обзор' },
    { url: '/analytics', name: 'Аналитика' },
    { url: '/history', name: 'История' },
    { url: '/order', name: 'Добавить заказ' },
    { url: '/categories', name: 'Ассортимент' },
  ]

  constructor(private authService: AuthService, private router: Router) {}

  ngAfterViewInit(): void {
    MaterialService.floatingBtnInit(this.floatingBthRef.nativeElement)
  }

  logout(event: Event): void {
    event.preventDefault()

    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
