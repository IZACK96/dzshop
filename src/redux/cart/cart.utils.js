

export const addItemToCart = (cartItems, cartItemToAdd) =>{

    const existingCartItems = cartItems.find(
        cartItem =>cartItem.id === cartItemToAdd.id

    );
    if(existingCartItems){
        return cartItems.map(cartItem =>
            cartItem.id === cartItemToAdd.id ?
            {...cartItem, quantity: cartItem.quantity + 1}
            :cartItem
            
            )
    }
    return [...cartItems, {...cartItemToAdd, quantity: 1}]
};



export const removeItemFromCart = (CartItems, CartItemToRemove) =>{
    const existingCartItem = CartItems.find(
        CartItem => CartItem.id === CartItemToRemove.id
    )

    if(existingCartItem.quantity === 1){
        return CartItems.filter(CartItem => CartItem.id !== CartItemToRemove.id)

    }
    return CartItems.map(cartItem =>
        cartItem.id === CartItemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1}
        :cartItem);
};
