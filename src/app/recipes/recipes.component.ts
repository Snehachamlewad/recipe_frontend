import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../login.model';
import { RestService } from '../rest.service';
import { Veg } from '../veg.model';
import { ProductService } from '../product.service';
import { Nonveg } from '../nonveg.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit{

  profileGroup =  new FormGroup ({
    //id: new FormControl(),
    firstName : new FormControl(),
    lastName :  new FormControl(),
    mobile_No : new FormControl(),
     email : new FormControl(),
     password : new FormControl(),
     city : new FormControl(),
     age : new FormControl(),
  });

  constructor(@Inject(RestService) private srvc:any, private route: ActivatedRoute,
  private common:RestService, @Inject(HttpClient) private client:any ,private router:Router, @Inject(Router) private rt:any,@Inject(ProductService) private srvc1:any,@Inject(ProductService) private srvc2:any) { }
  recipes: Array<Veg> = new Array<Veg>();
  nonvegrecipe:Array<Nonveg>=new Array<Nonveg>;



  ngOnInit(): void {
    this.srvc1.getProducts().subscribe((res: Veg[]) => {this.recipes = res;
      this.recipes.forEach((a :any) =>{
        Object.assign(a,{quantity:1});
      });
    })

    this.srvc2.getProducts1().subscribe((res: Nonveg[]) => {this.nonvegrecipe = res;
      this.nonvegrecipe.forEach((a :any) =>{
        Object.assign(a,{quantity:1});
      });
    })

  }

  viewUser():void{
    this.rt.navigateByUrl("profile");
  }

  viewVeg():void{
    this.rt.navigateByUrl("veg");
  }

  viewNonVeg():void{
    this.rt.navigateByUrl("nonveg");
  }

  // selectedFile: File | null = null;
  // fileName : any;

  // onFileSelected(event: Event): void {

  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files.length > 0)
  //   {
  //     this.selectedFile = inputElement.files[0];

  //     //const fileName = this.selectedFile.name;
  //     const fullPath = this.selectedFile.name;
  //     const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
  //     this.fileName = fullPath.substring(startIndex);
  //     console.log(this.fileName);

  //   }
  // }
  // resumeName=this.onFileSelected;

}


