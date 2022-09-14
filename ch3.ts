import { cart, Item } from "./cart";

const stockItem = (item: Item): string => {
  let saleText = item.discountPrice ? `${item.discountPrice}원 할인` : "";
  const discountPrice = item.discountPrice || 0;

  return `<li>
       <h2>${item.name}</h2>
      <div>가격: ${item.price - discountPrice} ${saleText} </div>
      <div>수량: ${item.quantity}</div>
        </li>`;
};

const outOfStockItem = (item: Item): string => {
  let saleText = item.discountPrice ? `${item.discountPrice}원 할인` : "";
  const discountPrice = item.discountPrice || 0;
  return `<li class='gray'>
  <h2 >${item.name} (품절) </h2>
  <div class='strike'>가격: ${
    item.price - discountPrice
  } ${saleText}  (xx원 할인) </div>
  <div class='strike'>수량: ${item.quantity}</div>
</li>`;
};

const eachItem = (item: Item): string => {
  if (item.outOfStock) {
    return outOfStockItem(item);
  } else {
    return stockItem(item);
  }
};

const totalCalculator = (
  list: Array<Item>,
  getValue: (item: Item) => number
): number => {
  const value = list
    .filter((item) => !item.outOfStock)
    .map(getValue)
    .reduce((pre, acc) => pre + acc, 0);
  return value;
};

const totalCount = (list: Array<Item>): string => {
  const totalCount = totalCalculator(list, (item) => item.quantity);
  return `<h2>전체 수량: ${totalCount}</h2>`;
};

const totalPrice = (list: Array<Item>): string => {
  const totalPrice = totalCalculator(
    list,
    (item) => item.quantity * item.price
  );

  const totalDiscount = totalCalculator(list, (item) => {
    const discountPrice = item.discountPrice || 0;
    return discountPrice * item.quantity;
  });

  return `<h2>전체 수량: ${
    totalPrice - totalDiscount
  } (총 ${totalDiscount}원 할인)</h2>`;
};

const list = (list: Array<Item>): string => {
  return `<ul> ${list
    .map(eachItem)
    .reduce((tags, tag) => tags + tag, "")}</ul>`;
};

const app = document.getElementById("app");
if (app !== null) {
  app.innerHTML = `
  <h1>장바구니</h1>
  ${list(cart)}
  ${totalCount(cart)}
  ${totalPrice(cart)}`;
}
