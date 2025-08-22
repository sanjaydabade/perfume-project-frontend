// import repeat from "@lib/util/repeat"
// import { HttpTypes } from "@medusajs/types"
// import { Heading, Table } from "@medusajs/ui"

// import Item from "@modules/cart/components/item"
// import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"
// import LineItemPrice from "@modules/common/components/line-item-price"
// import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"


// type ItemsTemplateProps = {
//   cart?: HttpTypes.StoreCart
// }

// const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
//   const items = cart?.items || []
//   const currencyCode = cart?.currency_code || "inr"



//   const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
//   const [items, setItems] = useState(cart?.items || [])
//   const currencyCode = cart?.currency_code || "USD"



//     const changeQuantity = async (lineId: string, newQty: number) => {
//     if (newQty < 1) return
//     try {
//       await updateLineItem({ lineId, quantity: newQty })
//       setItems((prev) =>
//         prev.map((i) => (i.id === lineId ? { ...i, quantity: newQty } : i))
//       )
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   const removeItem = async (lineId: string) => {
//     try {
//       await deleteLineItem(lineId)
//       setItems((prev) => prev.filter((i) => i.id !== lineId))
//     } catch (err) {
//       console.error(err)
//     }
//   }

 
//   return (
  
//     <>

//     <section className="cart_page mt_100 mb_100">
//         <div className="container">
//             <div className="row">
//                 <div className="col-lg-8 wow fadeInUp">
//                     <div className="cart_table_area">
//                         <div className="table-responsive">
//                             <table className="table">
//                                 <thead>
//                                     <tr>
//                                         <th className="cart_page_checkbox">
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value=""
//                                                     id="flexCheckDefault"/>
//                                             </div>
//                                         </th>
//                                         <th className="cart_page_img">Product image </th>
//                                         <th className="cart_page_details">Product Details</th>
//                                         <th className="cart_page_price">Unit Price</th>
//                                         <th className="cart_page_quantity">Quantity</th>
//                                         <th className="cart_page_total">Subtotal</th>
//                                         <th className="cart_page_action">action</th>
//                                     </tr>
//                                 </thead>
//                             </table>
//                         </div>
//                         <div className="table-responsive">
//                             <table className="table">
//                                 <tr>
//                                     <td>
//                                         <h4 className="cart_vendor_name">
//                                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                                                 stroke-width="1.5" stroke="currentColor" className="size-6">
//                                                 <path stroke-linecap="round" stroke-linejoin="round"
//                                                     d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
//                                             </svg>
//                                             Zapier Gallery
//                                         </h4>
//                                     </td>
//                                 </tr>
//                             </table>
//                         </div>
                      



// <div className="table-responsive">
//       <table className="table">
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.id}>
//               {/* Checkbox */}
//               <td className="cart_page_checkbox">
//                 <div className="form-check">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     value={item.id}
//                   />
//                 </div>
//               </td>

//               {/* Product Image */}
//               <td className="cart_page_img">
//                 <div className="img">
//                   <img
//                     src={item.thumbnail}
//                     alt={item.product_title}
//                     className="img-fluid w-100"
//                   />
//                 </div>
//               </td>

//               {/* Product Details */}
//               <td className="cart_page_details">
//                 <a className="title" href={`/products/${item.product_handle}`}>
//                   {item.product_title}
//                 </a>
//                 {item.variant?.options?.map((opt) => (
//                   <span key={opt.id}>
//                     <b>{opt.option?.title}:</b> {opt.value}
//                   </span>
//                 ))}
//               </td>

//               {/* Unit Price */}
//               <td className="cart_page_price">
//                 <h3>
//                   <LineItemUnitPrice item={item} currencyCode={currencyCode} />
//                 </h3>
//               </td>

//               {/* Quantity */}
//               <td className="cart_page_quantity">
//                 <div className="details_qty_input">
//                   <button
//                     className="minus"
//                     onClick={() => changeQuantity(item.id, item.quantity - 1)}
//                   >
//                     <i className="fal fa-minus" aria-hidden="true"></i>
//                   </button>
//                   <input
//                     type="text"
//                     value={item.quantity}
//                     readOnly
//                   />
//                   <button
//                     className="plus"
//                     onClick={() => changeQuantity(item.id, item.quantity + 1)}
//                   >
//                     <i className="fal fa-plus" aria-hidden="true"></i>
//                   </button>
//                 </div>
//               </td>

//               {/* Total Price */}
//               <td className="cart_page_total">
//                 <h3>
//                   <LineItemPrice item={item} currencyCode={currencyCode} />
//                 </h3>
//               </td>

//               {/* Remove */}
//               <td className="cart_page_action">
//                 <a
//                   href="#"
//                   onClick={(e) => {
//                     e.preventDefault()
//                     removeItem(item.id)
//                   }}
//                 >
//                   <i className="fal fa-times"></i> Remove
//                 </a>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>





                       

//                     </div>
//                 </div>
               
//             </div>
//         </div>
//     </section>
//     </>
//   )
// }

// export default ItemsTemplate


















