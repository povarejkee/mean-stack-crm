import { ElementRef } from '@angular/core'
import { IModalInstance, IPickerInstance } from '../interfaces/interfaces'

declare const M

export class MaterialService {
  static toast(text: string): void {
    M.toast({ html: text })
  }

  static floatingBtnInit(element: ElementRef): void {
    M.FloatingActionButton.init(element.nativeElement)
  }

  static updateInputValue(): void {
    M.updateTextFields()
  }

  static modalInit(element: ElementRef): IModalInstance {
    return M.Modal.init(element.nativeElement)
  }

  static tooltipInit(element: ElementRef): IModalInstance {
    return M.Tooltip.init(element.nativeElement, { position: 'left' })
  }

  static datepickerInit(
    element: ElementRef,
    onClose: () => void
  ): IPickerInstance {
    return M.Datepicker.init(element.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
    })
  }
}
