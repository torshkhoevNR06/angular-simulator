// №05 Задачи с Generic

const rareStones: string[] = [
  "Шунгит",
  "Лимонит",
  "Пренит",
  "Унакит",
  "Кианит"
];

const oldСoins: string[] = [
  "Денарий",
  "Дукат",
  "Пиастр",
  "Грош",
  "Алтын"
];

class Collection<T> {
  element: T[] = [];
  
  constructor(element: T[]) {
    this.element = element;
  }

  getAllelement(): T[] {
    return this.element;
  }

  getSpecificItem(): T {
    return this.element[1];
  }

  getСlearedСollection(): T[] {
    return this.element = [];
  }

  getDeleteSpecificItem(): T[] {
    return this.element.slice(0, 4);
  }

  getReplaceSpecificElement(item: T): T[] {
    return this.element.splice(0, 4, item);
  }
}

const collectionStones: Collection<string> = new Collection(rareStones);
const collectionСoins: Collection<string> = new Collection(oldСoins);

console.log(collectionStones.getAllelement());
console.log(collectionStones.getDeleteSpecificItem());
console.log(collectionStones.getSpecificItem());

console.log(collectionСoins.getReplaceSpecificElement("Драхма"));
console.log(collectionСoins.getDeleteSpecificItem());
console.log(collectionСoins.getСlearedСollection());