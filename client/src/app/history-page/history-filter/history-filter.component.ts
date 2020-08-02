import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core'
import { MaterialService } from '../../shared/services/material.service'
import {
  IHistoryFilter,
  IPickerInstance,
} from '../../shared/interfaces/interfaces'

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss'],
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('start') startRef: ElementRef
  @ViewChild('end') endRef: ElementRef
  @Output() filterEmitter: EventEmitter<IHistoryFilter> = new EventEmitter<
    IHistoryFilter
  >()

  public orderNumber: number
  public invalidDates: boolean

  private pickerStart: IPickerInstance
  private pickerEnd: IPickerInstance

  constructor() {}

  ngAfterViewInit(): void {
    this.pickerStart = MaterialService.datepickerInit(
      this.startRef,
      this.validateDates
    )
    this.pickerEnd = MaterialService.datepickerInit(
      this.endRef,
      this.validateDates
    )
  }

  ngOnDestroy(): void {
    this.pickerStart.destroy()
    this.pickerEnd.destroy()
  }

  validateDates = (): void => {
    this.invalidDates = this.pickerStart.date > this.pickerEnd.date
  }

  applyFilter(): void {
    const filters: IHistoryFilter = {}

    if (this.orderNumber || this.orderNumber === 0) {
      filters.order = this.orderNumber
    }

    if (this.pickerStart.date) {
      filters.start = this.pickerStart.date
    }

    if (this.pickerEnd.date) {
      filters.end = this.pickerEnd.date
    }

    this.filterEmitter.emit(filters)
  }
}
