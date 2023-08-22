const SearchBox = ({ handleFilter = () => {}, setSearch, search }) => {
  return (
    <div>
      <label className="form-label">جستجو</label>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (search !== " ") {
            handleFilter({ search });
          }
        }}
      >
        <div className="input-group mb-3">
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            className="form-control"
            placeholder="نام محصول ..."
          />
          <button type="submit" className="input-group-text" id="basic-addon2">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBox;
