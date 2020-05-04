import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Recipe } from '../../../models/recipe';
import { Ingredient } from '../../../models/ingredient';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RecipeService } from '../../../services/recipe.service';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrls: ['./new-recipe.component.css']
})
export class NewRecipeComponent implements OnInit {

  formRecipe: FormGroup;
  formIngredient: FormGroup;
  ingredients: Ingredient[] = [];
  faPlusCircle = faPlusCircle;
  faMinus = faMinus;
  faTimes = faTimes;
  invalidFields: string[] = [];
  newRecipeSuccess = false;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.formRecipe = new FormGroup({
      name: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(2), Validators.maxLength(120), Validators.required] }),
      title: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(120), Validators.required] }),
      description: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(600), Validators.required] }),
      image: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(5), Validators.maxLength(200), Validators.required] }),
      hour: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(2), Validators.maxLength(10), Validators.required] }),
      minutes: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(2), Validators.maxLength(10), Validators.required] }),
      forPeople: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(1), Validators.pattern('[0-9]*'), Validators.maxLength(5), Validators.required] }),
      difficulty: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(10), Validators.required] }),
      cost: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(8), Validators.required] })
    });

    this.formIngredient = new FormGroup({
      name: new FormControl(null, { updateOn: 'blur', validators: [Validators.minLength(3), Validators.maxLength(120), Validators.required] }),
      quantity: new FormControl(null, { updateOn: 'blur', validators: [Validators.pattern('[0-9]*'), Validators.required] }),
      unitMeasure: new FormControl(null, { updateOn: 'blur' })
    });
  }

  AddIngredient() {
    console.log(this.formIngredient);
    const name = this.formIngredient.value.name;
    const quantity = this.formIngredient.value.quantity;
    const unitMeasure = this.formIngredient.value.unitMeasure;
    this.findInvalidControls(this.formIngredient);
    console.log('unitMeasure: ', name);
    console.log('quantity: ', quantity);
    console.log('unitMeasure: ', unitMeasure);

    if (this.formIngredient.valid) {
      console.log('formIngredient valide!');
      const newIngredient = new Ingredient(name, +quantity, unitMeasure);
      console.log('newIngredient: ', newIngredient);
      this.ingredients.push(newIngredient);
      this.formIngredient.reset();
      console.log('this.ingredients: ', this.ingredients);
    }
    else {
      console.log('formIngredient no valide!');
    }
  }

  RemoveIngredient(index) {
    console.log('index: ', index);
    this.ingredients.splice(index, 1);
  }

  onSubmit() {
    console.log(this.formRecipe);
    this.newRecipeSuccess = false;
    const name = this.formRecipe.value.name;
    const title = this.formRecipe.value.title;
    const description = this.formRecipe.value.description;
    const image = this.formRecipe.value.image;
    const hour = this.formRecipe.value.hour;
    const minutes = this.formRecipe.value.minutes;
    const forPeople = this.formRecipe.value.forPeople;
    const difficulty = this.formRecipe.value.difficulty;
    let cost = this.formRecipe.value.cost;
    cost = this.getPrice(cost);
    const today = new Date();
    const dateNow = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = hour + ':' + minutes + ':' + '00';

    this.findInvalidControls(this.formRecipe);
    if (this.formRecipe.valid && this.ingredients.length > 0) {
      console.log('formRecipe valide!');
      const newRecipe = new Recipe(
        this.recipeService.getTotalRecipe() + 1,
        name,
        title,
        description,
        dateNow,
        image,
        true,
        this.ingredients,
        time,
        +forPeople,
        difficulty,
        cost);
      this.recipeService.addRecipe(newRecipe);
      this.formRecipe.reset();
      this.newRecipeSuccess = true;
      this.ingredients = [];
      console.log('newRecipe: ', newRecipe);
    }
    else {
      this.addErrorToErrors('The recipe must contain 1 ingredient minimum.');
      console.log('formRecipe no valide!');
    }
  }

  private findInvalidControls(form: FormGroup) {
    const invalid: string[] = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    this.getDisplayedNames(invalid);
    console.log('invalid fields: ', invalid);
  }

  private getDisplayedNames(invalid: string[]) {
    this.invalidFields = [];
    invalid.forEach(error => {
      switch (error) {
        case 'name':
          this.invalidFields.push('Name');
          break;
        case 'title':
          this.invalidFields.push('Title');
          break;
        case 'description':
          this.invalidFields.push('Description : Max 600 letters.');
          break;
        case 'image':
          this.invalidFields.push('Image');
          break;
        case 'hour':
          this.invalidFields.push('Hour');
          break;
        case 'minutes':
          this.invalidFields.push('Minutes');
          break;
        case 'forPeople':
          this.invalidFields.push('People: Only numbers.');
          break;
        case 'difficulty':
          this.invalidFields.push('Difficulty');
          break;
        case 'cost':
          this.invalidFields.push('Price');
          break;
        case 'quantity':
          this.invalidFields.push('Quantity: Only numbers.');
          break;
        case 'unitmeasure':
          this.invalidFields.push('Unit measure');
          break;
        default:
          break;
      }
    });
  }

  private getPrice(cost: string) {
    let result;
    switch (cost) {
        case 'Low':
          result = 1;
          break;
        case 'Medium':
          result = 2;
          break;
        case 'Hight':
          result = 3;
          break;
        default:
          result = 2;
          break;
      }
    return result;
  }

  private addErrorToErrors(error: string) {
    this.invalidFields.push(error);
  }

}
