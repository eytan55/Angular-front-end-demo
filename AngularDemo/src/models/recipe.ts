import { Time } from '@angular/common';
import { Ingredient } from '../models/ingredient';

export class Recipe {
  id: number;
  creatorName: string;
  title: string;
  description: string;
  creationDate: Date;
  img: string;
  active: true;
  ingredient: Ingredient[];
  time: Time;
  people: number;
  difficulty: string;
  cost: number;
}
