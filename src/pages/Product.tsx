import React, { useEffect } from 'react';
import Chart from '../components/Chart';
import SalesTable from '../components/SalesTable';
import ProductInfo from '../components/ProductInfo';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/index'; 
import { RootState } from '../store/index';
import { fetchProductData } from '../store/productSlice';

const selectProductData = (state: RootState) => state.product.productData;
const selectProductStatus = (state: RootState) => state.product.status;
const selectProductError = (state: RootState) => state.product.error;

const Product: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const productData = useSelector(selectProductData);
  console.log(productData);
  const productStatus = useSelector(selectProductStatus);
  const productError = useSelector(selectProductError);

  useEffect(() => {
    dispatch(fetchProductData()); // Dispatch the correctly typed action
  }, [dispatch]);

  if (productStatus === 'loading') return <p>Loading...</p>;
  if (productStatus === 'failed') return <p>Error: {productError}</p>;

  return (
    <div style={{display: 'flex', flexDirection: 'row', marginTop: '40px' }}>
      <div style={{ width: '25%', padding: '10px', backgroundColor: '#fff', borderRadius: '10px', marginRight: '10px' }}>
        {productData && productData.map((product, index) => (
          <ProductInfo key={index} product={product} />
        ))}
      </div>
      <div style={{ flex: 1, boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '10px' }}>
        {productData && productData.map((product, index) => (
          <div key={index}>
            <Chart salesData={product.sales} />
            <SalesTable product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Product;