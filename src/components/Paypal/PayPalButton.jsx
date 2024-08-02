import React from "react"
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"

const PaypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID
const baseUrl = import.meta.env.VITE_API_URL

const PayPalButton = ({ amount, veicoloIdd, utenteIdd, dataInizio, dataFine, onSuccess, onError }) => {
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
            try {
              console.log("Payment approved, orderID: ", data.orderID)
              console.log("Payment approved, payerID: ", data.payerID)
              const response = await fetch(
                `${baseUrl}/paypal/success?paymentId=${data.orderID}&PayerID=${data.payerID}&veicoloId=${veicoloIdd}&utenteId=${utenteIdd}&dataInizio=${dataInizio}&dataFine=${dataFine}`,
                {
                  method: "GET",
                }
              )
              if (response.ok) {
                console.log("Payment verification successful")
                onSuccess(details)
              } else {
                const errorText = await response.text()
                console.log("Payment verification failed: ", errorText)
                onError("Payment verification failed: " + errorText)
              }
            } catch (error) {
              console.log("Fetch error: ", error.message)
              onError("Fetch error: " + error.message)
            }
          })
        }}
      />
    </PayPalScriptProvider>
  )
}

export default PayPalButton
