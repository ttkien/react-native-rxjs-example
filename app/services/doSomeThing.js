const searchText = (text: string, response: (data: Object) => void) => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const random = (Math.random() % 10) * 1000;
  setTimeout(() => {
    response(array.map(value => text + value));
  }, random);
};

export {searchText};
