import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) =>{
    const priceForStripe = price *100;
    const publishablekey= 'pk_test_51IS7MeE0JEfo9b5HwKuPUbuKS6dcAeA0A3p2usv5MW6TgAmwUnSJtx5HZKL5nElQWTX7ybnBXTGwMaWsBwnRFwII00Az3UbEcO'

    const onToken= token =>{
        alert('Payment Successful');
    }


    return(
        <StripeCheckout
        label= 'Pay Now'
        name= 'DzShop'
        billingAddress
        shippingAddress
        
        description= {`Your total is $${price}`}
        amount ={priceForStripe}
        panelLabel= 'Pay Now'
        token= {onToken}
        stripeKey= {publishablekey}

        />
    );


};


export default StripeCheckoutButton;