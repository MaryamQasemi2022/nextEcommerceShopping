const Pagination = ({ link, handleFilter = () => {} }) => {
  return (
    <li className={link.active ? "page-item active" : "page-item "}>
      <button
        className="page-link"
        onClick={() => handleFilter({ page: link.label })}
      >
        {link.label}
      </button>
    </li>
  );
};

export default Pagination;
