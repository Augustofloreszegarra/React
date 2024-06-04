import { useState, useEffect } from "react";
import styles from "./Checkout.module.css";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  colors: string[];
  onsale: boolean;
  quantity: number;
}

interface CheckoutProps {
  product: Product;
}

function Checkout({ product }: CheckoutProps) {
  const [quantity, setQuantity] = useState(1);
  const [button, setButton] = useState(false);

  // Gestionar los datos del localStorage
  useEffect(() => {
    let productsOnCart: Product[] = [];
    const cart = localStorage.getItem("cart");
    if (cart) {
      productsOnCart = JSON.parse(cart);
    }
    const isInCart = productsOnCart.some((each) => each.id === product.id);
    setButton(isInCart);
  }, [product]);

  const manageCart = () => {
    let productsOnCart: Product[] = [];
    const cart = localStorage.getItem("cart");
    if (cart) {
      productsOnCart = JSON.parse(cart);
    }

    const isInCart = productsOnCart.some((each) => each.id === product.id);
    if (!isInCart) {
      productsOnCart.push({ ...product, quantity });
      setButton(true);
    } else {
      productsOnCart = productsOnCart.filter((each) => each.id !== product.id);
      setButton(false);
    }

    localStorage.setItem("cart", JSON.stringify(productsOnCart));
  };

  return (
    <section className={styles["product-checkout-block"]}>
      <div className={styles["checkout-container"]}>
        <span className={styles["checkout-total-label"]}>Total:</span>
        <h2 id="price" className={styles["checkout-total-price"]}>
          $ {(product.price * quantity).toLocaleString()}
        </h2>
        <p className={styles["checkout-description"]}>
          Includes Country tax and AFIP collection
        </p>
        <ul className={styles["checkout-policy-list"]}>
          <li>
            <span className={styles["policy-icon"]}>
              <img src="/truck.png" alt="Truck" />
            </span>
            <span className={styles["policy-desc"]}></span>
          </li>
          <li>
            <span className={styles["policy-icon"]}>
              <img src="/plane.png" alt="Plane" />
            </span>
            <span className={styles["policy-desc"]}>
              Add the product to the cart to know the shipping costs
            </span>
          </li>
        </ul>
        <div className={styles["checkout-process"]}>
          <div className={styles["top"]}>
            <input
              id="input-quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(Number(event?.target.value))}
            />
            <button
              type="button"
              className={button ? styles["remove-btn"] : styles["cart-btn"]}
              onClick={manageCart}
            >
              {button ? "Remove from cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Checkout;