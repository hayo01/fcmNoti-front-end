export const Utils = {
  jsonToArray: param => {
    console.log("유틸유틸");
    console.log(param);
    return Object.values(param);
  },
  isEmpty: param => {
    return Object.keys(param).length === 0;
  },
};
