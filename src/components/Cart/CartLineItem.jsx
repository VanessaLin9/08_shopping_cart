import React from 'react';

// TODO 7
type BuildItemProps = {
  id: string,
  title: string,
  quantity: number,
  inventory: number,
  price: number,
  onRemoveItem: (id: string) => void,
  onUpdateQuantity: (id: string) => void,
};

const BuildItem: React.FC<BuildItemProps> = (props) => {
  // prettier-ignore
  const {
    title,
    quantity,
    price,
    id,
    inventory,
    onRemoveItem,
    onUpdateQuantity,
  } = props;

  // 小計
  const lineItemPrice = price * quantity;
  // TODO 完售判斷
  let soldOut = false;
  if (inventory === 0) {
    soldOut = true;
  }
  // TODO 減少||移除判斷
  const reduceBtn = <button onClick={() => onUpdateQuantity(id, quantity - 1)}>-</button>;
  const removeBtn = (
    <button
      onClick={() => {
        onRemoveItem(id);
      }}
    >
      -
    </button>
  );
  let minusBtn = reduceBtn;
  if (quantity === 1) {
    minusBtn = removeBtn;
  }
  return (
    <section className="row" data-name="CartLineItem" data-gradient>
      <div className="col-2">{title}</div>
      <div className="col-3">
        {/* FIXME：這裡有 bug，怎麼修好他呢? */}
        {minusBtn}
        <span className="px-1">{quantity}</span>
        <button disabled={soldOut} onClick={() => onUpdateQuantity(id, quantity + 1)}>
          +
        </button>
      </div>

      <div className="col-2">{price}</div>
      <div className="col-3">{lineItemPrice}</div>
      <div className="col-2">
        <button className="btn btn-danger w-100" onClick={() => onRemoveItem(id)}>
          Remove
        </button>
      </div>
    </section>
  );
};

export default React.memo(BuildItem);
