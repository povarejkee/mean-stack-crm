import { ElementRef } from '@angular/core'

declare const M

export class MaterialService {
  static toast(text: string): void {
    M.toast({ html: text })
  }

  static floatingBtnInit(element: ElementRef): void {
    M.FloatingActionButton.init(element)
  }
}
