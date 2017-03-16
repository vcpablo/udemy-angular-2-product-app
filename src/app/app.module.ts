import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CategoryPage } from '../pages/category/category';
import { ProductPage } from '../pages/product/product';
import { CategoryModalPage } from '../pages/category-modal/category-modal';
import { CategoryService } from '../providers/category-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CategoryPage,
    ProductPage,
    CategoryModalPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CategoryPage,
    ProductPage,
    CategoryModalPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
