declare const M

export class MaterialService {
  static toast(text) {
    M.toast({ html: text })
  }
}
