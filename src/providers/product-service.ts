import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PrductService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductService {

  baseUri : string;

  constructor(public http: Http) {
    this.baseUri = 'https://product-api-vcpablo.c9users.io/api/product';
  }

  create(product) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.post(this.baseUri, JSON.stringify(product), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  update(product) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUri, JSON.stringify(product), { headers: headers })
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  find(id) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri + '/' + id)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseUri)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

  delete (id) {
    return new Promise((resolve, reject) => {
      this.http.delete(this.baseUri + '/' + id)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      }, error => {
        reject(error)
      })
    });
  }

}
