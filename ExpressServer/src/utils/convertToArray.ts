const convertToArray = (object: Object) => {
  const array = Object.entries(object).map(([key, value]) => ({ id: key, ...value }));
  return array;
};

export default convertToArray;
