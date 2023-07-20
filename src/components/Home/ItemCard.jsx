import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import supabase from '../../supabase/api';
import { ProductAction } from '../../store/ProductSlice';

import DeleteItem from './DeleteItem';
import Modal from '../UI/Modal';
import Form from './Form';

const ItemCard = ({ data }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const imageProduct = async () => {
      const { data: foto, error } = await supabase.storage
        .from('fotoBarang')
        .getPublicUrl(data.fotoUrl);

      setImage(foto.publicUrl);
    };

    imageProduct();
  }, [data]);

  const onDeleteItem = () => {
    setDeleteModal((value) => !value);
    dispatch(ProductAction.resetError());
  };

  const onEditHandler = () => {
    setModalVisible((value) => !value);
    dispatch(ProductAction.resetError());
  };

  const namaBarang =
    data.namaBarang[0].toUpperCase() + data.namaBarang.slice(1);

  return (
    <div className="max-w-md rounded-lg overflow-hidden shadow-lg ">
      {deleteModal && (
        <Modal onClickModal={onDeleteItem}>
          <DeleteItem data={data} onDelete={onDeleteItem} />
        </Modal>
      )}
      {modalVisible && (
        <Modal onClickModal={onEditHandler}>
          <Form onClickForm={onEditHandler} data={data} />
        </Modal>
      )}
      <img
        src={image}
        alt="Your Product"
        className="w-full h-56 object-cover object-center"
      />
      <div className="bg-white p-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{namaBarang}</h3>
          <p className="text-xl font-bold text-orange-500">${data.hargaBeli}</p>
        </div>
        <div className="flex justify-between mt-5">
          <p className="text-gray-600 font-medium">Stok : {data.stok}</p>
          <p className="text-gray-600 font-medium">
            Harga Jual : ${data.hargaJual}
          </p>
        </div>
        <div className="flex items-center gap-2 mt-8 justify-center">
          <button
            onClick={onEditHandler}
            className=" bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Edit Item
          </button>
          <button
            onClick={onDeleteItem}
            className="border-2 px-4 py-2 rounded-md border-gray-300 hover:border-orange-300 hover:text-orange-500"
          >
            Delete Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
