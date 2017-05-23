import { Component, OnInit } from '@angular/core';
import { productService } from "../app.productService";
import {Router} from '@angular/router';
/*import {Popup} from "ng2-opd-popup";*/
/*import {Popup} from 'ng2-opd-popup';*/


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent implements OnInit {
  /*@ViewChild('Popupref') Popupref: Popup;*/
  categoriesToSearchComponent = ['Apple','Lenovo','Watches','Samsung','Iphone_5','Iphone_5s','Iphone_headset','Lenovo_J20','Lenovo_Z50','Lenovo_Z52','Ipad_Tablet','Rolex-diamond-daytona-golden','Rolex-diamond-daytone-Black','Rolex-Watch','Rolex-watch','Samsung_SL1500','samsung-galaxy-on-nxt-sm-g610','Samsung_SL15'];
  forSelectedCategoryProdutsArray:Array<any> = [];  ArrayContainsCLickedProductsWithoutDuplicates: Array<any> = [];
  public router: Router;
  public totJsonData:any=[];
  public FinalAmount: number = 0;
  public temp1:Array<any> = [];
  public temp2:Array<any> = [];
  // Intializing the service and Router, and Reading the total Products List from the JSON file.
  constructor(public _productService:productService,public route: Router) {
    this.router = route;
    this.categoriesToSearchComponent = this.categoriesToSearchComponent.sort();
    // this.showSample();
  }

  ngOnInit() {
    this._productService.getProductsJsonData()
      .subscribe(totJsonData => this.totJsonData = totJsonData,
        error => alert(error),
        ()=>this.temp1.push(this.totJsonData)
      );
    /*this.funcall();*/
  }
  /*funcall(){
    this.temp2 = this.temp1[0];
    console.log(this.temp2);
    console.log(this.temp2['0'].length);
    console.log(this.temp2['0']);
  }*/
  // Get the Selected Product from the Auto-Complete Search Bar

  gettingTheSelectedTypeFromSearch(selectedCategory){
    console.log(this.totJsonData);
    this.forSelectedCategoryProdutsArray = [];
    for(let eachProductRecord of this.totJsonData){
      if(eachProductRecord.category === selectedCategory || eachProductRecord.id === selectedCategory){
        this.forSelectedCategoryProdutsArray.push(eachProductRecord);
      }
    }
  }

  // For the Selected Product, Getting those total Items into an Array without duplicates

  getTheClickedProduct(selectedProduct){
    let flag = 0;
    if(this.ArrayContainsCLickedProductsWithoutDuplicates.length === 0){
      alert('Product added to Cart');
      this.FinalAmount = this.FinalAmount + selectedProduct.price;
      this.ArrayContainsCLickedProductsWithoutDuplicates.push(selectedProduct);
    }
    else{
      if(this._productService.getTheTotalProductsData().length > 0){
        this.ArrayContainsCLickedProductsWithoutDuplicates = this._productService.getTheTotalProductsData();
      }
      for(let eachProd of this.ArrayContainsCLickedProductsWithoutDuplicates){
        if(eachProd.id === selectedProduct.id){
          flag =1;
          alert('Product is already added to cart, Please increase the qunatity');
        }
      }
      if(flag === 0){
        alert('Product added to Cart');
        this.ArrayContainsCLickedProductsWithoutDuplicates.push(selectedProduct);
        this.FinalAmount =0;
        for(let eachProd of this.ArrayContainsCLickedProductsWithoutDuplicates){
            this.FinalAmount = this.FinalAmount + (eachProd.quantity * eachProd.price);

        }
      }
    }
    this._productService.setTheTotalProductsData(this.ArrayContainsCLickedProductsWithoutDuplicates,this.FinalAmount);
  }

  // Page Navigation to Billing Component

  goToBillingComponent(){
    this.router.navigate(['bill']);
  }

/*
  forpopup(){
    if(this.tempcounter === 0){
      this.showSample();
      this.tempcounter = 1;
    }

  }
  showSample(){

    this.popup.options = {
      cancleBtnClass: "btn btn-default",
      confirmBtnClass: "btn btn-default",
      color: "#4180ab",
      header: "Register the User Name Here"}
      this.popup.show();
  }*/
}
