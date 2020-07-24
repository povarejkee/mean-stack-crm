import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { switchMap } from 'rxjs/operators'
import { CategoriesService } from '../../shared/services/categories.service'
import { ICategory, IResponseMessage } from '../../shared/interfaces/interfaces'
import { Observable, of, Subscription } from 'rxjs'
import { MaterialService } from '../../shared/services/material.service'

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  @ViewChild('inputFile') inputFileRef: ElementRef

  public editMode: boolean = false
  public form: FormGroup
  public img: File
  public imgPreview: string | ArrayBuffer
  private categoryId: string

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
    })

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params.id) {
            this.editMode = true
            this.form.disable()

            return this.categoriesService.getSingle(params.id)
          }

          return of(null)
        })
      )
      .subscribe(
        (response: ICategory) => {
          if (response) {
            this.form.patchValue({ name: response.name })
            this.imgPreview = response.image
            this.categoryId = response._id
            MaterialService.updateInputValue()
            this.form.enable()
          }
        },
        (error: ErrorEvent) => MaterialService.toast(error.error.message)
      )
  }

  triggerInputFileClick(): void {
    this.inputFileRef.nativeElement.click()
  }

  onFileChange(event: any): void {
    const [file] = event.target.files
    const reader: FileReader = new FileReader()

    this.img = file

    reader.onload = () => {
      this.imgPreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit(): void {
    this.form.disable()
    let obs$: Observable<ICategory>

    if (this.editMode) {
      obs$ = this.categoriesService.update(
        this.categoryId,
        this.form.value.name,
        this.img
      )
    } else {
      obs$ = this.categoriesService.create(this.form.value.name, this.img)
    }

    obs$.subscribe(
      (response: ICategory) => {
        this.form.enable()
        this.categoryId = response._id
        MaterialService.toast('Изменения сохранены')
      },
      (error: ErrorEvent) => {
        this.form.enable()
        MaterialService.toast(error.error.message)
      }
    )
  }

  removeCategory(): void {
    const confirm = window.confirm(
      'Вы действительно хотите удалить эту категорию?'
    )

    if (confirm) {
      this.categoriesService.remove(this.categoryId).subscribe(
        (response: IResponseMessage) => {
          MaterialService.toast(response.message)
        },
        (error: ErrorEvent) => {
          MaterialService.toast(error.error.message)
        },
        () => this.router.navigate(['/categories'])
      )
    }
  }
}
