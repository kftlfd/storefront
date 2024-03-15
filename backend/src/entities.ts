export enum Category {
  All = 'all',
  Electronics = 'electronics',
  Fashion = 'fashion',
  Home = 'home',
}

export class Currency {
  constructor(
    public label: string,
    public symbol: string,
    private rate: number,
  ) {}

  getPrice(baseAmount: number) {
    return parseFloat((baseAmount * this.rate).toFixed(2));
  }
}

export class Attribute {
  public id: string;
  public name: string;
  public type: string;
  public items: { id: string; value: string }[];

  constructor(id: string, name: string, type: string) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.items = [];
  }

  addItem(id: string, value: string): Attribute {
    this.items.push({ id, value });
    return this;
  }
}

export class Price {
  constructor(
    public currency: { label: string; symbol: string },
    public amount: number,
  ) {}
}

export class Product {
  public id: string;
  public name: string;
  public brand: string;
  public category: Category;
  public description: string;
  public inStock: boolean;
  public gallery: string[];
  public attributes: Attribute[];
  public prices: Price[];
  private baseAmount: number;

  constructor(id: string, category: Category, baseAmount: number) {
    this.id = id;
    this.name = '';
    this.brand = '';
    this.category = category;
    this.description = '';
    this.inStock = false;
    this.gallery = [];
    this.attributes = [];
    this.prices = [];
    this.baseAmount = baseAmount;
  }
  setName(name: string) {
    this.name = name;
    return this;
  }
  setBrand(brand: string) {
    this.brand = brand;
    return this;
  }
  setDescription(description: string) {
    this.description = description;
    return this;
  }
  setInStock(value: boolean) {
    this.inStock = value;
    return this;
  }
  setGallery(gallery: string[]) {
    this.gallery = gallery;
    return this;
  }
  setAttributes(attributes: Attribute[]) {
    this.attributes = attributes;
    return this;
  }
  setPrices(currencies: Currency[]) {
    this.prices = currencies.map(
      (c) => new Price({ label: c.label, symbol: c.symbol }, c.getPrice(this.baseAmount)),
    );
    return this;
  }
}

export type ProductsByCategory = Record<Category, Product['id'][]>;

export type ProductsMap = Record<Product['id'], Product>;
