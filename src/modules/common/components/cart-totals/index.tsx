















// "use client"

// import { convertToLocale } from "@lib/util/money"
// import React from "react"

// type CartTotalsProps = {
//   totals: {
//     total?: number | null
//     subtotal?: number | null
//     tax_total?: number | null
//     shipping_total?: number | null
//     discount_total?: number | null
//     gift_card_total?: number | null
//     currency_code: string
//     shipping_subtotal?: number | null
//   }
// }

// const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
//   const {
//     currency_code,
//     total,
//     subtotal,
//     tax_total,
//     discount_total,
//     gift_card_total,
//     shipping_subtotal,
//   } = totals

//   return (
  



//      <div className="col-lg-4 col-md-9 wow fadeInRight">
//       <div id="sticky_sidebar">
//         <div className="cart_page_summary">
//           <h3>Billing summary</h3>

          
//           <ul>
//             <li>
//               <a className="img" href="#">
//                 <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100"/>
//               </a>
//               <div className="text">
//                 <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
//                 <p>$59.00 × 2</p>
//                 <p>Color: Red, Size: XL</p>
//               </div>
//             </li>
//           </ul>




//           {/* Cart Totals Section */}
//           <h6>
//             Subtotal 
//             <span>
//               {convertToLocale({ amount: subtotal ?? 0, currency_code })}
//             </span>
//           </h6>

//           <h6>
//             Tax 
//             <span>
//               (+) {convertToLocale({ amount: tax_total ?? 0, currency_code })}
//             </span>
//           </h6>

//           {discount_total ? (
//             <h6>
//               Discount 
//               <span>
//                 (-) {convertToLocale({ amount: discount_total ?? 0, currency_code })}
//               </span>
//             </h6>
//           ) : null}

//           <h4>
//             Total 
//             <span>
//               {convertToLocale({ amount: total ?? 0, currency_code })}
//             </span>
//           </h4>

//           {/* Coupon Section */}
//           <form action="#">
//             <input type="text" placeholder="Coupon code"/>
//             <button type="submit" className="common_btn">Apply</button>
//             <p>
//               Coupon Code: HEM4556JL
//               <a href="#"><i className="fal fa-times"></i></a>
//             </p>
//           </form>
//         </div>

//         {/* Buttons */}
//         <div className="cart_summary_btn">
//           <a className="common_btn continue_shopping" href="shop.html">Continue shopping</a>
//           <a className="common_btn" href="checkout.html">
//             Checkout <i className="fas fa-long-arrow-right"></i>
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartTotals







// "use client"

// import { convertToLocale } from "@lib/util/money"
// import { HttpTypes } from "@medusajs/types"
// import React from "react"

// type CartTotalsProps = {
//   totals: {
//     total?: number | null
//     subtotal?: number | null
//     tax_total?: number | null
//     shipping_total?: number | null
//     discount_total?: number | null
//     gift_card_total?: number | null
//     currency_code: string
//     shipping_subtotal?: number | null
//   }
//   items: HttpTypes.StoreCart["items"]
// }

// const CartTotals: React.FC<CartTotalsProps> = ({ totals, items }) => {
//   if (!totals) return null

//   const {
//     currency_code,
//     total,
//     subtotal,
//     tax_total,
//     discount_total,
//   } = totals

//   return (
//     <div className="col-lg-4 col-md-9 wow fadeInRight">
//       <div id="sticky_sidebar">
//         <div className="cart_page_summary">
//           <h3>Billing summary</h3>

