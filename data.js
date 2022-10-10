// @ts-check

//
// Classes
//

class Currency {
  /**
   * @param {string} label
   * @param {string} symbol
   * @param {number} rate
   */
  constructor(label, symbol, rate) {
    this.label = label;
    this.symbol = symbol;
    this.rate = rate;
  }
}

class Attribute {
  /**
   * @param {string} id
   * @param {string} name
   * @param {string} type
   */
  constructor(id, name, type) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.items = [];
  }

  /**
   * @param {string} id
   * @param {string} value
   * @returns {Attribute}
   */
  addItem(id, value) {
    this.items.push({ id, value });
    return this;
  }
}

class Product {
  /**
   * @param {string} id
   * @param {string} category
   * @param {number} baseAmount
   */
  constructor(id, category, baseAmount) {
    this.id = id;
    this.name = "";
    this.brand = "";
    this.category = category;
    this.description = "";
    this.inStock = false;
    this.gallery = [];
    this.attributes = [];
    this.prices = getPrices(baseAmount);
  }
  /** @param {string} name */
  setName(name) {
    this.name = name;
    return this;
  }
  /** @param {string} brand */
  setBrand(brand) {
    this.brand = brand;
    return this;
  }
  /** @param {string} description */
  setDescription(description) {
    this.description = description;
    return this;
  }
  /** @param {boolean} value */
  setInStock(value) {
    this.inStock = value;
    return this;
  }
  /** @param {string[]} gallery */
  setGallery(gallery) {
    this.gallery = gallery;
    return this;
  }
  /** @param {Attribute[]} attributes */
  setAttributes(attributes) {
    this.attributes = attributes;
    return this;
  }
}

//
// Actual data
//

const currencies = [
  new Currency("EUR", "€", 1),
  new Currency("USD", "$", 0.97),
  new Currency("GBP", "£", 0.88),
  new Currency("JPY", "¥", 141.8),
];

const categories = {
  clothes: "clothes",
  tech: "tech",
};

