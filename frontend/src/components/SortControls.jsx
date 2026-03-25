const SortControls = ({ sortField, setSortField, order, setOrder }) => {
  return (
    <div className="sort">
      <select onChange={(e) => setSortField(e.target.value)}>
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="company">Company</option>
      </select>

      <select onChange={(e) => setOrder(e.target.value)}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default SortControls;