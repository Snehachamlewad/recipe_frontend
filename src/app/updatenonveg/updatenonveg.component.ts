import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-updatenonveg',
  templateUrl: './updatenonveg.component.html',
  styleUrls: ['./updatenonveg.component.css']
})
export class UpdatenonvegComponent implements OnInit {

  // vegGroup = new FormGroup({

  //   recipe_Id: new FormControl(),
  //   recipe_Name : new FormControl(),
  //   ingredient :  new FormControl(),
  //   procedure :  new FormControl(),

  // });
  recipeGroup = new FormGroup({
    //id: string
    recipe_Id: new FormControl("",Validators.required),
    ingredient :  new FormControl("",Validators.required),
    recipe_Name:new FormControl("",Validators.required),
    procedure :  new FormControl("",Validators.required),
    recipeimages:new FormControl("",Validators.required),
  });

  selectedFile: File | null = null;
  fileName : any;

  onFileSelected(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0)
    {
      this.selectedFile = inputElement.files[0];

      //const fileName = this.selectedFile.name;
      const fullPath = this.selectedFile.name;
      const startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
      this.fileName = fullPath.substring(startIndex);
      console.log(this.fileName);

    }
  }
  recipeimagesName=this.onFileSelected;

  constructor(@Inject(RestService) private srvc:any, private route: ActivatedRoute,
  private common:RestService, @Inject(HttpClient) private client:any ,private router:Router, @Inject(Router) private rt:any) { }

  Data:any;

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
       this.Data = JSON.parse(params['data']);
      console.log(this.Data);
      console.log(this.Data.id);

    });
  }

  // updateNonVeg():void
  // {
  //   var id = this.recipeGroup.get('id')?.value;
  //   this.client.put("https://localhost:7137/api/NonVeg_Recipes", this.recipeGroup.value).subscribe(
  //   (res:any)=>{
  //     alert("Recipe Successfully updated !");
  //     this.recipeGroup.reset();
  //     this.rt.navigateByUrl("nonveg");
  //   },
  //   (err:any)=>{
  //     window.alert(JSON.stringify(err));
  //   }
  //   );
  // }
  updateNonVeg():void {


    {
      const recipeData = {
        recipe_Name:this. recipeGroup.value. recipe_Name,
        ingredient:this. recipeGroup.value. ingredient,
        procedure:this. recipeGroup.value. procedure,

        recipeimages:this.fileName


      };
      //   console.log('Form Values:', this.recipeGroup.value);
      //    this.srvc.postVegRecipe(this.recipeGroup.value).subscribe(

      //     (res:any)=>{
      //         alert('Recipe Successfully Added!')
      //         this.recipeGroup.reset();
      //         this.rt.navigateByUrl("veg");
      //     },
      //     (err:any)=>{
      //       alert("Invalid Credintial");
      //     }
      //   );
      // }

      console.log(recipeData);

      this.srvc.updateNonVeg(recipeData).subscribe(
        (res:any)=>{
           alert('update Successfully Added!')
            this.recipeGroup.reset();
           this.rt.navigateByUrl("novneg");
        },
        (err:any)=>{
          alert("Invalid Credintial");
        }
      );
    }

    }
}
