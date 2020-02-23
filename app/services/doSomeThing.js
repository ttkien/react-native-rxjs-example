import {type Cancellable, networkCall} from '../utils/networkCall';

const searchText = (
  text: string,
  response: (data: Object) => void,
): Cancellable => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return networkCall(
    'searchText' + text,
    array.map(value => text + value),
    response,
  );
};

export {searchText};
