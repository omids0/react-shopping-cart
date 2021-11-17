import React from 'react';
import { Provider } from 'react-redux';
import Cart from './component/Cart';
import Filter from './component/Filter';
import Products from './component/Products';
import store from './store'

class App extends React.Component {
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
                <Products />
              </div>
              <div className='sidebar'>
                <Cart />
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