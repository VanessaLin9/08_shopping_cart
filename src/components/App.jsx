import React, { useCallback } from 'react';
import ProductItem from './ProductItem';
import { PRODUCTS } from './config';
import Cart from './Cart';
import Coupons from './Coupons';
import type { LineItem, Product, Coupon } from './types';
import { CartContext } from './CartContext';

const ShoppingCart = () => {
  // TODO 2
  const [totalAmount, setTotalAmount] = React.useState(0);
  /**
   * @type {[LineItem[], Function]}
   */
  const [lineItems, setLineItems] = React.useState([]);
  const [Products, setProducts] = React.useState(PRODUCTS);
  const [coupons, setCoupon] = React.useState(0);

  // TODO 6
  React.useEffect(() => {
    const calcTotalAmount = lineItems.reduce((total, currentItem) => {
      return total + currentItem.price * currentItem.quantity;
    }, 0);
    setTotalAmount(calcTotalAmount);
  }, [lineItems]);

  // TODO 5
  const atUpdateQuantity = useCallback((id: string, newQuantity) => {
    let changeNumber;
    // 增減數量
    setLineItems((prev) => {
      return prev.map((item: LineItem) => {
        if (item.id === id) {
          changeNumber = newQuantity - item.quantity;
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: newQuantity,
            inventory: item.inventory - changeNumber,
          };
        }
        return item;
      });
    });
    // 增減庫存
    setProducts((pre) => {
      return pre.map((item: Product) => {
        if (item.id === id) {
          return {
            id: item.id,
            img: item.img,
            title: item.title,
            price: item.price,
            inventory: item.inventory - changeNumber,
          };
        }
        return item;
      });
    });
  }, []);

  // TODO 5
  const atAddToCart = useCallback(
    (id: string) => {
      const foundItem = lineItems.find((data) => data.id === id);
      if (foundItem) {
        atUpdateQuantity(id);
      } else {
        // 新增
        const foundProduct = Products.find((data) => data.id === id);

        const lineItem = {
          id,
          price: foundProduct.price,
          title: foundProduct.title,
          quantity: 1,
          inventory: foundProduct.inventory - 1,
        };
        setLineItems((prev) => prev.concat(lineItem));
        setProducts((pre) => {
          return pre.map((item: Product) => {
            if (item.id === id) {
              return {
                id: item.id,
                img: item.img,
                title: item.title,
                price: item.price,
                inventory: item.inventory - 1,
              };
            }
            return item;
          });
        });
      }
    },
    [atUpdateQuantity, lineItems],
  );

  // TODO
  const onRemoveItem = useCallback((id: string) => {
    const foundProduct = PRODUCTS.find((data) => data.id === id);
    setLineItems((prev) => prev.filter((item) => item.id !== id));
    setProducts((prev) =>
      prev.map((item: Product) => {
        if (item.id === id) {
          return {
            id: item.id,
            img: item.img,
            title: item.title,
            price: item.price,
            inventory: foundProduct.inventory,
          };
        }
        return item;
      }),
    );
  }, []);

  // TODO
  const onRemoveCart = useCallback(() => {
    setLineItems([]);
    setProducts(PRODUCTS);
  }, []);

  // FIXME 請實作 coupon

  const atApplyCoupon = useCallback((coupon: Coupon) => {
    console.log('coupon', coupon);
    setCoupon(coupon.discount);
  }, []);

  const provideValue = { totalAmount, lineItems, coupons };
  return (
    <CartContext.Provider value={provideValue}>
      <div className="container">
        <div className="row">
          {/* TODO 4 */}
          {Products.map((product) => {
            return (
              <div className="col-3" key={product.id}>
                <ProductItem
                  id={product.id}
                  img={product.img}
                  title={product.title}
                  price={product.price}
                  inventory={product.inventory}
                  // TODO 5
                  onAddToCart={atAddToCart}
                />
              </div>
            );
          })}
        </div>
        <Cart
          // totalAmount={totalAmount}
          // lineItems={lineItems}
          onRemoveCart={onRemoveCart}
          onUpdateQuantity={atUpdateQuantity}
          onRemoveItem={onRemoveItem}
        />
        {/* FIXME 請實作 coupon 功能 */}
        <Coupons onApplyCoupon={atApplyCoupon} />}
      </div>
    </CartContext.Provider>
  );
};

export default ShoppingCart;
