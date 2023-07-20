import { useEffect } from 'react';
import Home from './components/Home/Home';
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
