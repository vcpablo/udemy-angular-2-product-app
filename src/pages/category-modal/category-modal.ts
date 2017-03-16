import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CategoryService } from '../../providers/category-service';

/*
  Generated class for the CategoryModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category-modal',
  templateUrl: 'category-modal.html',
  providers:[CategoryService]
})
export class CategoryModalPage {
  category: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private categoryService: CategoryService) {
      this.category = navParams.get('category') || { nome: '', id: null };
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryModalPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  saveCategory() {

    if(this.category.id) {
      this.categoryService.update(this.category)
      .then( (data) => {

        this.viewCtrl.dismiss(data);
      }, (error) => { console.error('Error updating category', error ) });
    } else {
        this.categoryService.create(this.category)
        .then( (data) => {

          this.viewCtrl.dismiss(data);
        }, (error) => { console.error('Error saving category', error ) });

    }

  }

}
