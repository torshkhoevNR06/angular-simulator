// №02-03 Переменные с определенными значениями
let status1: "loading" | "success" | "error";
status1 = "error";

let textFormat: "uppercase" | "lowercase" | "capitalize";
textFormat = "capitalize";

console.group("Информация о статусе и формат текста:");
console.log(`Статус: ${ status1 }`);
console.log(`Текст формата: ${ textFormat }`);
console.groupEnd();

// №01 Типизированная функция которая возвращает сумму 2 чисел
const getSumNumbers = (firstNumber: number, secondNumber: number): number => {
  return firstNumber + secondNumber;
};

console.log("Сумма 2 чисел:", getSumNumbers(3, 6));

// №07 Функция с конкретным форматированием
const getFormatText = (str: string, format: string): string => {
  if(format === "uppercase") {
    return str.toUpperCase();
  } else if (format === "lowercase") {
    return str.toLowerCase();
  } else {
    return `${str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()}`;
  }
};

textFormat = "lowercase";
console.log(getFormatText(textFormat, "lowercase"));

// №08 Функция которая получает измененную строку
const removeSymbol = (str: string, symbol: string): string => {
  return str.replaceAll(symbol, "");
};

console.log(removeSymbol("Hello, World!", "!"));

// №05-06 Типизация объектов пользователей и админа
interface IUser {
  name: string;
  age: number;
  width: number;
  height: number;
  city: string;
  job: string;
  gender?: string;
};

interface IAdmin extends IUser {
  ipAddress: number;
  sessionTime: number;
  deviceType: string;
  browser: string;
};

const firstUser: IUser = {
  name: "Nakir",
  age: 20,
  width: 83,
  height: 175,
  city: "Назрань",
  job: "Frontend-Angular-Developer",
  gender: "Мужской"
};

const secondUser: IUser = {
  name: "Anonymous",
  age: 26,
  width: 83,
  height: 175,
  city: "Таллинн",
  job: "Мастер развода"
};

const admin: IAdmin = {
  name: "Alexey Petrov",
  age: 32,
  width: 90,
  height: 185,
  city: "Тарту",
  job: "DevOps Engineer",
  ipAddress: 10421500307,
  sessionTime: 10800,
  deviceType: "Dell XPS 15",
  browser: "Zen"
};

// №09 Массив объектов пользователей отфильтрованных по параметру
const users: IUser[] = [
  {
    name: "Alice",
    age: 28,
    width: 65,
    height: 178,
    city: "Таллин",
    job: "Дизайнер",
    gender: "Женский"
  },
  {
    name: "Bob",
    age: 22,
    width: 84,
    height: 165,
    city: "Тарту",
    job: "Студент",
    gender: "Мужской"
  },
  {
    name: "Charlie",
    age: 30,
    width: 82,
    height: 186,
    city: "Нарва",
    job: "Инженер"
  },
  {
    name: "David",
    age: 25,
    width: 81,
    height: 187,
    city: "Пярну",
    job: "Программист"
  },
]

const usersWithFullInfo = users.filter(users => users.gender);

console.group("Информация о админе и пользователях:");
console.log("Администратор:", admin);
console.log("Первый пользователь:", firstUser);
console.log("Второй пользователь:", secondUser);
console.log("Отфильтрованный массив пользователей:", usersWithFullInfo);
console.groupEnd();