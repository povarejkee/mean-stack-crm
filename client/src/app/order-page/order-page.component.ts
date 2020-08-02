import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { MaterialService } from '../shared/services/material.service'
import {
  IModalInstance,
  IOrder,
  IOrderListPosition,
} from '../shared/interfaces/interfaces'
import { OrderService } from '../shared/services/order.service'
import { NavigationEnd, Router, RouterEvent } from '@angular/router'
import { OrdersService } from '../shared/services/orders.service'

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
  providers: [OrderService],
})
export class OrderPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef

  private modalInstance: IModalInstance
  public rootMode: boolean
  public pending: boolean

  constructor(
    private router: Router,
    public orderService: OrderService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.rootMode = this.router.url === '/order'
    this.router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        /** оптимизируем, чтобы на каждом событии роута
         * не смотреть на event.url и не переопределять this.rootMode кучу раз.
         * Вместо этого будем смотреть только в самое последнее событие */
        this.rootMode = event.url === '/order'
      }
    })
  }

  ngAfterViewInit(): void {
    this.modalInstance = MaterialService.modalInit(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modalInstance.destroy()
  }

  openModal(): void {
    this.modalInstance.open()
  }

  closeModal(): void {
    this.modalInstance.close()
  }

  removePosition(position: IOrderListPosition): void {
    this.orderService.removePosition(position)
    MaterialService.toast(`Позиция "${position.name}" удалена`)
  }

  createOrder(): void {
    this.pending = true

    const order: IOrder = {
      list: this.orderService.orderList.map((item: IOrderListPosition) => {
        delete item._id // не нужно отправлять id на сервер
        return item
      }),
    }

    this.ordersService.createOrder(order).subscribe(
      (response: IOrder) => {
        MaterialService.toast(`Заказ №${response.order} был добавлен`)
        this.orderService.clearList()
      },
      (error: ErrorEvent) => MaterialService.toast(error.error.message),
      () => {
        this.pending = false
        this.closeModal()
      }
    )
  }
}
