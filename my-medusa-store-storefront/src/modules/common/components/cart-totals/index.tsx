















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
import { Button } from "@medusajs/ui"
import Link from "next/link"

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

const CartTotals: React.FC<CartTotalsProps> = ({ totals, items, cart }) => {
  if (!totals) return null

  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    discount_total,
  } = totals

  const step = getCheckoutStep(cart)

  return (
    <div className="col-lg-4 col-md-9 wow fadeInRight">
      <div id="sticky_sidebar">
        <div className="cart_page_summary">
          <h3>Billing summary</h3>

          {/* Cart Items List */}
          <ul>
            {items.map((item) => (
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


            <form action="#">
            <input type="text" placeholder="Coupon code"/>
              <button type="submit" className="common_btn">Apply</button>
                    <p> Coupon Code: HEM4556JL
                <a href="#"><i className="fal fa-times"></i></a>
                  </p>
                </form>
        </div>


       
         

       
       <div className="cart_summary_btn">
                            <a className="common_btn continue_shopping" href="shop.html">Contiue shopping</a>

      <Link  href={"/checkout?step=" + (step || 1)}
        data-testid="checkout-button" className="common_btn">
        Checkout <i className="fas fa-long-arrow-right"></i>
      </Link>
    </div>
      </div>
    </div>
  )
}

export default CartTotals
