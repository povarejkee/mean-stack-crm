import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  IHistoryFilter,
  IModalInstance,
  IOrder,
} from '../shared/interfaces/interfaces'
import { MaterialService } from '../shared/services/material.service'
import { OrdersService } from '../shared/services/orders.service'
import { Subscription } from 'rxjs'

const STEP: number = 5

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss'],
})
export class HistoryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tooltip') tooltipRef: ElementRef

  public isFilterVisible: boolean = false
  public isLoadMoreBtnVisible: boolean = true
  public ordersList: IOrder[] = []
  public isLoading: boolean
  public loadMoreLoading: boolean

  private tooltipInstance: IModalInstance
  private ordersSubscription: Subscription
  private getParams: any = {
    offset: 0,
    limit: STEP,
  }
  private filters: any = {}

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.isLoading = true
    this.getOrders()
  }

  getOrders(): void {
    const params: any = {
      ...this.getParams,
      ...this.filters,
    }

    this.ordersSubscription = this.ordersService
      .getAll(params)
      .subscribe((response: IOrder[]) => {
        this.ordersList = this.ordersList.concat(response)

        if (response.length < this.getParams.limit) {
          this.isLoadMoreBtnVisible = false
        }

        this.isLoading = false
        this.loadMoreLoading = false
      })
  }

  loadMore(): void {
    this.getParams.offset += STEP
    this.loadMoreLoading = true
    this.getOrders()
  }

  ngAfterViewInit(): void {
    this.tooltipInstance = MaterialService.tooltipInit(this.tooltipRef)
  }

  ngOnDestroy(): void {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe()
    }

    this.tooltipInstance.destroy()
  }

  toggleFilter(): void {
    this.isFilterVisible = !this.isFilterVisible
  }

  submitFilters(filters: IHistoryFilter): void {
    this.isLoading = true
    this.ordersList = []
    this.filters = filters
    this.getParams.offset = 0
    this.getOrders()
  }
}
