import {
  Attribute,
  Category,
  Currency,
  Product,
  type ProductsByCategory,
  type ProductsMap,
} from './entities.js';

const currencies = [
  new Currency('EUR', '€', 1),
  new Currency('USD', '$', 0.97),
  new Currency('GBP', '£', 0.88),
  new Currency('JPY', '¥', 141.8),
];

const products = [
  new Product('Sony-WH-1000XM5', Category.Electronics, 366.24)
    .setPrices(currencies)
    .setBrand('Sony')
    .setName('WH-1000XM5')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/61+btxzpfDL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61Gdpfwb4VL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61Wr61lCJuL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71CFIXeUuWL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/51pFYV7FHdL._AC_SL1200_.jpg',
    ])
    .setAttributes([
      new Attribute('Color', 'Color', 'swatch').addItem('Black', '#000').addItem('White', '#FFF'),
    ])
    .setDescription(
      '<p>Wireless Industry Leading Noise Canceling Headphones with Auto Noise Canceling Optimizer, Crystal Clear Hands-Free Calling, and Alexa Voice Control</p> \
      <ul> \
      <li>Magnificent Sound, engineered to perfection with the new Integrated Processor V1</li> \
      <li>Crystal clear hands-free calling with 4 beamforming microphones, precise voice pickup, and advanced audio signal processing.</li> \
      <li>Up to 30-hour battery life with quick charging (3 min charge for 3 hours of playback)</li> \
      <li>Ultra-comfortable, lightweight design with soft fit leather</li> \
      <li>Multipoint connection allows you to quickly switch between devices</li> \
      </ul>',
    ),

  new Product('Acer-Chromebook-Spin-311-Convertible', Category.Electronics, 210.47)
    .setPrices(currencies)
    .setBrand('Acer')
    .setName('Chromebook Spin 311 Convertible')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/71c5W9NxN5L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71rWaKKIu3L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71o3hVSA9WL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71bp2a+4+ZL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61XYuBenRDL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/317Ne-v7XdL._AC_.jpg',
      'https://m.media-amazon.com/images/I/71NJqJWWQ6L._AC_SL1500_.jpg',
    ])
    .setAttributes([
      new Attribute('Capacity', 'Capacity', 'text')
        .addItem('4GB / 32GB', '4GB / 32GB')
        .addItem('4GB / 64GB', '4GB / 64GB'),
      new Attribute('Keyboard/Mouse bundle', 'Keyboard/Mouse bundle', 'text')
        .addItem('No', 'No')
        .addItem('Yes', 'Yes'),
      new Attribute('With bag', 'With bag', 'text').addItem('No', 'No').addItem('Yes', 'Yes'),
    ])
    .setDescription(
      '<ul> \
      <li>Chromebook runs on Chrome OS - An operating system by Google that is built for the way we live today. It comes with built-in virus protection, updates automatically, boots up in seconds and continues to stay fast over time. (Internet connection is required).</li> \
      <li>All the Google apps you know and love come standard on every Chromebook, which means you can edit, download, and convert Microsoft Office files in Google Docs, Sheets and Slides.</li> \
      <li>Get access to more than 2 million Android apps from Google Play to learn and do more.</li> \
      <li>Chromebooks come with built-in storage for offline access to your most important files and an additional 100GB of Google Drive space to ensure that all of your files are backed up automatically.</li> \
      <li>Acer CP311-2H-C7QD convertible Chromebook comes with 11.6” HD Touch IPS Display with Antimicrobial Corning Gorilla Glass, Intel Celeron N4000, 4GB LPDDR4 Memory, 64GB eMMC, Chrome OS and up to 10-hours battery life.</li> \
      </ul>',
    ),

  new Product('Canon-EOS-REBEL-T7-18-55mm', Category.Electronics, 504.1)
    .setPrices(currencies)
    .setBrand('Canon')
    .setName('EOS REBEL T7 18-55mm f/3.5-5.6 IS II Kit')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/71EWRyqzw0L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71sQ1on0fuL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81pz06ySqrL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/717xSjyDRzL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71YqHRYSluL._AC_SL1500_.jpg',
    ])
    .setDescription(
      '<ul> \
      <li>24.1 Megapixel CMOS (APS-C) sensor with is 100–6400 (H: 12800)</li> \
      <li>Built-in Wi-Fi and NFC technology</li> \
      <li>9-Point AF system and AI Servo AF</li> \
      <li>Optical Viewfinder with approx 95% viewing coverage</li> \
      <li>Use the EOS Utility Webcam Beta Software (Mac and Windows) to turn your compatible Canon camera into a high-quality webcam. Compatible Lenses- Canon EF Lenses (including EF-S lenses, excluding EF-M lenses) </li> \
      </ul>',
    ),

  new Product('Apple-iPad-2018', Category.Electronics, 154.7)
    .setPrices(currencies)
    .setBrand('Apple')
    .setName('iPad 2018')
    .setInStock(false)
    .setGallery([
      'https://m.media-amazon.com/images/I/61aeen0K1NL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/51r7ALHm9FL._AC_SL1000_.jpg',
      'https://m.media-amazon.com/images/I/31K-sS-WQEL._AC_SL1000_.jpg',
    ])
    .setAttributes([
      new Attribute('Capacity', 'Capacity', 'text').addItem('16GB', '16GB').addItem('32GB', '32GB'),
      new Attribute('Color', 'Color', 'swatch')
        .addItem('White', '#FFF')
        .addItem('Space Gray', '#cccdd2'),
    ])
    .setDescription(
      '<p><b>The product is refurbished, fully functional, and in excellent condition. Backed by the 90-day Amazon Renewed Guarantee.</b></p> \
      <p>- This pre-owned product has been professionally inspected, tested and cleaned by Amazon qualified vendors. It is not certified by Apple.</p> \
      <p>- This product is in "Excellent condition". The screen and body show no signs of cosmetic damage visible from 12 inches away.</p> \
      <p>- This product will have a battery that exceeds 80% capacity relative to new.</p> \
      <p>- Accessories may not be original, but will be compatible and fully functional. Product may come in generic box. </p>',
    ),

  new Product('Nintendo-Switch', Category.Electronics, 315.18)
    .setPrices(currencies)
    .setBrand('Nintendo')
    .setName('Switch')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/71Qk2M1CIgL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71lfEWM9AYL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71ILSOE6ovL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61-PblYntsL._AC_SL1500_.jpg',
    ])
    .setAttributes([
      new Attribute('Additional Memory card', 'Additional Memory card', 'text')
        .addItem('No', 'No')
        .addItem('64GB', '64GB')
        .addItem('128GB', '128GB')
        .addItem('256GB', '256GB'),
      new Attribute('Color', 'Color', 'text')
        .addItem('Gray', 'Gray')
        .addItem('Green and Blue', 'Green and Blue')
        .addItem(' Neon Blue and Red', ' Neon Blue and Red'),
    ])
    .setDescription(
      '<ul> \
      <li>3 Play Styles: TV Mode, Tabletop Mode, Handheld Mode</li> \
      <li>6.2-inch, multi-touch capacitive touch screen</li> \
      <li>4.5-9 plus Hours of Battery Life will vary depending on software usage conditions</li> \
      <li>Connects over Wi-Fi for multiplayer gaming; Up to 8 consoles can be connected for local wireless multiplayer</li> \
      <li>Model number: HAC-001(-01) </li> \
      </ul>',
    ),

  new Product('Beaully-Womens-Flannel-Plaid-Jacket', Category.Fashion, 38.4)
    .setPrices(currencies)
    .setBrand('Beaully')
    .setName("Women's Flannel Plaid Jacket Long Sleeve Button Down")
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/61OjkmaPnXL._AC_UY500_.jpg',
      'https://m.media-amazon.com/images/I/61INPX5hW0L._AC_SY500._SX._UX._SY._UY_.jpg',
      'https://m.media-amazon.com/images/I/61k5fBqDuOL._AC_SY500._SX._UX._SY._UY_.jpg',
      'https://m.media-amazon.com/images/I/71b1qlct96L._AC_UX425_.jpg',
    ])
    .setAttributes([
      new Attribute('Size', 'Size', 'text')
        .addItem('S', 'S')
        .addItem('M', 'M')
        .addItem('L', 'L')
        .addItem('XL', 'XL')
        .addItem('XXL', 'XXL'),
      new Attribute('Color', 'Color', 'swatch')
        .addItem('Khaki', '#7b6453')
        .addItem('Green', '#355855')
        .addItem('Navy Blue', '#161d39'),
    ])
    .setDescription(
      "<p><b>Women Plaid Wool Blend Shacket Button Down Shirt Jacket with Pocket</b></p> \
      <p>So versatile is our flannel button down pocket top that can be worn open as a jacket or closed as a shirt!</p> \
      <p>Oversized, loose fitting, casual style great to match with basic T-shirt, crop top, leggings, jeans, bodycon dress, sneakers or high heels for casual look that's easy to love all season long.</p> \
      <p>This color block plaid piece is designed with a collar, long sleeves and button cuffs. Finished to perfection with bust flap pockets.</p> \
      <p>Our most requested fall/winter silhouette. </p>",
    ),

  new Product('Loungefly-Harry-Potter-Bag', Category.Fashion, 73.67)
    .setPrices(currencies)
    .setBrand('Loungefly')
    .setName('Harry Potter Tattoo Art Cream Color Womens Double Strap Shoulder Bag Purse')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/619+AO0nCyL._AC_SL1024_.jpg',
      'https://m.media-amazon.com/images/I/71G9IZTRyZL._AC_SL1024_.jpg',
      'https://m.media-amazon.com/images/I/61fzpS8hfIL._AC_SL1024_.jpg',
      'https://m.media-amazon.com/images/I/71qGg6gRDIL._AC_SL1024_.jpg',
    ])
    .setDescription(
      '<ul> \
      <li>Officially Licensed Harry Potter Bag</li> \
      <li>Faux Leather with Applique and Printed Details</li> \
      <li>Front zipper pocket with Metal Charm zipper pull. Adjustable shoulder straps. Top carry handle. Printed Fabric Lining.</li> \
      <li>Womens Fashion Bag For Juniors and Women. Not intended for the use of children under 12 years</li> \
      <li>Measures 9" X 10.5" X 4.5"</li> \
      </ul>',
    ),

  new Product('Hanes-Mens-Sweatshirt', Category.Fashion, 29.34)
    .setPrices(currencies)
    .setBrand('Hanes')
    .setName("Men's Sweatshirt, EcoSmart Fleece Hoodie")
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/61sK3YJ8RuL._AC_SX385._SX._UX._SY._UY_.jpg',
      'https://m.media-amazon.com/images/I/917xvCT5WKL._AC_SX385._SX._UX._SY._UY_.jpg',
      'https://m.media-amazon.com/images/I/71jUHzAY4bL._AC_SX385._SX._UX._SY._UY_.jpg',
      'https://m.media-amazon.com/images/I/61NlO6LebpL._AC_UX385_.jpg',
    ])
    .setAttributes([
      new Attribute('Size', 'Size', 'text')
        .addItem('S', 'S')
        .addItem('M', 'M')
        .addItem('L', 'L')
        .addItem('XL', 'XL')
        .addItem('XXL', 'XXL'),
      new Attribute('Color', 'Color', 'swatch')
        .addItem('Cardinal', '#922042')
        .addItem('Ash', '#c9ccd5')
        .addItem('Navy', '#072843')
        .addItem('Black', '#1e2225'),
    ])
    .setDescription(
      "<p>When you're shopping for your next fleece hooded sweatshirt, why not choose one that you can feel good about buying while feeling good wearing? Hanes® EcoSmart® fleece is your new go-to wardrobe staple. Soft and plush, this cozy hoodie is made of mid-weight cotton/poly fleece with up to 5% of the poly fibers. The fleece in this classic hoodie is pill-resistant, super-soft, and made to keep its plush feel for a long time. And it will hold its shape thanks to ribbed cuffs and hem. Double-needle stitching at the neck and armhole seams further enhance quality and durability. In classic hoodie style, there's also a front kangaroo pocket. Here's a soft, warm, fleece hooded sweatshirt to wear well and with pride.</p>",
    ),

  new Product('Nike-Air-Force', Category.Home, 130.4)
    .setPrices(currencies)
    .setBrand('Nike')
    .setName("Air Force 1 '07 Low")
    .setInStock(false)
    .setGallery([
      'https://m.media-amazon.com/images/I/61sRKTZ4LjL._AC_UX500_.jpg',
      'https://m.media-amazon.com/images/I/71EwdyOQPpL._AC_UX500_.jpg',
      'https://m.media-amazon.com/images/I/71RqpIb-mgL._AC_SY500._SX._UX._SY._UY_.jpg',
      'https://m.media-amazon.com/images/I/71s4iuTMqXL._AC_SY500._SX._UX._SY._UY_.jpg',
    ])
    .setAttributes([
      new Attribute('Size', 'Size', 'text')
        .addItem('40', '40')
        .addItem('41', '41')
        .addItem('42', '42')
        .addItem('43', '43'),
      new Attribute('Color', 'Color', 'swatch')
        .addItem('White', '#eaebf0')
        .addItem('Black', '#1d1d1d'),
    ])
    .setDescription(
      '<p><b>Fabric Type:</b> 100% Synthetic</p> \
      <p><b>Closure Type:</b> Lace-Up</p>',
    ),

  new Product('CHICWISH-Womens-Coat', Category.Home, 73.56)
    .setPrices(currencies)
    .setBrand('CHICWISH')
    .setName("Women's Classy Light Tan/Black Open Front Knit Coat Cardigan")
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/51LfDLy1nyL._AC_UX522_.jpg',
      'https://m.media-amazon.com/images/I/51JpFlwoHgL._AC_UX522_.jpg',
      'https://m.media-amazon.com/images/I/51LWRgWeQZL._AC_SX522._SX._UX._SY._UY_.jpg',
      'https://m.media-amazon.com/images/I/51gM6p2IUwL._AC_SX522._SX._UX._SY._UY_.jpg',
      'https://m.media-amazon.com/images/I/816tVSZTA7L._AC_SX522._SX._UX._SY._UY_.jpg',
    ])
    .setAttributes([
      new Attribute('Size', 'Size', 'text')
        .addItem('S', 'S')
        .addItem('M', 'M')
        .addItem('L', 'L')
        .addItem('XL', 'XL')
        .addItem('XXL', 'XXL'),
      new Attribute('Waterfall', 'Waterfall', 'text').addItem('No', 'No').addItem('Yes', 'Yes'),
      new Attribute('Color', 'Color', 'swatch')
        .addItem('Light Tan', '#d2c2b4')
        .addItem('Black', '#262626')
        .addItem('Pumpkin', '#c07d3e'),
    ])
    .setDescription(
      '<p><b>Fabric Type:</b> 100% Acrylic</p> \
      <p><b>Care Instructions:</b> Hand Wash Only</p>',
    ),

  new Product('Furinno-Bookcase', Category.Home, 75.97)
    .setPrices(currencies)
    .setBrand('Furinno')
    .setName('Luder Bookcase / Book / Storage')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/61oD6Jvp8TL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71yj7cKDS9L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/81Q41S6qM+L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61JU2eBu9rL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71vl64zpPgL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61GUonFiSrL._AC_SL1500_.jpg',
    ])
    .setAttributes([
      new Attribute('Size', 'Size', 'text').addItem('5', '5').addItem('7', '7').addItem('11', '11'),
      new Attribute('Color', 'Color', 'swatch')
        .addItem('White', '#f4f4f4')
        .addItem('Blackwood', '#2c2b27')
        .addItem('French Oak', '#766e61')
        .addItem('Green', '#a1c33b')
        .addItem('Blue', '#74bfd4')
        .addItem('Pink', '#d3a8bc'),
    ])
    .setDescription(
      '<p><b>Material:</b> Engineered Wood</p> \
      <p><b>Mounting Type:</b> Floor Mount</p> \
      <p><b>Room Type:</b> Office, Closet, Living Room, Bedroom, Study Room</p> \
      <p><b>Shelf Type:</b> Cubby Shelf, Tiered Shelf</p> \
      <ul> \
      <li>Simple stylish design yet Functional and suitable for any room</li> \
      <li>Material: manufactured from engineered Particle Board</li> \
      <li>Fits in your space, fits on your budget</li> \
      <li>Sturdy on flat surface. Easy to assemble</li> \
      </ul>',
    ),

  new Product('KRUPS-Coffee-Maker', Category.Home, 42.09)
    .setPrices(currencies)
    .setBrand('KRUPS')
    .setName('Simply Brew Compact Filter Drip Coffee Maker, 5-Cup, Silver')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/61B+tCqptWL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71WmA9txfnL._AC_SL1500_.jpg',
    ])
    .setAttributes([
      new Attribute('Size', 'Size', 'text').addItem('5-cup', '5-cup').addItem('10-cup', '10-cup'),
      new Attribute('Style', 'Style', 'text')
        .addItem('Simply Brew', 'Simply Brew')
        .addItem('Digital', 'Digital'),
    ])
    .setDescription(
      '<p>PERFECT FOR WHOLE FAMILY: 10 cups of brewing capacity is the perfect size for multiple coffee lovers at home, while maintaining a compact and modern style</p> \
      <p>DIGITAL OPERATION: Easily access brewing functions with a seamless touch-screen digital design and intuitive programming</p> \
      <p>CUSTOM FLAVOR PROFILE: Customize to your taste by selecting light, medium, and bold and the Simply Brew will adjust brewing parameters to deliver optimal flavors for your desired flavor profile </p>',
    ),

  new Product('Venloup-Storage-Shelves', Category.Home, 57.8)
    .setPrices(currencies)
    .setBrand('Venloup')
    .setName('Bamboo Storage Rack Shelves')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/61lee+ysblL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61tvw8wbL8L._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/51VeHh9WrNL._AC_SL1500_.jpg',
    ])
    .setDescription(
      '<p><b>Material:</b> Bamboo</p> \
      <p><b>Mounting Type:</b> Floor Mount</p> \
      <p><b>Room Type:</b> Office, Bathroom, Living Room, Bedroom</p> \
      <p><b>Shelf Type:</b> Ladder Shelf</p> \
      <p><b>Number of Shelves:</b> 5</p>',
    ),

  new Product('BestOffice-Chair', Category.Home, 55)
    .setPrices(currencies)
    .setBrand('BestOffice')
    .setName('Home Office Chair')
    .setInStock(true)
    .setGallery([
      'https://m.media-amazon.com/images/I/716tq9Y8WOL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71J8POdSvDL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71rB4PTbZXL._AC_SL1500_.jpg',
      'https://m.media-amazon.com/images/I/71U7PpAeQNL._AC_SL1500_.jpg',
    ])
    .setAttributes([
      new Attribute('Color', 'Color', 'swatch')
        .addItem('Black', '#1b1b19')
        .addItem('Red', '#b9181e')
        .addItem('Blue', '#455aad')
        .addItem('White', '#e5e4e9'),
    ])
    .setDescription(
      '<p><b>Product Dimensions:</b> 22"D x 22"W x 35.2"H</p> \
      <p><b>Special Feature:</b> Adjustable Height</p>',
    ),

  new Product('SESENO-Shoe-Storage-Boxes', Category.Home, 40.0)
    .setPrices(currencies)
    .setBrand('SESENO.')
    .setName('12 Pack Shoe Storage Boxes')
    .setInStock(false)
    .setGallery(['https://m.media-amazon.com/images/I/51SMFgRI5pL._AC_.jpg'])
    .setDescription(
      '<ul> \
      <li>Keep your shoes dust free and neatly organized with these stackable shoe box storage bins</li> \
      <li>Clear stackable design to help maximize your space. Stack or use them side by side to keep your shoes organized and easy to find. Each bin measures approx. 13.1” L × 9” W × 5.5” H</li> \
      <li>Ideal for closets, bedrooms, bathrooms, laundry rooms, craft rooms, mudrooms, offices, play rooms, garages, or any room of your home / apartment / condo / dorm room / RV or camper </li> \
      </ul>',
    ),
];

function getCategoryProducts() {
  const categoryProducts = Object.values(Category).reduce((acc, category) => {
    acc[category] = [];
    return acc;
  }, {} as ProductsByCategory);

  for (const p of products) {
    categoryProducts[Category.All].push(p.id);
    categoryProducts[p.category].push(p.id);
  }

  return categoryProducts;
}

function getProductsMap() {
  return products.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
  }, {} as ProductsMap);
}

export const data = {
  currencies,
  categories: Object.values(Category),
  categoryproducts: getCategoryProducts(),
  products,
  productsMap: getProductsMap(),
};
