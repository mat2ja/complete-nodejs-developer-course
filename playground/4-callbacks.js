setTimeout(() => {
  console.log('2seconds are up');
}, 2000);

const geocode = (address, callback) => {
  setTimeout(() => {
    const data = {
      latitude: 0,
      longitude: 0,
    };
    callback(data);
  }, 2000);
};

geocode('Philadelphia', (myarg) => {
  console.log(myarg);
});
