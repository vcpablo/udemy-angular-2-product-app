import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ModalController } from 'ionic-angular';
import { CategoryModalPage } from '../../pages/category-modal/category-modal';
import { CategoryService } from '../../providers/category-service';

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  categories : Array<any>;

  constructor(public navCtrl: NavController,
      public navParams: NavParams,
      private categoryService: CategoryService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private modalCtrl: ModalController
    ) {
    this.findAll();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

  addCategory() {

    let modal = this.modalCtrl.create(CategoryModalPage);

    modal.onDidDismiss((category) => {


          if(undefined !== category) {
            this.categories.unshift(category)

            let toastOptions = {
              message:'Category added',
              duration: 2000,
              showCloseButton: true
            };
            this.toastCtrl.create(toastOptions).present();
          }

    });

    modal.present();
  }

  editCategory(category) {
    let modal = this.modalCtrl.create(CategoryModalPage, { category: category });

    modal.onDidDismiss((category) => {
        if(undefined !== category) {
          for(var i in this.categories) {
            if(this.categories[i].id == category.id) {
              this.categories[i] = category;

            }

            let toastOptions = {
              message:'Category updated',
              duration: 2000,
              showCloseButton: true
            };
            this.toastCtrl.create(toastOptions).present()
          }
          this.categories.unshift(category);
        }
    });

    modal.present();
  }



  findAll() {
    this.categoryService.findAll()
      .then((categories : Array<any>) => {
        this.categories = categories;
      }, (error) => {
        console.error('Error getting categories', error)
      })
  }

  removeCategory(category) {
    let options = {
      title: 'Remove category',
      subTitle:'Do you really want to remove the category \'' + category.nome + '\'?',
      buttons: [{
        text:'No',
      }, {
        text:'Yes',
        handler: (data) => {
            this.categoryService.delete(category.id)
            .then( (res) => {
              if(res) {
                let index = this.categories.indexOf(category);

                if(index !== -1) {
                  this.categories.splice(index,1);
                  let toastOptions = {
                    message:'Category was removed',
                    duration: 2000,
                    showCloseButton: true
                  };
                  this.toastCtrl.create(toastOptions).present();

                }


              }
            }, (error) => { console.error('Error removing category', error)} )
        }
      }]
    };

    this.alertCtrl.create(options).present();
  }

}
