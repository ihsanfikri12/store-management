import { createAsyncThunk, nanoid } from '@reduxjs/toolkit';
import supabase from '../supabase/api';

export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (_, { rejectWithValue }) => {
    try {
      let { data: product, error } = await supabase
        .from('product')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        return rejectWithValue(error.message);
      }

      return { product };
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const addNewProduct = createAsyncThunk(
  'product/addNewProduct',
  async (initialProduct, { rejectWithValue }) => {
    try {
      const namaFoto = initialProduct.fotoUrl.name
        .split('.')
        .join(`-${nanoid()}`);

      const { data: fotoUrl, error: errorUpload } = await supabase.storage
        .from('fotoBarang')
        .upload(`foto/${namaFoto}`, initialProduct.fotoUrl);

      if (errorUpload) {
        return rejectWithValue(errorUpload.message);
      }

      const allProduct = { ...initialProduct, fotoUrl: fotoUrl.path };

      let { error } = await supabase.from('product').insert([allProduct]);

      if (error) {
        return rejectWithValue(error.message);
      }

      return 'file saved';
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  'product/editProduct',
  async (initialProduct, { rejectWithValue }) => {
    try {
      let product = initialProduct;

      if (initialProduct.fotoUrl.size) {
        const { data: fotoUrl, error: errorUpload } = await supabase.storage
          .from('fotoBarang')
          .upload(
            `foto/${initialProduct.fotoUrl.name}`,
            initialProduct.fotoUrl
          );

        if (errorUpload) {
          return rejectWithValue(errorUpload.message);
        }

        product = { ...initialProduct, fotoUrl: fotoUrl.path };
      }

      const { data, error } = await supabase
        .from('product')
        .update(product)
        .eq('id', initialProduct.id)
        .select();

      if (error) {
        return rejectWithValue(error.message);
      }

      return initialProduct;
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const { error } = await supabase
        .from('product')
        .delete()
        .eq('id', productId)
        .select();

      if (error) {
        return rejectWithValue(error.message);
      }

      return 'Delete Success';
    } catch (error) {
      throw rejectWithValue(error.message);
    }
  }
);