//           {/* Cart Items List */}
//           <ul>
//             {items.map((item) => (
//               <li key={item.id} className="flex gap-3 mb-4">
//                 <a className="img block w-16 h-16" href={`/products/${item.product_handle}`}>
//                   <img
//                     src={item.thumbnail}
//                     alt={item.title}
//                     className="img-fluid w-full h-full object-cover rounded"
//                   />
//                 </a>
//                 <div className="text">
//                   <a
//                     className="title block font-medium"
//                     href={`/products/${item.product_handle}`}
//                   >
//                     {item.title}
//                   </a>
//                   <p>
//                     {convertToLocale({
//                       amount: item.unit_price * item.quantity,
//                       currency_code,
//                     })}{" "}
//                     × {item.quantity}
//                   </p>
//                   {item.variant?.options?.map((opt) => (
//                     <p key={opt.id} className="text-sm text-gray-500">
//                       {opt.option?.title}: {opt.value}
//                     </p>
//                   ))}
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {/* Cart Totals Section */}
//           <h6>
//             Subtotal
//             <span>
//               {convertToLocale({ amount: subtotal ?? 0, currency_code })}
//             </span>
//           </h6>

//           <h6>
//             Tax
//             <span>
//               (+) {convertToLocale({ amount: tax_total ?? 0, currency_code })}
//             </span>
//           </h6>

//           {discount_total ? (
//             <h6>
//               Discount
//               <span>
//                 (-) {convertToLocale({ amount: discount_total ?? 0, currency_code })}
//               </span>
//             </h6>
//           ) : null}

//           <h4>
//             Total
//             <span>
//               {convertToLocale({ amount: total ?? 0, currency_code })}
//             </span>
//           </h4>

//           {/* Coupon Section */}
//           <form action="#" className="mt-4">
//             <input type="text" placeholder="Coupon code" />
//             <button type="submit" className="common_btn">
//               Apply
//             </button>
//             <p>
//               Coupon Code: HEM4556JL
//               <a href="#"><i className="fal fa-times"></i></a>
//             </p>
//           </form>
//         </div>

//         {/* Buttons */}
//         <div className="cart_summary_btn">
//           <a className="common_btn continue_shopping" href="shop.html">Continue shopping</a>
//           <a className="common_btn" href="checkout.html">
//             Checkout <i className="fas fa-long-arrow-right"></i>
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartTotals











"use client"

