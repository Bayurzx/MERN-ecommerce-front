import React, {useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import { addItem, updateItem, removeItem } from './cartHelpers';
import moment from 'moment';


const Card = ({ product, showProductBtn= true, showCartBtn= true, modifyCart= false, showRemoveFromCart= false, setRun = f => f, run = undefined }) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

  const showBtn = (showProductBtn) => {
    return (
       showProductBtn &&
       (
         <Link to={`/product/${product._id}`}>
         <button className="btn btn-outline-primary mt-2 mb-2 mr-2">View Product</button>
         </Link>
       )
    )
  }

  const addTOCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to='/cart' />
    }
  }

  const cartBtn = (showCartBtn) => {
    return showCartBtn && (
      <button onClick={addTOCart} className="btn btn-outline-warning mt-2 mb-2">Add to Cart</button>
    )
  }

  const cartRemoveBtn = (showRemoveFromCart) => {
    return showRemoveFromCart && (
      <button onClick={() => {
        removeItem(product._id);
        setRun(!run);
      }} className="btn btn-outline-danger mt-2 mb-2">Remove from Cart</button>
    )
  }

  const stockNotice = (quantity) => {
    return quantity < 1 ? (
      <span className="badge badge-danger badge-pill">Out of Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill">In Stock</span>
    )
  }

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };


  const showModifyCart = (modifyCart) => {
    return modifyCart && (
      <div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
        </div>

      </div>
    )
  };

  return (
    <div className="">
      <div className="card">
        <div className="card-header name">{ product.name }</div>
        <div className="card-body">
          { shouldRedirect(redirect) }
          <ShowImage item={product} url="product" />
          <p className="lead mt-2">{ product.description.substring(0,69) }</p>
          <p className="black-9">&#x20A6;{ product.price }</p>
          <p className="black-8">
            Category: {  product.category && product.category.name }
          </p>
          <p className="black-8">
            Added : { moment(product.createdAt).fromNow() }
          </p>

            { stockNotice(product.quantity) }
            <br/>
            { showBtn(showProductBtn) }
            { cartBtn(showCartBtn) }
            { cartRemoveBtn(showRemoveFromCart) }
            <br/>
            { showModifyCart(modifyCart) }
        </div>
      </div>
    </div>
  );
};

export default Card;
