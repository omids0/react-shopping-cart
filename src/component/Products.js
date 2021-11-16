import React, { Component } from 'react'
import Fade from 'react-reveal/Fade'
import Zoom from 'react-reveal/Zoom'
import Modal from 'react-modal'
import { connect } from 'react-redux'
import { fetchProducts } from '../actions/productActions'

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            product: null,
        }
    }
    componentDidMount() {
        this.props.fetchProducts()
    }
    openModal = (product) => {
        this.setState({ product })
    }
    closeModal = () => {
        this.setState({ product: null })
    }
    render() {
        const { product } = this.state
        return (
            <div >
                <Fade bottom cascade={true} >
                    {!this.props.products ? <div>Loading...</div> :
                        <ul className='products'>
                            {this.props.products.map(product => (
                                <li key={product._id}>
                                    <div className='product'>
                                        <a
                                            href={'#' + product._id}
                                            onClick={() => this.openModal(product)}
                                        >
                                            <img src={product.image} alt={product.image} />
                                            <p>{product.name}</p>
                                        </a>
                                        <div className='product-price'>
                                            <div>{`$ ${product.price} `}</div>
                                            <button onClick={() => this.props.addToCart(product)} className='button primary'>Add to cart</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    }
                </Fade>
                {product && (
                    <Modal
                        isOpen={true}
                        onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className='close-modal'
                                onClick={this.closeModal}
                            >X</button>
                            <div className='product-details'>
                                <img src={product.image} alt={product.name} />
                                <div className='product-details-description'>
                                    <p>
                                        <strong>{product.name}</strong>
                                    </p>
                                    <p>
                                        {`Brand: ${product.brand}`}
                                    </p>
                                    <p>Avaiable Sizes:{" "}
                                        {product.availableSizes.map(x => (
                                            <span>{" "} <button className='button'>{x}</button></span>
                                        ))}
                                    </p>
                                    <div className='product-price'>
                                        <div>
                                            {`$${product.price}`}
                                        </div>
                                        <button className='button primary' onClick={() => {
                                            this.props.addToCart(product);
                                            this.closeModal()
                                        }
                                        }>Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        )
    }
}

export default connect((state) => ({ products: state.products.items }), { fetchProducts})(Products)