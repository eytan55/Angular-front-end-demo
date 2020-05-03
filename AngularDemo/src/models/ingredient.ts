export class Ingredient {
  name: string;
  quantity: number;
  unitMeasure: string;
  constructor(name: string, quantity: number, unitMeasure: string = '') {
    this.name = name;
    this.quantity = quantity;
    this.unitMeasure = unitMeasure;
}
}
