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

  elements: T[] = [];

  constructor(elements: T[]) {
    this.elements = elements;
  }

  getAllElements(): T[] {
    return this.elements;
  }

  getElements(index: number): T {
    return this.elements[index];
  }

  сollectionСleared(): void {
    this.elements = [];
  }

  deleteElement(indexToRemove: number): void {
    this.elements = this.elements.filter((_: T, index: number) => index !== indexToRemove);
  }

  replaceElement(index: number, elem: T): void {
    this.elements[index] = elem;
  }

}