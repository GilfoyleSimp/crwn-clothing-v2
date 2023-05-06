import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext)

    return (
        <div>
            <div className='checkout-container'>
                <div className='checkout-header'>
                    <div className='header-block'>
                        <span>Product</span>
                    </div>
                    <div className='header-block'>
                        <span>Description</span>
                    </div>
                    <div className='header-block'>
                        <span>Quantity</span>
                    </div>
                    <div className='header-block'>
                        <span>Price</span>
                    </div>
                    <div className='header-block'>
                        <span>Remove</span>
                    </div>

                </div>
                    {cartItems.map((cartItem) => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                    ))}

            </div>
            <span className='total'>Total: R{cartTotal}</span>

        </div>
    )

}

export default Checkout;