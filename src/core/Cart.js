import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  useEffect(() => {
    setItems(getCart());
  }, [run]);


  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {items.length} items</h2>
        <hr/>
        {items.map((p,i) => <Card key={i} product={p} showCartBtn= {false} modifyCart= {true} showRemoveFromCart={true} setRun={setRun} run={run} /> )}
      </div>
    )
  }

  const noItemsMsg = () => (
    <h2>
      Your Cart is empty <br/> <Link to="/shop">Continue Shopping</Link>
    </h2>
  );

  return (
    <Layout title="Shopping Cart" description="This are all your shopping items" className="container-fluid">
      <div className="row">
        {console.log('items.length',items.length)}
        <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMsg()}</div>
        <div className="col-6">
          <h2 className="mb-3">The Checkout Section</h2>
          <Checkout products={items} />
        </div>
      </div>

    </Layout>
  )
}

export default Cart;
