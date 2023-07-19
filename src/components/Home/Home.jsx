import React, { useState } from 'react';

import ItemCard from './ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../UI/Modal';
import Form from './Form';
import { ProductAction } from '../../store/ProductSlice';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const selector = useSelector((state) => state.product.product);

  const statusSelector = useSelector((state) => state.product.status);
  const messageSelector = useSelector((state) => state.product.message);
  const errorSelector = useSelector((state) => state.product.error);

  const dispatch = useDispatch();

  const onAddDataHandler = () => {
    setModalVisible((value) => !value);
    dispatch(ProductAction.resetStatus());
  };

  const renderItem = selector.map((value) => (
    <ItemCard data={value} key={value.id} />
  ));

  return (
    <div className="min-h-screen mt-10 mx-20 flex flex-col 2xl:items-center">
      {modalVisible && (
        <Modal onClickModal={onAddDataHandler}>
          <Form onClickForm={onAddDataHandler} />
        </Modal>
      )}
      <div className="2xl:w-1/2 flex items-center gap-5 justify-between">
        <div className="flex items-center gap-5">
          <img
            src="https://unsplash.com/photos/9A859Zwe-9k/download?ixid=M3wxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjg5NjYxMTEzfA&force=true&w=640"
            alt="Photo Profile"
            className="w-12 h-12 object-cover object-center rounded-full border-2 border-orange-300"
          />
          <h1 className="text-2xl">Hi, Selamat Datang Fikri</h1>
        </div>
        <button className="border-b-2 border-transparent hover:border-b-2 hover:border-orange-500">
          Sign Out
        </button>
      </div>
      <div className="mt-20 p-2">
        <h2 className="border-t-2  border-orange-500 w-fit text-xl font-medium">
          Store Management
        </h2>
        <div className="mt-10 flex justify-between items-center">
          <button
            className=" bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-lg text-white font-medium"
            onClick={onAddDataHandler}
          >
            Tambahkan Item
          </button>
          <input className="border-2 border-gray-400 px-4 py-2"></input>
        </div>
        {statusSelector === 'failed' ? (
          <>
            <div className="mt-5 text-red-600 font-bold">{messageSelector}</div>
            <div className="mt-5 text-red-600 font-bold">{errorSelector}</div>
          </>
        ) : (
          ''
        )}
        <div className="my-10 grid grid-cols-3 gap-5">{renderItem}</div>
      </div>
    </div>
  );
};

export default Home;
