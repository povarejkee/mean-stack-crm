import { ElementRef } from '@angular/core'
import { IModalInstance } from '../interfaces/interfaces'

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
}
