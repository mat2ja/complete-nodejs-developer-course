function square1(x) {
  return x * x;
}

const square2 = function (x) {
  return x * x;
};

const square3 = (x) => {
  return x * x;
};

const square4 = (x) => x * x;

const myEvent = {
  name: 'Birthday party',
  guestList: ['Marian', 'Laura', 'Lorena', 'Patrik'],
  // printGuestList: function () {
  //   console.log(`Guest list for ${this.name}`);
  // },
  // printGuestList: () => {
  //   console.log(`Guest list for ${this.name}`);
  // },
  printGuestList() {
    console.log(`Guest list for ${this.name}`);
    this.guestList.forEach((guest) => {
      console.log(`- ${guest} is comin' to the ${this.name}`);
    });
  },
};

myEvent.printGuestList();
