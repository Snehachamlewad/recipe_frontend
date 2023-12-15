import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from '../rest.service';

@Component({
  selector: 'app-addnonveg',
  templateUrl: './addnonveg.component.html',
  styleUrls: ['./addnonveg.component.css']
})
export class AddnonvegComponent {
  recipeGroup = new FormGroup({
    //id: string
    recipe_Name : new FormControl("",Validators.required),
    ingredient :  new FormControl("",Validators.required),
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
  constructor(@Inject(RestService) private srvc:any, @Inject(Router) private rt:any) { }

  postnData():void {


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

  this.srvc.postnData(recipeData).subscribe(
    (res:any)=>{
       alert('Data Successfully Added!')
        this.recipeGroup.reset();
       this.rt.navigateByUrl("nonveg");
    },
    (err:any)=>{
      alert("Invalid Credintial");
    }
  );
}

}
}

