import { Component, OnInit } from '@angular/core'
import { CategoriesService } from '../shared/services/categories.service'
import { ICategory } from '../shared/interfaces/interfaces'

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.scss'],
})
export class CategoriesPageComponent implements OnInit {
  public categories: ICategory[] = []
  public isLoading: boolean = false

  constructor(private categoriesService: CategoriesService) {}

  ngOnInit(): void {
    this.isLoading = true

    this.categoriesService.getAll().subscribe((response: ICategory[]) => {
      this.categories = response
      this.isLoading = false
    })
  }
}
