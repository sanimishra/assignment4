/* global db print */
/* eslint no-restricted-globals: "off" */
db.products.remove({});
const productDB = [
  {
    id: 1,
    category: 'Shirts',
    name: "Champion Men's Classic Jersey Script T-Shirt",
    price: 13.30,
    image: 'https://www.amazon.com/Champion-Classic-Jersey-Script-T-Shirt/dp/B07DJBPCG4/ref=sr_1_4?dchild=1&fst=as%3Aoff&qid=1583022337&refinements=p_n_size_browse-vebin%3A2343350011&rnid=2343347011&s=apparel&sr=1-4&th=1&psc=1',
  },
  {
    id: 2,
    category: 'Jeans',
    name: "Levi's Men's 505 Regular Fit Jeans",
    price: 33.70,
    image: 'https://www.amazon.com/Levis-Mens-505-Regular-Jeans/dp/B0851V9F66?ref_=BSellerC&pf_rd_p=8b9edfd7-5cab-5d6d-95e0-2a33e420fd90&pf_rd_s=merchandised-search-11&pf_rd_t=101&pf_rd_i=1045564&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=MY9CW9NG8AKAQW4402XG&pf_rd_r=MY9CW9NG8AKAQW4402XG&pf_rd_p=8b9edfd7-5cab-5d6d-95e0-2a33e420fd90',
  },
];
db.products.insertMany(productDB);
const count = db.products.count();
print('Inserted', count, 'products');
db.counters.remove({ _id: 'products' });
db.counters.insert({ _id: 'products', current: count });
db.products.createIndex({ id: 1 }, { unique: true });
db.products.createIndex({ category: 1 });
db.products.createIndex({ name: 1 });
db.products.createIndex({ price: 1 });
db.products.createIndex({ image: 1 });
