require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb+srv://fullstackproject:user@mongocluster-m5vdc.mongodb.net/productInventory?retryWrites=true&w=majority';

function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect((connErr) => {
    if (connErr) {
      callback(connErr);
      return;
    }
    console.log('Connected to MongoDB URL', url);
    const db = client.db();
    const collection = db.collection('products');
    const products = {
      id: 1, category: 'Shirts', name: "Champion Men's Classic Jersey Script T-Shirt", price: 13.30, image: 'https://www.amazon.com/Champion-Classic-Jersey-Script-T-Shirt/dp/B07DJBPCG4/ref=sr_1_4?dchild=1&fst=as%3Aoff&qid=1583022337&refinements=p_n_size_browse-vebin%3A2343350011&rnid=2343347011&s=apparel&sr=1-4&th=1&psc=1',
    };
    collection.insertOne(products, (insertErr, result) => {
      if (insertErr) {
        client.close();
        callback(insertErr);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId })
        .toArray((findErr, docs) => {
          if (findErr) {
            client.close();
            callback(findErr);
            console.log('Result of find:\n', docs);
            client.close();
            callback();
          }
        });
    });
  });
}
async function testWithAsync() {
  console.log('\n--- testWithAsync ---');
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const db = client.db();
    const collection = db.collection('products');

    const products = {
      id: 2, category: 'Jeans', name: "Levi's Men's 505 Regular Fit Jeans", price: 33.70, image: 'https://www.amazon.com/Levis-Mens-505-Regular-Jeans/dp/B0851V9F66?ref_=BSellerC&pf_rd_p=8b9edfd7-5cab-5d6d-95e0-2a33e420fd90&pf_rd_s=merchandised-search-11&pf_rd_t=101&pf_rd_i=1045564&pf_rd_m=ATVPDKIKX0DER&pf_rd_r=MY9CW9NG8AKAQW4402XG&pf_rd_r=MY9CW9NG8AKAQW4402XG&pf_rd_p=8b9edfd7-5cab-5d6d-95e0-2a33e420fd90',
    };
    const result = await collection.insertOne(products);
    console.log('Result of insert:\n', result.insertedId);

    const docs = await collection.find({ _id: result.insertedId })
      .toArray();
    console.log('Result of find:\n', docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
}
testWithCallbacks((err) => {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
