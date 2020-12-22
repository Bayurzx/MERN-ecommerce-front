import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProduct, setRelatedProduct] = useState([]);

  const loadSingleProduct = (productId) => {
    read(productId).then((response) => {
      if (response.error) {
        setError(response.error);
      } else {
        setProduct(response);
        // then fetch related product not before
        listRelated(response._id).then((anotherResponse) => {
          if (anotherResponse.error) {
            setError(anotherResponse.error)
          } else {
            setRelatedProduct(anotherResponse)
          }
        })
      }
    })
  }

  useEffect(()=> {
    const productId = props.match.params.productId;
    loadSingleProduct(productId)
  }, [props])
  // added props to the array for useEffect because we need
  // to make the state change after setting the url in product
  // page for related product

  return (
    <Layout
       title={ product && product.name  }
       // && product.description.substring(0,100)  If it breaks add that
       description={ product && product.description  }
       className="container-fluid"
     >
        <div className="row">
          <div className="col-8">
            { product && product.description && <Card product={product} showProductBtn={false} />}
          </div>

          <div className="col-4">
            <h4>Related products</h4>
            {relatedProduct.map((r, i) => (
              <div className="mb-3">
                <Card key={i} product={r} />
              </div>
            ))}
            { relatedProduct.length === 0 ? <div> There was no related categories </div> : "" }
          </div>
        </div>
    </Layout>

  )
}

export default Product;
