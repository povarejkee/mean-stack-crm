import { Injectable } from '@angular/core'
import { IOrderListPosition, IPosition } from '../interfaces/interfaces'

@Injectable()
export class OrderService {
  public orderList: IOrderListPosition[] =
    JSON.parse(localStorage.getItem('orderList')) || []

  get orderPrice(): number {
    return this.orderList.reduce(
      (accumulator: number, item: IOrderListPosition) => {
        accumulator += Number(item.cost)
        return accumulator
      },
      0
    )
  }

  addPosition(position: IPosition): void {
    const transformedPosition: IOrderListPosition = {
      name: position.name,
      cost: `${Number(position.cost) * position.quantity}`,
      quantity: position.quantity,
      _id: position._id,
    }

    const duplicate: IOrderListPosition = this.orderList.find(
      (item: IOrderListPosition) => item._id === transformedPosition._id
    )

    if (duplicate) {
      duplicate.quantity += transformedPosition.quantity
      duplicate.cost = String(+duplicate.cost + +transformedPosition.cost)
    } else {
      this.orderList.push(transformedPosition)
    }

    localStorage.setItem('orderList', JSON.stringify(this.orderList))
  }

  removePosition(position: IOrderListPosition): void {
    const removedIndex: number = this.orderList.findIndex(
      (item: IOrderListPosition) => item._id === position._id
    )

    this.orderList.splice(removedIndex, 1)
    localStorage.setItem('orderList', JSON.stringify(this.orderList))
  }

  clearList() {
    this.orderList = []
    localStorage.setItem('orderList', JSON.stringify(this.orderList))
  }
}
