"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext<any>(undefined);

export function CartContextWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  let [cartCount, setCartCount] = useState<number>(0);
  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCartContext() {
  return useContext(CartContext);
}
