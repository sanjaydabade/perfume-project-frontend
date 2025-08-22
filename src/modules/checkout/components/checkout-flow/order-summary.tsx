"use client"

import { Cart } from "@medusajs/medusa"
import { formatAmount } from "@lib/util/prices"

interface OrderSummaryProps {
  cart: Cart
}

export default function OrderSummary({ cart }: OrderSummaryProps) {
  const subtotal = cart.subtotal || 0
  const tax = cart.tax_total || 0
  const shipping = cart.shipping_total || 0
  const discount = cart.discount_total || 0
  const total = cart.total || 0

  return (
    <div className="cart_page_summary">
      <h3>Billing summary</h3>

      {/* Vendor Section */}
      <a className="vendor_name" href="vendor_details.html">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
          stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
        </svg>
        Medusa Store
      </a>

      {/* Cart Items */}
      <ul>
        {cart.items?.map((item) => (
          <li key={item.id}>
            <a className="img" href="shop_details.html">
              <img src={item.variant?.product?.thumbnail || "/placeholder-product.jpg"} alt={item.title} className="img-fluid w-100"/>
            </a>
            <div className="text">
              <a className="title" href="shop_details.html">{item.title}</a>
              <p>{formatAmount({
                amount: item.unit_price,
                region: cart.region,
                includeTaxes: false
              })} × {item.quantity}</p>
              {item.variant && (
                <p>
                  {Object.entries(item.variant.options || {}).map(([key, value]) => (
                    `${key}: ${value}`
                  )).join(", ")}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Price Breakdown */}
      <div className="price_breakdown">
        <div className="price_row">
          <span>Subtotal:</span>
          <span>
            {formatAmount({
              amount: subtotal,
              region: cart.region,
              includeTaxes: false
            })}
          </span>
        </div>

        {shipping > 0 && (
          <div className="price_row">
            <span>Shipping:</span>
            <span>
              {formatAmount({
                amount: shipping,
                region: cart.region,
                includeTaxes: false
              })}
            </span>
          </div>
        )}

        {tax > 0 && (
          <div className="price_row">
            <span>Tax:</span>
            <span>
              {formatAmount({
                amount: tax,
                region: cart.region,
                includeTaxes: false
              })}
            </span>
          </div>
        )}

        {discount > 0 && (
          <div className="price_row discount">
            <span>Discount:</span>
            <span>
              -{formatAmount({
                amount: discount,
                region: cart.region,
                includeTaxes: false
              })}
            </span>
          </div>
        )}

        <div className="price_row total">
          <span><strong>Total:</strong></span>
          <span>
            <strong>
              {formatAmount({
                amount: total,
                region: cart.region,
                includeTaxes: true
              })}
            </strong>
          </span>
        </div>
      </div>

      {/* Shipping Methods */}
      {cart.shipping_methods && cart.shipping_methods.length > 0 && (
        <div className="shipping_info">
          <h6>Shipping Method:</h6>
          {cart.shipping_methods.map((method) => (
            <div key={method.id} className="shipping_method">
              <span>{method.shipping_option?.name}</span>
              <span>
                {formatAmount({
                  amount: method.price,
                  region: cart.region,
                  includeTaxes: false
                })}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Promo Code */}
      <div className="promo_section">
        <div className="promo_input">
          <input 
            type="text" 
            placeholder="Promo code"
            className="form-control"
          />
          <button type="button" className="btn btn-outline-primary">
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
