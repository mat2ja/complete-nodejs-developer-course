// i already know this

const product = {
  label: 'macbook pro',
  price: '1299',
  stock: '301',
  salePrice: undefined,
};

const { label: productLabel, stock, windowsVersion, salePrice = 5 } = product;
// console.log(productLabel);
// console.log(stock);
// console.log(windowsVersion); // prints undefined if not found
// console.log(salePrice); // default value if prop not found or undefined (not found returns undefined)

const transaction = (type, { label, price }) => {
  console.log(`${type} >> ${label} costs $${price}`);
};

transaction('order', product);
