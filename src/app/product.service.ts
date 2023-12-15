import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _productUrl = "https://localhost:7137/api/Veg_Recipes";
  private _productUrl1 = "https://localhost:7137/api/NonVeg_Recipes";
  constructor(private http: HttpClient,private _router:Router) { }


  getProducts() {
    return this.http.get<any>(this._productUrl);

  }

  getProducts1() {
    return this.http.get<any>(this._productUrl1);

  }


}
