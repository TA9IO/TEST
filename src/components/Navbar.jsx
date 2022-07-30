import { CartIcon } from '../icons/icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const { amount } = useSelector((state) => state.cart);
  const cart = useSelector((state) => state.cart);
  // console.log(cart)

  return (
    <nav>
      <div className='nav-center'>
        <h3>Meta Store</h3>
        <div className='nav-container'>
          <CartIcon />
          <div className='amount-container'>
            <p className='total-amount'>{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;

