// Assuming `cart` is an array of objects with `productId` and `quantity`
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51PH8UfP4JzwFSJP8xlogY6N9tAw277s8J8wVL6upCBXQi7ygTXoQ0Klvuz9173hss9yMAAcmW0gqohrEx9hb5PzK00y9cIOr5N'); // Ensure the correct public key


const Checkout = ({ cart }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:1337/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orders: cart.map(item => ({ 
        productId: item.id, quantity: item.quantity, 
      })) 
    }),
    });

    if (!response.ok) {
      console.error('Failed to create session:', response.statusText);
      return;
    }

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId });

    if (result.error) {
      console.error(result.error.message);
    }
  };
  return (
    <button onClick={handleCheckout} className="btn btn-primary">
      Checkout with Stripe
    </button>
  );
};

export default Checkout;