// "use client"

// import { useState } from "react"
// import { HttpTypes } from "@medusajs/types"
// import LineItemPrice from "@modules/common/components/line-item-price"
// import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
// import { updateLineItem, deleteLineItem } from "@lib/data/cart"
// import CartTotals from "@modules/common/components/cart-totals"




// type ItemsTemplateProps = {
//   cart?: HttpTypes.StoreCart
// }

// const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
//   const [items, setItems] = useState(cart?.items || [])
//   const currencyCode = cart?.currency_code || "inr"

//   // Quantity बदलण्याची function
//   const changeQuantity = async (lineId: string, newQty: number) => {
//     if (newQty < 1) return
//     try {
//       await updateLineItem({ lineId, quantity: newQty })
//       setItems((prev) =>
//         prev.map((i) => (i.id === lineId ? { ...i, quantity: newQty } : i))
//       )
//     } catch (err) {
//       console.error(err)
//     }
//   }

//   // Item remove करण्याची function
//   const removeItem = async (lineId: string) => {
//     try {
//       await deleteLineItem(lineId)
//       setItems((prev) => prev.filter((i) => i.id !== lineId))
//     } catch (err) {
//       console.error(err)
//     }
//   }


//    const totalsData = {
//     subtotal: 2000,
//     discount_total: 200,
//     shipping_total: 100,
//     tax_total: 50,
//     gift_card_total: 0,
//     total: 1950,
//   }

//   return (
//     <section className="cart_page mt_100 mb_100">
//       <div className="container">
//         <div className="row">
//           <div className="col-lg-8 wow fadeInUp">
//             <div className="cart_table_area">

//               {/* Cart Table Header */}
//               <div className="table-responsive">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th className="cart_page_checkbox"></th>
//                       <th className="cart_page_img">Product image</th>
//                       <th className="cart_page_details">Product Details</th>
//                       <th className="cart_page_price">Unit Price</th>
//                       <th className="cart_page_quantity">Quantity</th>
//                       <th className="cart_page_total">Subtotal</th>
//                       <th className="cart_page_action">Action</th>
//                     </tr>
//                   </thead>
//                 </table>
//               </div>

//               {/* Cart Items */}
//               <div className="table-responsive">
//                 <table className="table">
//                   <tbody>
//                     {items.map((item) => (
//                       <tr key={item.id}>
//                         {/* Checkbox */}
//                         <td className="cart_page_checkbox">
//                           <div className="form-check">
//                             <input
//                               className="form-check-input"
//                               type="checkbox"
//                               value={item.id}
//                             />
//                           </div>
//                         </td>

//                         {/* Product Image */}
//                         <td className="cart_page_img">
//                           <div className="img">
//                             <img
//                               src={item.thumbnail}
//                               alt={item.product_title}
//                               className="img-fluid w-100"
//                             />
//                           </div>
//                         </td>

//                         {/* Product Details */}
//                         <td className="cart_page_details">
//                           <a
//                             className="title"
//                             href={`/products/${item.product_handle}`}
//                           >
//                             {item.product_title}
//                           </a>
//                           {item.variant?.options?.map((opt) => (
//                             <span key={opt.id}>
//                               <b>{opt.option?.title}:</b> {opt.value}
//                             </span>
//                           ))}
//                         </td>

//                         {/* Unit Price */}
//                         {/* <td className="cart_page_price">
//                           <h3>
//                             <LineItemUnitPrice
//                               item={item}
//                               currencyCode={currencyCode}
//                             />
//                           </h3>
//                         </td> */}


//                         {/* Unit Price (Fixed) */}
// <td className="cart_page_price">
//   <h3>
//     {(item.unit_price / 100).toFixed(2)} {currencyCode.toUpperCase()}
//   </h3>
// </td>


//                         {/* Quantity Controls */}
//                         <td className="cart_page_quantity">
//                           <div className="details_qty_input">
//                             <button
//                               className="minus"
//                               onClick={() =>
//                                 changeQuantity(item.id, item.quantity - 1)
//                               }
//                             >
//                               <i className="fal fa-minus" aria-hidden="true"></i>
//                             </button>
//                             <input
//                               type="text"
//                               value={item.quantity}
//                               readOnly
//                             />
//                             <button
//                               className="plus"
//                               onClick={() =>
//                                 changeQuantity(item.id, item.quantity + 1)
//                               }
//                             >
//                               <i className="fal fa-plus" aria-hidden="true"></i>
//                             </button>
//                           </div>
//                         </td>

//                         {/* Total Price */}
//                         <td className="cart_page_total">
//                           <h3>
//                             <LineItemPrice
//                               item={item}
//                               currencyCode={currencyCode}
//                             />
//                           </h3>
//                         </td>

//                         {/* Remove */}
//                         <td className="cart_page_action">
//                           <a
//                             href="#"
//                             onClick={(e) => {
//                               e.preventDefault()
//                               removeItem(item.id)
//                             }}
//                           >
//                             <i className="fal fa-times"></i> Remove
//                           </a>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>



        
              

//             </div>
//           </div>

