import { Time } from '@angular/common';
import { Ingredient } from '../models/ingredient';

export class Recipe {
  id: number;
  creatorName: string;
  title: string;
  description: string;
  creationDate: string;
  img: string;
  active: true;
  ingredient: Ingredient[];
  time: string;
  people: number;
  difficulty: string;
  cost: number;
  constructor(
    id: number,
    creatorName: string,
    title: string,
    description: string,
    creationDate: string,
    img: string,
    active: true,
    ingredient: Ingredient[],
    time: string,
    people: number,
    difficulty: string,
    cost: number) {
    this.id = id;
    this.creatorName = creatorName;
    this.title = title;
    this.description = description;
    this.creationDate = creationDate;
    this.img = img;
    this.active = active;
    this.ingredient = ingredient;
    this.time = time;
    this.people = people;
    this.difficulty = difficulty;
    this.cost = cost;
}
}
