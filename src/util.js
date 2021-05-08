export const url = "https://ecommerce-database.kajolrep.repl.co/products";

export const checkIfProductExistsInList = (list, productId) =>
  list.some(({ id }) => id === productId);

export const formatString = (value) => {
  const str = value;
  return str.length > 45 ? str.substr(0, 45) + "..." : str.substr(0, 45);
};

export const calculateDiscount = (newPrice, oldPrice) => {
  return Math.round(100 - (newPrice / oldPrice) * 100);
};
