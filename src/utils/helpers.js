export function sortData(data, sort) {
  // Two types of sort: (A-Z) and (Z-A).
  const sortedData = data.sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  return sortedData;
}

export function filterData(data, filter) {
  const filteredData = data.filter(pokemon => pokemon.name.includes(filter));
  return filteredData;
}