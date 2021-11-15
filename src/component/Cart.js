import React, { Component } from 'react'

export default class Cart extends Component {
    render() {
        const { cartItems } = this.props
        return (
            <div>
                <div>
                    {
                        cartItems.length === 0 ?
                            (<div className='cart cart-header'>Cart is empty</div>)
                            :
                            (<div className='cart cart-header'>You have {cartItems.length} in the cart{" "}</div>)
                    }
                </div>
                <div>
                    <div className='cart'>
                        <ul className='cart-items'>
                            {
                                cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div>
                                            <div>{item.name}</div>
                                            <div className='right'>
                                                {`$${item.price} X ${item.count}`}{' '}
                                                <button className='button' onClick={() => this.props.removeFromCart(item)}>remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {cartItems.length !== 0 && (
                        <div className='cart'>
                            <div className='total'>
                                <div>Total:{' '}{`$${cartItems.reduce((a, c) => a + c.price * c.count, 0)}`}</div>
                                <button className='button primary'>Proceed</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}
