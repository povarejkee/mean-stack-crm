import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  IModalInstance,
  IOrder,
  IOrderListPosition,
} from '../../shared/interfaces/interfaces'
import { MaterialService } from '../../shared/services/material.service'

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('ordersList') ordersList: IOrder[]
  @ViewChild('modal') modalRef: ElementRef

  public modalInstance: IModalInstance
  public selectedOrder: IOrder

  constructor() {}

  selectOrder(order: IOrder): void {
    this.selectedOrder = order
    this.modalInstance.open()
  }

  computeOrderPrice(order: IOrder): number {
    return order.list.reduce(
      (accumulator: number, item: IOrderListPosition) => {
        accumulator += Number(item.cost)
        return accumulator
      },
      0
    )
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.modalInstance = MaterialService.modalInit(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modalInstance.destroy()
  }
}
