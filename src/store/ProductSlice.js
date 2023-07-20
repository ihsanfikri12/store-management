import { createSlice } from '@reduxjs/toolkit';

import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchProduct,
} from './ProductActionThunk';

const INITIAL_DATA = {
  status: 'idle',
  page: 0,
  error: '',
  message: '',
  product: [],
  showProduct: [],
};

const ProductSlide = createSlice({
  name: 'product',
  initialState: INITIAL_DATA,
  reducers: {
    resetError(state) {
      state.error = '';
      state.message = '';
    },
    changePage(state, action) {
      state.page = action.payload;
    },
    addShowProduct(state, action) {
      state.showProduct = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        console.log(action);
        state.status = 'succeeded';
        state.product = action.payload.product;
        state.showProduct = action.payload.product;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addNewProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message =
          'Item gagal di tambahkan, pastikan data yang dimasukan sesuai dengan tipe data, nama item harus unique, gambar bertipe png/jpg, dan ukuran gambar kurang dari 100kb';
      })
      .addCase(editProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = 'Item gagal di edit, pastikan nama item unique';
      })
      .addCase(deleteProduct.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = 'Item gagal dihapus';
      });
  },
});

export default ProductSlide.reducer;
export const ProductAction = ProductSlide.actions;
