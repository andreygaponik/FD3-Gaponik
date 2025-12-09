class Product {
  name: string;
  scale: number;

  constructor(name: string, scale: number) {
    this.name = name;
    this.scale = scale;
  }

  getName() {
    return this.name;
  }

  getScale() {
    return this.scale;
  }
}

class Apple extends Product {}

class Tomato extends Product {}

class Scales {
  products: Product[] = [];

  add(product: Product) {
    this.products.push(product);
  }

  getNameList(): string[] {
    return this.products.map((product) => product.getName());
  }

  getSumScale(): number {
    let sum: number = 0;

    this.products.forEach((product) => (sum += product.getScale()));

    return sum;
  }
}

const apple1: Apple = new Apple('Голден', 10);
const apple2: Apple = new Apple('Фуджи', 12);

const tomato1: Tomato = new Tomato('Черри', 23);
const tomato2: Tomato = new Tomato('Пигмей', 45);

const scales: Scales = new Scales();

scales.add(apple1);
scales.add(apple2);
scales.add(tomato1);
scales.add(tomato2);

console.log(scales.getNameList());
console.log(scales.getSumScale());
