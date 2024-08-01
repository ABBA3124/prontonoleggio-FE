import React from "react"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { set } from "date-fns"

const PaypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID

const PayPalButton = ({ amount, onSuccess, onError }) => {
  return (
    <PayPalScriptProvider
      options={{
        "client-id": PaypalClientId,
        currency: "EUR",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          })
        }}
        onApprove={async (data, actions) => {
          return actions.order.capture().then((details) => {
            onSuccess(details)
          })
        }}
        onError={(err) => {
          onError(err)
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
