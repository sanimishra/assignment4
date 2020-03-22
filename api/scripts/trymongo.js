require('dotenv').config();
const { MongoClient } = require('mongodb');
const url = process.env.DB_URL || 'mongodb+srv://fullstackproject:user@mongocluster-m5vdc.mongodb.net/productInventory?retryWrites=true&w=majority';
function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks ---');
  const client = new MongoClient(url, { useNewUrlParser: true,useUnifiedTopology: true });
  client.connect(function(err, client) {
    if (err) {
      callback(err);
      return;
    }
    console.log('Connected to MongoDB URL',url);
    const db = client.db();
    const collection = db.collection('products');
    const products = { id: 1, category: "Shirts",name:"Champion Men's Classic Jersey Script T-Shirt",price:13.30, image: "https://www.amazon.com/Champion-Classic-Jersey-Script-T-Shirt/dp/B07DJBPCG4/ref=sr_1_4?dchild=1&fst=as%3Aoff&qid=1583022337&refinements=p_n_size_browse-vebin%3A2343350011&rnid=2343347011&s=apparel&sr=1-4&th=1&psc=1" };
    collection.insertOne(products, function(err, result) {
      if (err) {
        client.close();
        callback(err);
        return;
      }
      console.log('Result of insert:\n', result.insertedId);
      collection.find({ _id: result.insertedId})
        .toArray(function(err, docs) {
        if (err) {
          client.close();
          callback(err);
          return;
        }
        console.log('Result of find:\n', docs);
        client.close();
        callback(err);
      });
    });
  });
}

testWithCallbacks(function(err) {
  if (err) {
    console.log(err);
  }
});
  

