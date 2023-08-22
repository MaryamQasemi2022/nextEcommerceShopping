const ProductsCategorization = ({ categories, handleFilter, categoryId }) => {
  return (
    <div className="filter-list">
      <div className="form-label">دسته بندی</div>
      <ul>
        <li
          className={
            !categoryId
              ? "my-2 cursor-pointer filter-list-active"
              : "my-2 cursor-pointer"
          }
          onClick={() => handleFilter({ category: null })}
        >
          همه ی محصولات
        </li>
        {categories &&
          categories.map((category, index) => (
            <li
              key={index}
              className={
                categoryId && categoryId.toString() === category.id.toString()
                  ? "my-2 cursor-pointer filter-list-active"
                  : "my-2 cursor-pointer"
              }
              onClick={() => handleFilter({ category: category.id })}
            >
              {category.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductsCategorization;
