function FilterForm({className, newSearchFilter, handleSearchFilter}) {
    return (
        <form className={className}>
          filter show with <input className={`${className}Input`} type="text" value={newSearchFilter} onChange={handleSearchFilter} />
        </form>
    );
}

export default FilterForm