import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import React from "react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
    shipping_subtotal?: number | null
  }
  items: HttpTypes.StoreCart["items"]
  cart: HttpTypes.StoreCart // ✅ cart prop added (for step logic)
  hideButtons?: boolean // ✅ New prop to hide buttons in checkout
  showPaymentMethods?: boolean // ✅ New prop to show payment methods
  // Payment UI bindings (optional: if not provided, component uses internal state)
  selectedPaymentMethod?: string
  onSelectPaymentMethod?: (method: string) => void
  termsAccepted?: boolean
  onToggleTerms?: (accepted: boolean) => void
  onPlaceOrder?: () => void
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ 
  totals, 
  items, 
  cart, 
  hideButtons = false,
  showPaymentMethods = false,
  selectedPaymentMethod,
  onSelectPaymentMethod,
  termsAccepted,
  onToggleTerms,
  onPlaceOrder,
}) => {
  if (!totals) return null

  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    discount_total,
  } = totals

  const step = getCheckoutStep(cart)

  const safeItems = items ?? []

  // Local fallbacks if parent does not control state
  const [internalSelectedPM, setInternalSelectedPM] = React.useState<string>("")
  const [internalTermsAccepted, setInternalTermsAccepted] = React.useState<boolean>(false)

  const selectedPM = selectedPaymentMethod ?? internalSelectedPM
  const setSelectedPM = onSelectPaymentMethod ?? setInternalSelectedPM
  const terms = termsAccepted ?? internalTermsAccepted
  const setTerms = onToggleTerms ?? setInternalTermsAccepted

  return (
    <div className="col-lg-4 col-md-9 wow fadeInRight">
      <div id="sticky_sidebar">
        <div className="cart_page_summary">
          <h3>Billing summary</h3>

          {/* Cart Items List */}
          <ul>
            {safeItems.map((item) => (
              <li key={item.id} className="flex gap-3 mb-4">
                <a className="img block w-16 h-16" href={`/products/${item.product_handle}`}>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid w-full h-full object-cover rounded"
                  />
                </a>
                <div className="text">
                  <a
                    className="title block font-medium"
                    href={`/products/${item.product_handle}`}
                  >
                    {item.title}
                  </a>
                  <p>
                    {convertToLocale({
                      amount: item.unit_price * item.quantity,
                      currency_code,
                    })}{" "}
                    × {item.quantity}
                  </p>
                  {item.variant?.options?.map((opt) => (
                    <p key={opt.id} className="text-sm text-gray-500">
                      {opt.option?.title}: {opt.value}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>

          {/* Cart Totals Section */}
          <h6>
            Subtotal
            <span>
              {convertToLocale({ amount: subtotal ?? 0, currency_code })}
            </span>
          </h6>

          <h6>
            Tax
            <span>
              (+) {convertToLocale({ amount: tax_total ?? 0, currency_code })}
            </span>
          </h6>

          {discount_total ? (
            <h6>
              Discount
              <span>
                (-) {convertToLocale({ amount: discount_total ?? 0, currency_code })}
              </span>
            </h6>
          ) : null}

          <h4>
            Total
            <span>
              {convertToLocale({ amount: total ?? 0, currency_code })}
            </span>
          </h4>

          {/* Payment Methods Section (Design UI) */}
          {showPaymentMethods && (
            <div className="checkout_payment mt-4">
              <h3>payment method</h3>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="pm_bank_transfer"
                  checked={selectedPM === "bank_transfer"}
                  onChange={() => setSelectedPM("bank_transfer")}
                />
                <label className="form-check-label" htmlFor="pm_bank_transfer">
                  Direct Bank Transfer
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="pm_cheque"
                  checked={selectedPM === "cheque"}
                  onChange={() => setSelectedPM("cheque")}
                />
                <label className="form-check-label" htmlFor="pm_cheque">
                  Cheque Payment
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="pm_cod"
                  checked={selectedPM === "cod"}
                  onChange={() => setSelectedPM("cod")}
                />
                <label className="form-check-label" htmlFor="pm_cod">
                  Cash on Delivery
                </label>
              </div>

              <div className="checkout_card">
                <p>Card Payment</p>
                <ul>
                  <li><img src="/assets/images/payment-1.jpg" alt="Payment" className="img-fluid w-100"/></li>
                  <li className="active"><img src="/assets/images/payment-2.jpg" alt="Payment" className="img-fluid w-100"/></li>
                  <li><img src="/assets/images/payment-3.jpg" alt="Payment" className="img-fluid w-100"/></li>
                  <li><img src="/assets/images/payment-4.jpg" alt="Payment" className="img-fluid w-100"/></li>
                  <li><img src="/assets/images/payment-5.jpg" alt="Payment" className="img-fluid w-100"/></li>
                </ul>
              </div>

              <div className="terms">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="termsCheckInline"
                    checked={!!terms}
                    onChange={(e) => setTerms(e.target.checked)}
                  />
                  <label className="form-check-label" htmlFor="termsCheckInline">
                    I have read and agree to the website.
                  </label>
                </div>
              </div>

              <button
                type="button"
                className="common_btn"
                onClick={() => onPlaceOrder && onPlaceOrder()}
                disabled={!selectedPM || !terms}
              >
                Place order <i className="fas fa-long-arrow-right"></i>
              </button>
            </div>
          )}

          {/* Only show coupon and buttons if hideButtons is false */}
          {!hideButtons && (
            <>
              <form action="#">
                <input type="text" placeholder="Coupon code"/>
                <button type="submit" className="common_btn">Apply</button>
                <p> Coupon Code: HEM4556JL
                  <a href="#"><i className="fal fa-times"></i></a>
                </p>
              </form>

              <div className="cart_summary_btn">
                <a className="common_btn continue_shopping" href="shop.html">Continue shopping</a>

                <LocalizedClientLink href={"/checkout?step=" + (step || 1)}
                  data-testid="checkout-button" className="common_btn">
                  Checkout <i className="fas fa-long-arrow-right"></i>
                </LocalizedClientLink>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default CartTotals
