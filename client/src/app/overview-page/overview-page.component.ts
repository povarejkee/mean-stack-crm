import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { AnalyticsService } from '../shared/services/analytics.service'
import { Observable } from 'rxjs'
import {
  IAnalyticsOverview,
  IModalInstance,
} from '../shared/interfaces/interfaces'
import { MaterialService } from '../shared/services/material.service'

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('tapTarget') tapTargetRef: ElementRef

  public data$: Observable<IAnalyticsOverview>
  public tapTargetInstance: IModalInstance
  public yesterday: number = new Date().setDate(new Date().getDate() - 1)

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.data$ = this.analyticsService.getOverviewData()
  }

  ngAfterViewInit(): void {
    this.tapTargetInstance = MaterialService.tapTargetInit(this.tapTargetRef)
  }

  ngOnDestroy(): void {
    this.tapTargetInstance.destroy()
  }
}
