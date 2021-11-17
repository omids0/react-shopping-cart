import { connect } from 'react-redux';
import React, { Component } from 'react'
import Modal from 'react-modal'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import { removeFromCart } from '../actions/cartActions'
import { clearOrder, createOrder } from '../actions/orderActions'

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            address: '',
            showCheckout: false
        }
    }
    handelInput = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    createOrder = (e) => {
        e.preventDefault()
        const order = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0)
        }
        this.props.createOrder(order)
    }
    closeModal = () => {
        this.props.clearOrder()
    }
    render() {
        const { cartItems, order } = this.props
        return (
            <div>
                <div>
                    {
                        cartItems.length === 0 ?
                            (<div className='cart cart-header'>Cart is empty</div>)
                            :
                            (<div className='cart cart-header'>You have {cartItems.length} in the cart{" "}</div>)
                    }
                    {
                        order &&
                        <Modal isOpen={true} onRequestClose={this.closeModal}>
                            <Zoom>
                                <button className='close-modal' onClick={this.closeModal}>X</button>
                                <div className='order-details'>
                                    <h3 className='success-message'>Your order has been placed.</h3>
                                    <h2>{`Order ${order._id}`}</h2>
                                    <ul>
                                        <li>
                                            <div>Name:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>Email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>Address:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>Date:</div>
                                            <div>{order.createdAt}</div>
                                        </li>
                                        <li>
                                            <div>Total:</div>
                                            <div>{`$${order.total}`}</div>
                                        </li>
                                        <li>
                                            <div>Cart Items:</div>
                                            <div>{order.cartItems.map((x) => (
                                                <div>
                                                    {x.count} {' * '} {x.name}
                                                </div>
                                            ))}</div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>
                    }
                </div>
                <div>
                    <div className='cart'>
                        <Fade left cascade>
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
                        </Fade>
                    </div>
                    {
                        cartItems.length !== 0 && (
                            <div className='cart'>
                                <div className='total'>
                                    <div>Total:{' '}{`$${cartItems.reduce((a, c) => a + c.price * c.count, 0)}`}</div>
                                    <button onClick={() => this.setState({ showCheckout: true })} className='button primary'>Proceed</button>
                                </div>
                            </div>
                        )}
                    <div>
                        {
                            this.state.showCheckout && cartItems.length !== 0 && (
                                <Fade right cascade>
                                    <div className='cart'>
                                        <form onSubmit={this.createOrder}>
                                            <ul className='form-container'>
                                                <li>
                                                    <label>Email</label>
                                                    <input type='email'
                                                        name='email'
                                                        requireds
                                                        onChange={this.handelInput} />
                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input type='text'
                                                        name='name'
                                                        required
                                                        onChange={this.handelInput} />
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input type='address'
                                                        name='address'
                                                        required
                                                        onChange={this.handelInput} />
                                                </li>
                                                <li>
                                                    <button className='button primary' type='submit'>Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
}),
    {
        removeFromCart,
        createOrder,
        clearOrder
    })(Cart)