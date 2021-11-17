import React from 'react';
import { Provider } from 'react-redux';
import Cart from './component/Cart';
import Filter from './component/Filter';
import Products from './component/Products';
import store from './store'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem('cartItems')) : [],
    }
  }
  createOrder = (order) => {
    alert(order.name)
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
                <Filter />
                <Products
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