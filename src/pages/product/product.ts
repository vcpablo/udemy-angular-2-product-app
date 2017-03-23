import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { ProductModalPage } from '../../pages/product-modal/product-modal';
import { ProductService } from '../../providers/product-service';

/*
  Generated class for the Product page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product',
  templateUrl: 'product.html'
})
export class ProductPage {

  products : Array<any>;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private productService: ProductService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private modalCtrl: ModalController
    ) {
    this.findAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }

  addProduct() {

    let modal = this.modalCtrl.create(ProductModalPage);

    modal.onDidDismiss((product) => {


          if(product) {
            this.products.unshift(product)

            let toastOptions = {
              message:'Product added',
              duration: 2000,
              showCloseButton: true
            };
            this.toastCtrl.create(toastOptions).present();
          }

    });

    modal.present();
  }

  editProduct(product) {
    let modal = this.modalCtrl.create(ProductModalPage, { product: product });

    modal.onDidDismiss((product) => {
        if(undefined !== product) {
          for(var i in this.products) {
            if(this.products[i].id == product.id) {
              this.products[i] = product;

            }

            let toastOptions = {
              message:'Product updated',
              duration: 2000,
              showCloseButton: true
            };
            this.toastCtrl.create(toastOptions).present()
          }
          this.products.unshift(product);
        }
    });

    modal.present();
  }



  findAll() {
    this.productService.findAll()
      .then((products : Array<any>) => {
        this.products = products;
      }, (error) => {
        console.error('Error getting products', error)
      })
  }

  removeProduct(product) {
    let options = {
      title: 'Remove product',
      subTitle:'Do you really want to remove the product \'' + product.nome + '\'?',
      buttons: [{
        text:'No',
      }, {
        text:'Yes',
        handler: (data) => {
            this.productService.delete(product.id)
            .then( (res) => {
              if(res) {
                let index = this.products.indexOf(product);

                if(index !== -1) {
                  this.products.splice(index,1);
                  let toastOptions = {
                    message:'Product was removed',
                    duration: 2000,
                    showCloseButton: true
                  };
                  this.toastCtrl.create(toastOptions).present();

                }


              }
            }, (error) => { console.error('Error removing product', error)} )
        }
      }]
    };

    this.alertCtrl.create(options).present();
  }

}
