class Greetings {
  english() {
    return "Hello";
  }
  spanish() {
    return "Hola";
  }
}

class MoreGreetings {
  german() {
    return "Hallo";
  }
  french() {
    return "Bonjour";
  }
}

const greetings = new Greetings();
const moreGreetings = new MoreGreetings();

const allGreetings = new Proxy(greetings, {
  get: (target, property) => {
    return target[property] || moreGreetings[property];
  },
});

console.log(allGreetings.german()); // Hallo
console.log(allGreetings.french()); // Bonjour
console.log(allGreetings.spanish()); // Hola
console.log(allGreetings.english()); // Hello
