/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import CartLineItem from './CartLineItem';
import type { LineItem } from '../types';
import { useCartContext } from '../CartContext';

// TODO 7
type CartProps = {
  // totalAmount: number,
  // lineItems: LineItem[],
  onUpdateQuantity: (id: string) => void,
  onRemoveItem: (id: string) => void,
  onRemoveCart: () => void,
};

const Cart: React.FC<CartProps> = (props) => {
  const { onUpdateQuantity, onRemoveItem, onRemoveCart } = props;
  const { totalAmount, lineItems, discount } = useCartContext();
  // 購物車顯示金額與 coupons 設定
  let showDiscount = '未使用';
  let showTotalAmount = 0;
  if (totalAmount !== 0) {
    showTotalAmount = totalAmount;
    if (discount !== 'unUsed') {
      showDiscount = -discount.discount;
      showTotalAmount = totalAmount - discount.discount;
    }
  } else if (discount !== 'unUsed') {
    showDiscount = '未有符合套用折價券的商品';
  }

  return (
    <section data-name="Cart">
      <h2>購物車</h2>
      <div className="row">
        <div className="col-2">項目</div>
        <div className="col-3">數量</div>
        <div className="col-2">單價</div>
        <div className="col-3">小計</div>
      </div>
      {lineItems.map((data) => {
        return (
          <CartLineItem
            key={data.id}
            id={data.id}
            title={data.title}
            price={data.price}
            quantity={data.quantity}
            inventory={data.inventory}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
          />
        );
      })}
      <div className="text-end">coupon:{showDiscount}</div>
      <div className="text-end">totalAmount:{showTotalAmount}</div>
      <button
        disabled={totalAmount === 0}
        className="btn btn-success"
        onClick={onRemoveCart}
      >
        清空購物車
      </button>
    </section>
  );
};

export default Cart;
