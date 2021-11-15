import React from 'react';
import Cart from './component/Cart';
import Filter from './component/Filter';
import Products from './component/Products';
import data from './data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      cartItems: [],
      size: '',
      sort: ''
    }
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
      cartItems.push({...product, count: 1 })
    }
    this.setState({cartItems})
  }
  removeFromCart = (itemSelected) => {
    const cartItems = this.state.cartItems.slice();
    const removedItem = cartItems.filter(item =>{
      return item._id !== itemSelected._id
    })
    this.setState({
      cartItems: removedItem
    })
  }
  render() {
    return (
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
                products={this.state.products}
                addToCart={this.addToCart}
              />
            </div>
            <div className='sidebar'>
              <Cart
                cartItems={this.state.cartItems}
                removeFromCart={this.removeFromCart}
              />
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    )

  }
}

export default App