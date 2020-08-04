import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core'
import { AnalyticsService } from '../shared/services/analytics.service'
import { IAnalytics } from '../shared/interfaces/interfaces'
import { Subscription } from 'rxjs'
import { Chart } from 'chart.js'

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss'],
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gain') gainRef: ElementRef
  @ViewChild('orders') ordersRef: ElementRef

  public average: number
  public pending: boolean = true
  private analyticsSub: Subscription

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit(): void {
    const gainChartCfg: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)',
    }

    const ordersChartCfg: any = {
      label: 'Заказы',
      color: 'rgb(255, 99, 132)',
    }

    this.analyticsSub = this.analyticsService
      .getAnalytics()
      .subscribe((response: IAnalytics) => {
        this.average = response.average

        gainChartCfg.labels = response.chart.map((item) => item.label) // todo убрать повторение, сделать функцию
        gainChartCfg.data = response.chart.map((item) => item.gain)
        const gainCanvas = this.gainRef.nativeElement.getContext('2d')
        gainCanvas.canvas.height = '275px'
        new Chart(gainCanvas, createChartCfg(gainChartCfg))

        ordersChartCfg.labels = response.chart.map((item) => item.label)
        ordersChartCfg.data = response.chart.map((item) => item.order)
        const ordersCanvas = this.ordersRef.nativeElement.getContext('2d')
        ordersCanvas.canvas.height = '275px'
        new Chart(ordersCanvas, createChartCfg(ordersChartCfg))

        this.pending = false
      })
  }

  ngOnDestroy(): void {
    if (this.analyticsSub) this.analyticsSub.unsubscribe()
  }
}

function createChartCfg(cfg: any): any {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels: cfg.labels,
      datasets: [
        {
          label: cfg.label,
          data: cfg.data,
          borderColor: cfg.color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
  }
}
