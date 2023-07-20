import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductAction } from '../../store/ProductSlice';

import ItemCard from './ItemCard';
import Form from './Form';
import Modal from '../UI/Modal';
import Pagination from '../UI/Pagination';
import Search from '../UI/Search';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const selector = useSelector((state) => state.product.showProduct);
  const page = useSelector((state) => state.product.page);

  const statusSelector = useSelector((state) => state.product.status);
  const messageSelector = useSelector((state) => state.product.message);
  const errorSelector = useSelector((state) => state.product.error);

  const onAddDataHandler = () => {
    dispatch(ProductAction.resetError());
    setModalVisible((value) => !value);
  };

  const renderItem = selector
    .slice(page * 6, (page + 1) * 6)
    .map((value) => <ItemCard data={value} key={value.id} />);

  return (
    <div className="min-h-screen mt-10 mx-20 flex flex-col 2xl:items-center">
      {modalVisible && (
        <Modal onClickModal={onAddDataHandler}>
          <Form onClickForm={onAddDataHandler} />
        </Modal>
      )}
      <div className="mt-10 p-2 2xl:w-1/2">
        <h2 className="border-t-2  border-orange-500 w-fit text-xl font-medium">
          Store Management
        </h2>
        <div className="mt-10 flex justify-between items-center gap-5">
          <button
            className=" bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-lg text-white font-medium"
            onClick={onAddDataHandler}
          >
            Tambahkan Item
          </button>
          <Search />
        </div>
        {statusSelector === 'failed' ? (
          <>
            <div className="mt-5 text-red-600 font-bold">{messageSelector}</div>
            <div className="mt-5 text-red-600 font-bold">{errorSelector}</div>
          </>
        ) : (
          ''
        )}
        {statusSelector === 'loading' ? (
          <div className="mt-24 flex  justify-center items-center gap-5">
            <div className="border-t-4 animate-spin border-orange-500 w-24 h-24 rounded-full "></div>
            <span className="animate-none text-orange-500 font-bold text-2xl">
              Loading
            </span>
          </div>
        ) : (
          <>
            <div className="my-10 grid grid-cols-3 gap-5">{renderItem}</div>
            <div className="mb-5 flex justify-center">
              <Pagination />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
