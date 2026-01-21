declare module "react-native-razorpay" {
  export type RazorpaySuccessData = {
    razorpay_payment_id: string;
    razorpay_order_id?: string;
    razorpay_signature?: string;
  };

  export type RazorpayError = {
    code: number;
    description: string;
  };

  export type RazorpayOptions = {
    key: string;
    amount: number;
    currency?: string;
    name?: string;
    description?: string;
    image?: string;
    order_id?: string;
    prefill?: {
      email?: string;
      contact?: string;
      name?: string;
    };
    theme?: { color?: string };
    notes?: Record<string, string>;
  };

  const RazorpayCheckout: {
    open: (options: RazorpayOptions) => Promise<RazorpaySuccessData>;
  };

  export default RazorpayCheckout;
}
