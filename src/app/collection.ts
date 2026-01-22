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
  elements: T[] = [];
  
  constructor(element: T[]) {
    this.elements = element;
  }

  getAllElements(): T[] {
    return this.elements;
  }

  getSpecificItem(index: number): T {
    return this.elements[index];
  }

  clearedСollection(): void {
    this.elements = [];
  }

  deleteSpecificItem(): void {
    this.elements.slice(0, 3);
  }

  replaceSpecificElements(index: number, elem: T): void {
    this.elements[index] = elem;
  }
}