import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { ProductService } from '../../providers/product-service';
import { CategoryService } from '../../providers/category-service';

/*
  Generated class for the ProductModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-modal',
  templateUrl: 'product-modal.html',
  providers:[ProductService, CategoryService]
})
export class ProductModalPage {
  product: any;
  categories: Array<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private productService: ProductService,
    private categoryService: CategoryService) {
      this.product = navParams.get('product') || { nome: '', id: null };

      this.categoryService.findAll()
        .then( (categories:Array<any>) => {
          this.categories = categories;
        }, ( error ) => {
          this.categories = [];
          console.error('Error getting categories', error )
        } )
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductModalPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  saveProduct() {

    if(this.product.id) {
      this.productService.update(this.product)
      .then( (data) => {

        this.viewCtrl.dismiss(data);
      }, (error) => { console.error('Error updating product', error ) });
    } else {
        this.productService.create(this.product)
        .then( (data) => {

          this.viewCtrl.dismiss(data);
        }, (error) => { console.error('Error saving product', error ) });

    }

  }

}
