import { useDispatch, useSelector } from 'react-redux';
import { ProductAction } from '../../store/ProductSlice';

const Pagination = () => {
  const dispatch = useDispatch();

  const countSelector = useSelector(
    (state) => state.product.showProduct.length
  );
  const pageSelector = useSelector((state) => state.product.page);
  const totalPage = Math.ceil(countSelector / 6);

  const changePage = (nextPage) => {
    if (nextPage < 0 || nextPage > totalPage - 1) return;

    dispatch(ProductAction.changePage(nextPage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (page) =>
    +pageSelector === +page ? 'border-orange-500' : 'border-gray-300';

  const renderList = () => {
    const list = [];
    let i = 0;

    while (i < totalPage) {
      list.push(
        <li key={i}>
          <button
            onClick={changePage.bind(null, i)}
            className={`bg-white text-orange-500 px-4 py-2 rounded-md border-b-4  hover:border-orange-500 ${isActive(
              i
            )}`}
          >
            {i}
          </button>
        </li>
      );

      i++;
    }

    return list;
  };

  return (
    <nav>
      <ul className="flex items-center space-x-2 gap-3">
        <li>
          <button
            onClick={changePage.bind(null, pageSelector + -1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Previous
          </button>
        </li>
        {renderList()}
        <li>
          <button
            onClick={changePage.bind(null, pageSelector + 1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
