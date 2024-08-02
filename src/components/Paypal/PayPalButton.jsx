import React from "react"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { set } from "date-fns"

const PaypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
const baseUrl = import.meta.env.VITE_API_URL

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
          return actions.order.capture().then(async (details) => {
            const response = await fetch(`/paypal/success?paymentId=${data.paymentID}&PayerID=${data.payerID}`, {
              method: "GET",
            })
            if (response.ok) {
              onSuccess(details)
            } else {
              onError("Payment verification failed")
            }
          })
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
