import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/product/product';
import { CategoryService } from '../providers/category-service';
import { ProductService } from '../providers/product-service';
import { CategoryModalPage } from '../pages/category-modal/category-modal';
import { ProductModalPage } from '../pages/product-modal/product-modal';


@Component({
  templateUrl: 'app.html',
  providers:[CategoryService, ProductService]
})
export class MyApp {
  rootPage = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
