export function Search(arr, id) {
  return arr.find(item => item.id === id) || null;
}

export default Search;
