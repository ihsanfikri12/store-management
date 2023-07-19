import { useEffect, useState } from 'react';
import Home from './components/Home/Home';
import Modal from './components/UI/Modal';
import supabase from './supabase/api';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from './store/ProductActionThunk';

function App() {
  const productStatus = useSelector((state) => state.product.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProduct());
    }
  }, [productStatus, dispatch]);

  return (
    <>
      <Home />
    </>
  );
}

export default App;
