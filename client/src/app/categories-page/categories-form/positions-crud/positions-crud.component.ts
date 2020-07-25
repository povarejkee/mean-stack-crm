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
  IPosition,
  IResponseMessage,
} from '../../../shared/interfaces/interfaces'
import { PositionsService } from '../../../shared/services/positions.service'
import { MaterialService } from '../../../shared/services/material.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-positions-crud',
  templateUrl: './positions-crud.component.html',
  styleUrls: ['./positions-crud.component.scss'],
})
export class PositionsCrudComponent
  implements OnInit, AfterViewInit, OnDestroy {
  @Input('categoryId') categoryId: string
  @ViewChild('modal') modalRef: ElementRef

  public positions: IPosition[] = []
  public isLoading: boolean = false
  public form: FormGroup
  public editMode: boolean = false
  private modalInstance: IModalInstance
  private activeId: string

  constructor(private positionsService: PositionsService) {}

  ngOnInit(): void {
    this.isLoading = true

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(1, [Validators.required, Validators.min(1)]),
    })

    this.positionsService
      .getAll(this.categoryId)
      .subscribe((response: IPosition[]) => {
        this.positions = response
        this.isLoading = false
      })
  }

  ngAfterViewInit(): void {
    this.modalInstance = MaterialService.modalInit(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modalInstance.destroy()
  }

  addPositionModal(): void {
    this.editMode = false
    this.modalInstance.open()
    MaterialService.updateInputValue()
  }

  editPositionModal(position: IPosition): void {
    this.editMode = true
    this.modalInstance.open()
    this.activeId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
    })

    MaterialService.updateInputValue()
  }

  closeModal(): void {
    this.modalInstance.close()
    this.form.reset({ name: null, cost: 1 })
    this.form.enable()
  }

  onSubmit(): void {
    this.form.disable()

    const newPosition: IPosition = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    }

    if (this.editMode) {
      this.positionsService.update(this.activeId, newPosition).subscribe(
        (response: IPosition) => {
          const updatedIndex = this.positions.findIndex(
            (item: IPosition) => this.activeId === item._id
          )

          this.positions[updatedIndex] = response
          MaterialService.toast('Изменения сохранены')
        },
        (error: ErrorEvent) => MaterialService.toast(error.error.message),
        () => this.closeModal()
      )
    } else {
      this.positionsService.create(newPosition).subscribe(
        (response: IPosition) => {
          this.positions.push(response)
          MaterialService.toast('Позиция добавлена')
        },
        (error: ErrorEvent) => MaterialService.toast(error.error.message),
        () => this.closeModal()
      )
    }
  }

  removePosition(event: Event, id: string): void {
    event.stopPropagation()

    const confirm = window.confirm(
      'Вы действительно хотите удалить эту позицию?'
    )

    if (confirm) {
      this.positionsService.remove(id).subscribe(
        (response: IResponseMessage) => {
          const removedIndex = this.positions.findIndex(
            (item: IPosition) => id === item._id
          )

          this.positions.splice(removedIndex, 1)
          MaterialService.toast(response.message)
        },
        (error: ErrorEvent) => {
          MaterialService.toast(error.error.message)
        }
      )
    }
  }
}
