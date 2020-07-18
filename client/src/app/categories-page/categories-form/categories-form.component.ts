import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { switchMap } from 'rxjs/operators'
import { CategoriesService } from '../../shared/services/categories.service'
import { ICategory } from '../../shared/interfaces/interfaces'
import { of } from 'rxjs'
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

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute
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
            this.imgPreview = response.imageSrc
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

  onFileChange(event: Event): void {
    const [file] = event.target.files
    const reader: FileReader = new FileReader()

    this.img = file

    reader.onload = () => {
      this.imgPreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit(): void {}
}
