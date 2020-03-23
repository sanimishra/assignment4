/* eslint "react/react-in-jsx-scope": "off" */
/* globals React ReactDOM */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */
class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query{
      productList
      { 
        id category name price image
        }
      }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    });
    const result = await response.json();
    this.setState({ products: result.data.productList });
  }

  async createProduct(product) {
    const query = `mutation productAdd($product: productinputs!) {
      productAdd(product: $product) {
        id
      }
    }`;
    const response = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { product } }),
    });
    if (response) {
      this.loadData();
    }
  }

  render() {
    return (
      <React.Fragment>
        <h3>My Company Inventory</h3>
        <h4>Showing all available products</h4>
        <hr />
        <ProductTable products={this.state.products} />
        <h4>Add a new product to inventory</h4>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </React.Fragment>
    );
  }
}
function ProductRow({ product }) {
  return (
    <tr>
      <td>{ product.name }</td>
      <td>
        $
        { product.price }
      </td>
      <td>{ product.category }</td>

      <td><a href={product.image} target="blank">View</a></td>
    </tr>
  );
}
function ProductTable({ products }) {
  const productRows = products.map(product => (
    <ProductRow key={product.id} product={product} />
  ));
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {productRows}
      </tbody>
    </table>
  );
}
class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAdd;
    const pricewithdollar = form.price.value;
    const removeddollarprice = pricewithdollar.substring(1);
    const product = {
      name: form.name.value,
      price: removeddollarprice,
      category: form.category.value,
      image: form.image.value,
    };
    const { createProduct } = this.props;
    createProduct(product);
    form.name.value = ''; form.category.value = ''; form.price.value = '$'; form.image.value = '';
  }

  render() {
    return (
      <form name="productAdd" onSubmit={this.handleSubmit} className="addprodstyle">
        <div>
          {/* eslint jsx-a11y/label-has-associated-control: ["error", { assert: "either" } ] */}
          <label htmlFor="category">Category</label>
          <select name="category" id="category">
            <option value="Shirts" defaultValue>Shirts</option>
            <option value="Jeans">Jeans</option>
            <option value="Jackets">Jackets</option>
            <option value="Sweaters">Sweaters</option>
            <option value="Accessories">Accessories</option>
          </select>
          <label htmlFor="price" id="" nesting="">Price Per Unit</label>
          <input type="text" name="price" defaultValue="$" id="price" nesting=" " />
        </div>
        <div>
          <label htmlFor="name">Product Name</label>
          <input type="text" name="name" id="name" />
          <label htmlFor="image">Image URL</label>
          <input type="url" name="image" id="image" />
        </div>
        <button type="submit">Add Product</button>
      </form>
    );
  }
}
const element = <ProductList />;
ReactDOM.render(element, document.getElementById('contents'));
