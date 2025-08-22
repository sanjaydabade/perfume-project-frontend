import { Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import { listCartShippingMethods } from "@lib/data/fulfillment"
import { listCartPaymentMethods } from "@lib/data/payment"

const CheckoutSummary = async ({ cart }: { cart: any }) => {
  const shippingMethods = await listCartShippingMethods(cart.id).catch(() => null)
  const paymentMethods = await listCartPaymentMethods(cart.region?.id ?? "").catch(() => null)

  return (
    <div className="sticky top-0 flex flex-col-reverse small:flex-col gap-y-8 py-8 small:py-0 ">
      <CartTotals totals={cart} items={cart.items} cart={cart} />

      {shippingMethods?.length ? (
        <div className="cart_page_summary mt-4">
          <h6>Shipping method</h6>
          {shippingMethods.map((sm: any) => (
            <div className="form-check" key={sm.id}>
              <input className="form-check-input" type="radio" disabled />
              <label className="form-check-label">
                {sm.name}: {sm.amount ? (<span>(+) {new Intl.NumberFormat(undefined, { style: "currency", currency: cart.currency_code }).format(sm.amount / 100)}</span>) : (" ")}
              </label>
            </div>
          ))}
        </div>
      ) : null}

      {paymentMethods?.length ? (
        <div className="checkout_payment mt-4">
          <h3>payment method</h3>
          {paymentMethods.map((pm: any) => (
            <div className="form-check" key={pm.id}>
              <input className="form-check-input" type="radio" disabled />
              <label className="form-check-label">
                {pm.id?.replace(/_/g, " ")}
              </label>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default CheckoutSummary
