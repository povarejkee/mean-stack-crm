import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { PositionsService } from '../../shared/services/positions.service'
import { Observable } from 'rxjs'
import {
  IOrderListPosition,
  IPosition,
} from '../../shared/interfaces/interfaces'
import { map, switchMap } from 'rxjs/operators'
import { OrderService } from '../../shared/services/order.service'
import { MaterialService } from '../../shared/services/material.service'

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.scss'],
})
export class OrderPositionsComponent implements OnInit {
  public positions$: Observable<IPosition[]>

  constructor(
    private route: ActivatedRoute,
    private positionsService: PositionsService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.positions$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.positionsService.getAll(params.id)
      }),
      map((positions: IPosition[]) => {
        return positions.map((position: IPosition) => {
          position.quantity = 1
          return position
        })
      })
    )
  }

  addToOrder(position: IPosition) {
    this.orderService.addPosition(position)
    MaterialService.toast(`Добавлено x${position.quantity}`)
  }
}
