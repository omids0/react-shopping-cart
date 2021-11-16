import React from 'react';
import { Provider } from 'react-redux';
import Cart from './component/Cart';
import Filter from './component/Filter';
import Products from './component/Products';
import data from './data.json';
import store from './store'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem('cartItems')) : [],
      size: '',
      sort: ''
    }
  }
  createOrder = (order) => {
    alert(order.name)
  }
  sortProducts = (e) => {
    const sort = e.target.value
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice().sort((a, b) => {
        if (sort === 'Lowest') {
          return a.price > b.price ? 1 : -1
        } else if (sort === 'Highest') {
          return a.price < b.price ? 1 : -1
        } else if (sort === 'Latest') {
          return a._id < b._id ? 1 : -1
        }
      })
    }))
  }
  filterProducts = (e) => {
    if (e.target.value === "") {
      this.setState({ size: e.target.value, products: data.products })
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter(
          product => product.availableSizes.indexOf(e.target.value) >= 0
        )
      })
    }
  }
  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alredyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alredyInCart = true;
      }
    });
    if (!alredyInCart) {
      cartItems.push({ ...product, count: 1 })
    }
    this.setState({ cartItems })
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }
  removeFromCart = (itemSelected) => {
    const cartItems = this.state.cartItems.slice();
    const removedItem = cartItems.filter(item => {
      return item._id !== itemSelected._id
    })
    this.setState({ cartItems: removedItem })
    localStorage.setItem('cartItems', JSON.stringify(removedItem))
  }
  render() {
    return (
      <Provider store={store}>
        <div className='grid-container'>
          <header>
            <a href='/'>React shopping Cart</a>
          </header>
          <main>
            <div className='content'>
              <div className='main'>
                <Filter
                  count={this.state.products.length}
                  size={this.state.size}
                  sort={this.state.sort}
                  filterProducts={this.filterProducts}
                  sortProducts={this.sortProducts}
                />
                <Products
                  // products={this.state.products}
                  addToCart={this.addToCart}
                />
              </div>
              <div className='sidebar'>
                <Cart
                  cartItems={this.state.cartItems}
                  removeFromCart={this.removeFromCart}
                  createOrder={this.createOrder}
                />
              </div>
            </div>
          </main>
          <footer>
            All right is reserved.
          </footer>
        </div>
      </Provider>
    )

  }
}

export default App