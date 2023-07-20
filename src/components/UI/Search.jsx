import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductAction } from '../../store/ProductSlice';

const Search = () => {
  const [searchItem, setSearchItem] = useState('');
  const [searchFound, setSearchFound] = useState(true);
  const onChangeSearch = (e) => setSearchItem(e.target.value);

  const showProductSelector = useSelector((state) => state.product.product);
  const dispatch = useDispatch();

  useEffect(() => {
    const searchData = () =>
      setTimeout(() => {
        const filterData = showProductSelector.filter((value) =>
          value.namaBarang.includes(searchItem)
        );

        if (searchItem && filterData.length === 0) {
          setSearchFound(false);
        }

        if (filterData.length > 0) {
          setSearchFound(true);
        }

        dispatch(ProductAction.addShowProduct(filterData));
        dispatch(ProductAction.changePage(0));
      }, 500);

    searchData();

    return clearTimeout(searchData);
  }, [searchItem, dispatch, showProductSelector]);

  console.log(!searchFound);

  return (
    <div className="relative">
      <input
        value={searchItem}
        onChange={onChangeSearch}
        type="text"
        className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 placeholder-gray-400 focus:outline-none focus:ring focus:ring-orange-300 focus:border-orange-400"
        placeholder="Search..."
      />
      {!searchFound ? (
        <div className="pt-1 text-center text-red-500 font-bold">
          Data tidak ditemukan
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Search;