const products = [
  new Product("huarache-x-stussy-le", categories.clothes, 118)
    .setName("Nike Air Huarache Le")
    .setBrand("Nike x Stussy")
    .setInStock(true)
    .setDescription("<p>Great sneakers for everyday use!</p>")
    .setGallery([
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
      "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087",
    ])
    .setAttributes([
      new Attribute("Size", "Size", "text")
        .addItem("40", "40")
        .addItem("41", "41")
        .addItem("42", "42")
        .addItem("43", "43"),
    ]),

  new Product("jacket-canada-goosee", categories.clothes, 422)
    .setName("Jacket")
    .setBrand("Canada Goose")
    .setInStock(true)
    .setDescription("<p>Awesome winter jacket</p>")
    .setGallery([
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016109/product-image/2409L_61_c.jpg",
      "https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016110/product-image/2409L_61_d.jpg",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058169/product-image/2409L_61_o.png",
      "https://images.canadagoose.com/image/upload/w_1333,c_scale,f_auto,q_auto:best/v1634058159/product-image/2409L_61_p.png",
    ])
    .setAttributes([
      new Attribute("Size", "Size", "text")
        .addItem("Small", "S")
        .addItem("Medium", "M")
        .addItem("Large", "L")
        .addItem("Extra Large", "XL"),
    ]),

  new Product("ps-5", categories.tech, 670)
    .setName("PlayStation 5")
    .setBrand("Sony")
    .setInStock(false)
    .setDescription(
      "<p>A good gaming console. Plays games of PS4! Enjoy if you can buy it mwahahahaha</p>"
    )
    .setGallery([
      "https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg",
    ])
    .setAttributes([
      new Attribute("Color", "Color", "swatch")
        .addItem("Green", "#44FF03")
        .addItem("Cyan", "#03FFF7")
        .addItem("Blue", "#030BFF")
        .addItem("Black", "#000000")
        .addItem("White", "#FFFFFF"),
      new Attribute("Capacity", "Capacity", "text")
        .addItem("512G", "512G")
        .addItem("1T", "1T"),
    ]),

  new Product("xbox-series-s", categories.tech, 272)
    .setName("Xbox Series S 512GB")
    .setBrand("Microsoft")
    .setInStock(false)
    .setDescription(
      "\n<div>\n    <ul>\n        <li><span>Hardware-beschleunigtes Raytracing macht dein Spiel noch realistischer</span></li>\n        <li><span>Spiele Games mit bis zu 120 Bilder pro Sekunde</span></li>\n        <li><span>Minimiere Ladezeiten mit einer speziell entwickelten 512GB NVMe SSD und wechsle mit Quick Resume nahtlos zwischen mehreren Spielen.</span></li>\n        <li><span>Xbox Smart Delivery stellt sicher, dass du die beste Version deines Spiels spielst, egal, auf welcher Konsole du spielst</span></li>\n        <li><span>Spiele deine Xbox One-Spiele auf deiner Xbox Series S weiter. Deine Fortschritte, Erfolge und Freundesliste werden automatisch auf das neue System übertragen.</span></li>\n        <li><span>Erwecke deine Spiele und Filme mit innovativem 3D Raumklang zum Leben</span></li>\n        <li><span>Der brandneue Xbox Wireless Controller zeichnet sich durch höchste Präzision, eine neue Share-Taste und verbesserte Ergonomie aus</span></li>\n        <li><span>Ultra-niedrige Latenz verbessert die Reaktionszeit von Controller zum Fernseher</span></li>\n        <li><span>Verwende dein Xbox One-Gaming-Zubehör -einschließlich Controller, Headsets und mehr</span></li>\n        <li><span>Erweitere deinen Speicher mit der Seagate 1 TB-Erweiterungskarte für Xbox Series X (separat erhältlich) und streame 4K-Videos von Disney+, Netflix, Amazon, Microsoft Movies &amp; TV und mehr</span></li>\n    </ul>\n</div>"
    )
    .setGallery([
      "https://images-na.ssl-images-amazon.com/images/I/71vPCX0bS-L._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71q7JTbRTpL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/71iQ4HGHtsL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61IYrCrBzxL._SL1500_.jpg",
      "https://images-na.ssl-images-amazon.com/images/I/61RnXmpAmIL._SL1500_.jpg",
    ])
    .setAttributes([
      new Attribute("Color", "Color", "swatch")
        .addItem("Green", "#44FF03")
        .addItem("Cyan", "#03FFF7")
        .addItem("Blue", "#030BFF")
        .addItem("Black", "#000000")
        .addItem("White", "#FFFFFF"),
      new Attribute("Capacity", "Capacity", "text")
        .addItem("512G", "512G")
        .addItem("1T", "1T"),
    ]),

  new Product("apple-imac-2021", categories.tech, 1400)
    .setName("iMac 2021")
    .setBrand("Apple")
    .setInStock(true)
    .setDescription("The new iMac!")
    .setGallery([
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000",
    ])
    .setAttributes([
      new Attribute("Capacity", "Capacity", "text")
        .addItem("256G", "256G")
        .addItem("512G", "512G"),
      new Attribute("With USB 3 ports", "With USB 3 ports", "text")
        .addItem("Yes", "Yes")
        .addItem("No", "No"),
      new Attribute("Touch ID in keyboard", "Touch ID in keyboard", "text")
        .addItem("Yes", "Yes")
        .addItem("No", "No"),
    ]),

  new Product("apple-iphone-12-pro", categories.tech, 820)
    .setName("iPhone 12 Pro")
    .setBrand("Apple")
    .setInStock(true)
    .setDescription("This is iPhone 12. Nothing else to say.")
    .setGallery([
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-12-pro-family-hero?wid=940&amp;hei=1112&amp;fmt=jpeg&amp;qlt=80&amp;.v=1604021663000",
    ])
    .setAttributes([
      new Attribute("Capacity", "Capacity", "text")
        .addItem("512G", "512G")
        .addItem("1T", "1T"),
      new Attribute("Color", "Color", "swatch")
        .addItem("Green", "#44FF03")
        .addItem("Cyan", "#03FFF7")
        .addItem("Blue", "#030BFF")
        .addItem("Black", "#000000")
        .addItem("White", "#FFFFFF"),
    ]),

  new Product("apple-airpods-pro", categories.tech, 300)
    .setName("AirPods Pro")
    .setBrand("Apple")
    .setInStock(false)
    .setDescription(
      "\n<h3>Magic like you’ve never heard</h3>\n<p>AirPods Pro have been designed to deliver Active Noise Cancellation for immersive sound, Transparency mode so you can hear your surroundings, and a customizable fit for all-day comfort. Just like AirPods, AirPods Pro connect magically to your iPhone or Apple Watch. And they’re ready to use right out of the case.\n\n<h3>Active Noise Cancellation</h3>\n<p>Incredibly light noise-cancelling headphones, AirPods Pro block out your environment so you can focus on what you’re listening to. AirPods Pro use two microphones, an outward-facing microphone and an inward-facing microphone, to create superior noise cancellation. By continuously adapting to the geometry of your ear and the fit of the ear tips, Active Noise Cancellation silences the world to keep you fully tuned in to your music, podcasts, and calls.\n\n<h3>Transparency mode</h3>\n<p>Switch to Transparency mode and AirPods Pro let the outside sound in, allowing you to hear and connect to your surroundings. Outward- and inward-facing microphones enable AirPods Pro to undo the sound-isolating effect of the silicone tips so things sound and feel natural, like when you’re talking to people around you.</p>\n\n<h3>All-new design</h3>\n<p>AirPods Pro offer a more customizable fit with three sizes of flexible silicone tips to choose from. With an internal taper, they conform to the shape of your ear, securing your AirPods Pro in place and creating an exceptional seal for superior noise cancellation.</p>\n\n<h3>Amazing audio quality</h3>\n<p>A custom-built high-excursion, low-distortion driver delivers powerful bass. A superefficient high dynamic range amplifier produces pure, incredibly clear sound while also extending battery life. And Adaptive EQ automatically tunes music to suit the shape of your ear for a rich, consistent listening experience.</p>\n\n<h3>Even more magical</h3>\n<p>The Apple-designed H1 chip delivers incredibly low audio latency. A force sensor on the stem makes it easy to control music and calls and switch between Active Noise Cancellation and Transparency mode. Announce Messages with Siri gives you the option to have Siri read your messages through your AirPods. And with Audio Sharing, you and a friend can share the same audio stream on two sets of AirPods — so you can play a game, watch a movie, or listen to a song together.</p>\n"
    )
    .setGallery([
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MWP22?wid=572&hei=572&fmt=jpeg&qlt=95&.v=1591634795000",
    ]),

  new Product("apple-airtag", categories.tech, 120)
    .setName("AirTag")
    .setBrand("Apple")
    .setInStock(true)
    .setDescription(
      "\n<h1>Lose your knack for losing things.</h1>\n<p>AirTag is an easy way to keep track of your stuff. Attach one to your keys, slip another one in your backpack. And just like that, they’re on your radar in the Find My app. AirTag has your back.</p>\n"
    )
    .setGallery([
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-double-select-202104?wid=445&hei=370&fmt=jpeg&qlt=95&.v=1617761672000",
    ]),
];

