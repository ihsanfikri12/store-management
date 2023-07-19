import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewProduct, editProduct } from '../../store/ProductActionThunk';

const Form = (props) => {
  const [error, setError] = useState(false);

  const namaBarangRef = useRef();
  const hargaJualRef = useRef();
  const hargaBeliRef = useRef();
  const stokRef = useRef();
  const fotoRef = useRef();

  const dispatch = useDispatch();

  const onSubmitForm = (e) => {
    e.preventDefault();

    const namaBarang = namaBarangRef.current.value;
    const hargaJual = hargaJualRef.current.value;
    const hargaBeli = hargaBeliRef.current.value;
    const stok = stokRef.current.value;
    const fotoUrl = fotoRef.current.files[0] || props?.data.fotoUrl || '';

    if (!(+hargaJual && +hargaBeli && +stok && namaBarang)) {
      setError(true);
      return;
    }

    const dataProduct = {
      namaBarang,
      hargaBeli,
      hargaJual,
      stok,
      fotoUrl,
    };

    if (props.data) {
      dispatch(editProduct({ ...dataProduct, id: props.data.id }));
      props.onClickForm();
      return;
    }

    if (!(+fotoUrl.size < 100000)) {
      setError(true);
      return;
    }

    dispatch(addNewProduct(dataProduct));
    props.onClickForm();
  };

  return (
    <form
      onSubmit={onSubmitForm}
      className="text-white border-2 bg-orange-600  border-white flex flex-col p-8 gap-5  pointer-events-auto"
    >
      {error && (
        <p className="mt-10  bg-white p-2 text-red-600 font-bold">
          Data Harus Terisi Semua, pastikan harga jual, harga beli <br /> dan
          stok berisi data angka. Serta gambar berformat png/jpg <br /> dan
          maksimal ukuran 100kb
        </p>
      )}
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label>Nama Barang</label>
          <input
            ref={namaBarangRef}
            defaultValue={props.data?.namaBarang ?? ''}
            className="p-2 rounded-md text-black"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label>Stok Barang</label>
          <input
            ref={stokRef}
            defaultValue={props.data?.stok ?? ''}
            className="p-2 rounded-md text-black"
          ></input>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label>Harga Jual</label>
          <input
            ref={hargaJualRef}
            defaultValue={props.data?.hargaJual ?? ''}
            className="p-2 rounded-md text-black"
          ></input>
        </div>
        <div className="flex flex-col gap-2">
          <label>Harga Beli</label>
          <input
            ref={hargaBeliRef}
            defaultValue={props.data?.hargaBeli ?? ''}
            className="p-2 rounded-md text-black"
          ></input>
        </div>
      </div>
      <div className="flex gap-5">
        <div className="flex flex-col gap-2">
          <label>Foto Barang</label>
          <input
            type="file"
            ref={fotoRef}
            className="p-2 rounded-md text-black"
          ></input>
        </div>
      </div>
      <button className="border-2 p-2 rounded-md hover:bg-white hover:border-white hover:text-black">
        Submit
      </button>
    </form>
  );
};

export default Form;