//  <div className="col-lg-4 col-md-9 wow fadeInRight">
//       <div id="sticky_sidebar">
//         <div className="cart_page_summary">
//           <h3>Billing summaryyyyy</h3>

//           {/* Products list dynamically येणार असेल तर इथे loop मारू शकतो */}
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
                

           
//         </div>
//       </div>
//     </section>
//   )
// }

// export default ItemsTemplate






"use client"

import { useState } from "react"
import { HttpTypes } from "@medusajs/types"
import LineItemPrice from "@modules/common/components/line-item-price"
import { updateLineItem, deleteLineItem } from "@lib/data/cart"
import CartTotals from "@modules/common/components/cart-totals"

type ItemsTemplateProps = {
  cart?: HttpTypes.StoreCart
}

const ItemsTemplate = ({ cart }: ItemsTemplateProps) => {
  const [items, setItems] = useState(cart?.items || [])
  const currencyCode = cart?.currency_code || "inr"

  // Quantity बदलण्याची function
  const changeQuantity = async (lineId: string, newQty: number) => {
    if (newQty < 1) return
    try {
      await updateLineItem({ lineId, quantity: newQty })
      setItems((prev) =>
        prev.map((i) => (i.id === lineId ? { ...i, quantity: newQty } : i))
      )
    } catch (err) {
      console.error(err)
    }
  }

  // Item remove करण्याची function
  const removeItem = async (lineId: string) => {
    try {
      await deleteLineItem(lineId)
      setItems((prev) => prev.filter((i) => i.id !== lineId))
    } catch (err) {
      console.error(err)
    }
  }

  // Cart Totals (backend कडून आलं पाहिजे, इथे demo values दिलेत)
  const totalsData = {
    subtotal: cart?.subtotal || 0,
    discount_total: cart?.discount_total || 0,
    shipping_total: cart?.shipping_total || 0,
    tax_total: cart?.tax_total || 0,
    gift_card_total: cart?.gift_card_total || 0,
    total: cart?.total || 0,
    shipping_subtotal: cart?.shipping_subtotal || 0,
    currency_code: currencyCode,
  }

  return (
    <section className="cart_page mt_100 mb_100">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 wow fadeInUp">
            <div className="cart_table_area">

              {/* Cart Table Header */}
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="cart_page_checkbox"></th>
                      <th className="cart_page_img">Product image</th>
                      <th className="cart_page_details">Product Details</th>
                      <th className="cart_page_price">Unit Price</th>
                      <th className="cart_page_quantity">Quantity</th>
                      <th className="cart_page_total">Subtotal</th>
                      <th className="cart_page_action">Action</th>
                    </tr>
                  </thead>
                </table>
              </div>

              {/* Cart Items */}
              <div className="table-responsive">
                <table className="table">
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.id}>
                        {/* Checkbox */}
                        <td className="cart_page_checkbox">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value={item.id}
                            />
                          </div>
                        </td>

                        {/* Product Image */}
                        <td className="cart_page_img">
                          <div className="img">
                            <img
                              src={item.thumbnail}
                              alt={item.product_title}
                              className="img-fluid w-100"
                            />
                          </div>
                        </td>

                        {/* Product Details */}
                        <td className="cart_page_details">
                          <a
                            className="title"
                            href={`/products/${item.product_handle}`}
                          >
                            {item.product_title}
                          </a>
                          {item.variant?.options?.map((opt) => (
                            <span key={opt.id}>
                              <b>{opt.option?.title}:</b> {opt.value}
                            </span>
                          ))}
                        </td>

                        {/* Unit Price */}
                        {/* <td className="cart_page_price">
                          <h3>
                            <LineItemUnitPrice
                              item={item}
                              currencyCode={currencyCode}
                            />
                          </h3>
                        </td> */}


                        {/* Unit Price (Fixed) */}
                <td className="cart_page_price">
                  <h3>
                    ₹{item.unit_price.toFixed(2)}
                  </h3>
                </td>


                        {/* Quantity Controls */}
                        <td className="cart_page_quantity">
                          <div className="details_qty_input">
                            <button
                              className="minus"
                              onClick={() =>
                                changeQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <i className="fal fa-minus" aria-hidden="true"></i>
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              readOnly
                            />
                            <button
                              className="plus"
                              onClick={() =>
                                changeQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <i className="fal fa-plus" aria-hidden="true"></i>
                            </button>
                          </div>
                        </td>

                        {/* Total Price */}
                        <td className="cart_page_total">
                          <h3>
                            ₹{(item.unit_price * item.quantity).toFixed(2)}
                          </h3>
                        </td>

                        {/* Remove */}
                        <td className="cart_page_action">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              removeItem(item.id)
                            }}
                          >
                            <i className="fal fa-times"></i> Remove
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            
            </div>
          </div>

          {/* RIGHT - Billing Summary */}
          {/* <CartTotals totals={totalsData} /> */}


          <CartTotals totals={totalsData} items={items} />



            


        </div>
      </div>
    </section>
  )
}

export default ItemsTemplate












