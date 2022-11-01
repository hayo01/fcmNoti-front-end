/* ------------------------------------------------------- */
/*
1. 새로 들어온 rdsData를 buyList/ sellList 안에 있는 값들과 비교하여 정렬
2. 새 rdsData가 추가/수정 된 List를 set해서 return
*/
export const sortList = (list, newdata, mode) => {
  if (newdata.length === 0) return;

  let newData = newdata[0];
  let result = findOrderPosition(list, newData, mode);

  if (result.mode === "I") list.current.splice(result.index, 0, newData);
  else assignOrder(result.index, list, newData);
};

const findOrderPosition = (sourceOrder, newOrder, mode) => {
  // console.log(newOrder);
  let result = {
    index: 0,
    mode: "I",
  };

  let exact = sourceOrder.current.findIndex(
    element => Number(element.price) === Number(newOrder.price)
  );

  if (exact >= 0) {
    result.index = exact;
    result.mode = "U";
    return result;
  }
  let pos;
  if (mode === "A") {
    pos = sourceOrder.current.findIndex(
      element => Number(element.price) < Number(newOrder.price)
    );
  } else if (mode === "D") {
    pos = sourceOrder.current.findIndex(
      element => Number(element.price) > Number(newOrder.price)
    );
  }

  result.index = pos;
  result.mode = "I";

  return result;
};

const assignOrder = (i, sourceOrder, newOrder) => {
  sourceOrder.current[i].amount =
    Number(sourceOrder.current[i]?.amount) + Number(newOrder.amount);

  if (Number(sourceOrder.current[i].amount) <= 0) {
    sourceOrder.current.splice(i, 1);
  }
};
