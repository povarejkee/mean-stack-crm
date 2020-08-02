import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component'
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { TokenInterceptor } from './shared/services/token.interceptor';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { AnalyticsPageComponent } from './analytics-page/analytics-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { CategoriesPageComponent } from './categories-page/categories-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CategoriesFormComponent } from './categories-page/categories-form/categories-form.component';
import { PositionsCrudComponent } from './categories-page/categories-form/positions-crud/positions-crud.component';
import { OrderCategoriesComponent } from './order-page/order-categories/order-categories.component';
import { OrderPositionsComponent } from './order-page/order-positions/order-positions.component';
import { HistoryTableComponent } from './history-page/history-table/history-table.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    LoaderComponent,
    CategoriesFormComponent,
    PositionsCrudComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent,
    HistoryTableComponent,
    HistoryFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
