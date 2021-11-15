import React from 'react';
import Filter from './component/Filter';
import Products from './component/Products';
import data from './data.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      size: '',
      sort: ''
    }
  }
  sortProducts = (e) => {
    //impl
    console.log(e.target.value);
    const sort = e.target.value
    this.setState(state => ({
      sort: sort,
      products: this.state.products.slice().sort((a,b) => {
        if(sort === 'Lowest') {
          return a.price > b.price ? 1 : -1
        } else if(sort === 'Highest') {
          return a.price < b.price ? 1 : -1
        } else if(sort === 'Latest') {
          return a._id < b._id ? 1 : -1
        }
      })
    }))
  }
  filterProducts = (e) => {
    //impl
    console.log(e.target.value);
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
              <Products products={this.state.products} />
            </div>
            <div className='sidebar'>
              cart itemes
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