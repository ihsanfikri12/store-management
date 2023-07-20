import React from 'react';
import { useDispatch } from 'react-redux';

import { deleteProduct } from '../../store/ProductActionThunk';

const DeleteItem = ({ data, onDelete }) => {
  const dispatch = useDispatch();

  const deleteItem = (e) => {
    dispatch(deleteProduct(data.id));
    onDelete();
  };

  return (
    <div className="text-white border-2 bg-orange-600  border-white flex flex-col p-8 gap-5  pointer-events-auto">
      <h1>
        Apakah Kamu ingin menghapus{' '}
        <span className="font-bold">{data.namaBarang}</span> ?
      </h1>
      <div className="flex gap-5 justify-center">
        <button
          onClick={deleteItem}
          className="border-2 border-white px-4 py-2 hover:bg-white hover:text-black"
        >
          Iya
        </button>
        <button
          onClick={dispatch.bind(null, onDelete)}
          className="border-2 border-white px-4 py-2 hover:bg-white hover:text-black"
        >
          Tidak
        </button>
      </div>
    </div>
  );
};

export default DeleteItem;