//
// Helper functions
//

/**
 * @returns {{label: string, symbol: string}[]}
 */
function getCurrencies() {
  let crncs = [];
  for (let { label, symbol } of currencies) {
    crncs.push({ label, symbol });
  }
  return crncs;
}

/**
 * @returns {string[]}
 */
function getCategories() {
  let ctgs = ["all"];
  for (let c of Object.values(categories)) ctgs.push(c);
  return ctgs;
}

/**
 * @returns {{}}
 */
function getCategoryProducts() {
  let categoryProducts = {};
  categoryProducts.all = [];
  for (let c of Object.values(categories)) {
    categoryProducts[c] = [];
  }
  for (let p of products) {
    categoryProducts[p.category].push(p.id);
    categoryProducts.all.push(p.id);
  }
  return categoryProducts;
}

/**
 * @param {number} baseAmount
 * @returns {{currency: {label: string, symbol: string}, amount: number}[]}
 */
function getPrices(baseAmount) {
  let prices = [];
  for (let { label, symbol, rate } of currencies) {
    prices.push({
      currency: { label, symbol },
      amount: parseFloat((baseAmount * rate).toFixed(2)),
    });
  }
  return prices;
}

/**
 * @returns {{}}
 */
function getProducts() {
  let prds = {};
  for (let p of products) {
    prds[p.id] = { ...p };
  }
  return prds;
}

//
// exports
//

module.exports = {
  currencies: getCurrencies(),
  categories: getCategories(),
  categoryproducts: getCategoryProducts(),
  products: getProducts(),
};
