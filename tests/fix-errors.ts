// Fix #1 — функция обещает вернуть string, но возвращает number
function getTimeout(seconds: number): number {
  return seconds * 1000;  // What's wrong here?
}

// Fix #2 — опечатка в имени поля
const configg = { baseURL: "https://staging.example.com" };
console.log(config.baseURL);  // What's wrong here?

// Fix #3 — userName может быть undefined
function printName(name: string) {
  console.log(name);
}
const userName: string | undefined = undefined;
if (userName) { 
    printName(userName);  // What's wrong here?
}