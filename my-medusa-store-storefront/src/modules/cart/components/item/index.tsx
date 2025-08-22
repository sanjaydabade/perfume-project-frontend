"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <Table.Row className="w-full" data-testid="product-row">
      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          <Thumbnail
            thumbnail={item.thumbnail}
            images={item.variant?.product?.images}
            size="square"
          />
        </LocalizedClientLink>
      </Table.Cell>

      <Table.Cell className="text-left">
        <Text
          className="txt-medium-plus text-ui-fg-base"
          data-testid="product-title"
        >
          {item.product_title}
        </Text>
        <LineItemOptions variant={item.variant} data-testid="product-variant" />
      </Table.Cell>

      {type === "full" && (
        <Table.Cell>
          <div className="flex gap-2 items-center w-28">
            <DeleteButton id={item.id} data-testid="product-delete-button" />
            <CartItemSelect
              value={item.quantity}
              onChange={(value) => changeQuantity(parseInt(value.target.value))}
              className="w-14 h-10 p-4"
              data-testid="product-select-button"
            >
              {/* TODO: Update this with the v2 way of managing inventory */}
              {Array.from(
                {
                  length: Math.min(maxQuantity, 10),
                },
                (_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                )
              )}

              <option value={1} key={1}>
                1
              </option>
            </CartItemSelect>
            {updating && <Spinner />}
          </div>
          <ErrorMessage error={error} data-testid="product-error-message" />
        </Table.Cell>
      )}

      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <LineItemUnitPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </Table.Cell>
      )}

      <Table.Cell className="!pr-0">
        <span
          className={clx("!pr-0", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <span className="flex gap-x-1 ">
              <Text className="text-ui-fg-muted">{item.quantity}x </Text>
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </span>
          )}
          <LineItemPrice
            item={item}
            style="tight"
            currencyCode={currencyCode}
          />
        </span>
      </Table.Cell>
    </Table.Row>
  )
}

export default Item










// "use client"

// import { Table, Text, clx } from "@medusajs/ui"
// import { updateLineItem } from "@lib/data/cart"
// import { HttpTypes } from "@medusajs/types"
// import CartItemSelect from "@modules/cart/components/cart-item-select"
// import ErrorMessage from "@modules/checkout/components/error-message"
// import DeleteButton from "@modules/common/components/delete-button"
// import LineItemOptions from "@modules/common/components/line-item-options"
// import LineItemPrice from "@modules/common/components/line-item-price"
// import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import Spinner from "@modules/common/icons/spinner"
// import Thumbnail from "@modules/products/components/thumbnail"
// import { useState } from "react"

// type ItemProps = {
//   item: HttpTypes.StoreCartLineItem
//   type?: "full" | "preview"
//   currencyCode: string
// }

// const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
//   const [updating, setUpdating] = useState(false)
//   const [error, setError] = useState<string | null>(null)

//   const changeQuantity = async (quantity: number) => {
//     setError(null)
//     setUpdating(true)

//     await updateLineItem({
//       lineId: item.id,
//       quantity,
//     })
//       .catch((err) => {
//         setError(err.message)
//       })
//       .finally(() => {
//         setUpdating(false)
//       })
//   }

//   // TODO: Update this to grab the actual max inventory
//   const maxQtyFromInventory = 10
//   const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

//   return (
//   <>

//  <section className="cart_page mt_100 mb_100">
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
//                         <div className="table-responsive">
//                             <table className="table">
//                                 <tbody>
//                                     <tr>
//                                         <td className="cart_page_checkbox">
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value=""
//                                                     id="flexCheckDefault2"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_img">
//                                             <div className="img">
//                                                 <img src="assets/images/product_18.png" alt="Products"
//                                                     className="img-fluid w-100"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_details">
//                                             <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
//                                             <p>$59.00 <del>$65.00</del></p>
//                                             <span><b>Color:</b> Orange</span>
//                                             <span><b>Size:</b> M (Medium)</span>
//                                         </td>
//                                         <td className="cart_page_price">
//                                             <h3>$59.00</h3>
//                                         </td>
//                                         <td className="cart_page_quantity">
//                                             <div className="details_qty_input">
//                                                 <button className="minus"><i className="fal fa-minus"
//                                                         aria-hidden="true"></i></button>
//                                                 <input type="text" placeholder="01"/>
//                                                 <button className="plus"><i className="fal fa-plus"
//                                                         aria-hidden="true"></i></button>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_total">
//                                             <h3>$59.00</h3>
//                                         </td>
//                                         <td className="cart_page_action">
//                                             <a href="#"> <i className="fal fa-times"></i> Remove</a>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className="cart_page_checkbox">
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value=""
//                                                     id="flexCheckDefault6"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_img">
//                                             <div className="img">
//                                                 <img src="assets/images/product_7.png" alt="Products"
//                                                     className="img-fluid w-100"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_details">
//                                             <a className="title" href="shop_details.html">Denim 2 Quarter Pant</a>
//                                             <p>$36.00</p>
//                                             <span><b>Color:</b> Black</span>
//                                             <span><b>Size:</b> L (Large)</span>
//                                         </td>
//                                         <td className="cart_page_price">
//                                             <h3>$36.00</h3>
//                                         </td>
//                                         <td className="cart_page_quantity">
//                                             <div className="details_qty_input">
//                                                 <button className="minus"><i className="fal fa-minus"
//                                                         aria-hidden="true"></i></button>
//                                                 <input type="text" placeholder="01"/>
//                                                 <button className="plus"><i className="fal fa-plus"
//                                                         aria-hidden="true"></i></button>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_total">
//                                             <h3>$36.00</h3>
//                                         </td>
//                                         <td className="cart_page_action">
//                                             <a href="#"> <i className="fal fa-times"></i> Remove</a>
//                                         </td>
//                                     </tr>
//                                 </tbody>
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
//                                             Comfort Gallery
//                                         </h4>
//                                     </td>
//                                 </tr>
//                             </table>
//                         </div>

//                         <div className="table-responsive">
//                             <table className="table">
//                                 <tbody>
//                                     <tr>
//                                         <td className="cart_page_checkbox">
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value=""
//                                                     id="flexCheckDefault03"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_img">
//                                             <div className="img">
//                                                 <img src="assets/images/product_16.png" alt="Products"
//                                                     className="img-fluid w-100"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_details">
//                                             <a className="title" href="shop_details.html">cherry fabric western tops</a>
//                                             <p>$75.00</p>
//                                             <span><b>Color:</b> Blue</span>
//                                             <span><b>Size:</b> XL (Extra Large)</span>
//                                         </td>
//                                         <td className="cart_page_price">
//                                             <h3>$72.00</h3>
//                                         </td>
//                                         <td className="cart_page_quantity">
//                                             <div className="details_qty_input">
//                                                 <button className="minus"><i className="fal fa-minus"
//                                                         aria-hidden="true"></i></button>
//                                                 <input type="text" placeholder="01"/>
//                                                 <button className="plus"><i className="fal fa-plus"
//                                                         aria-hidden="true"></i></button>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_total">
//                                             <h3>$72.00</h3>
//                                         </td>
//                                         <td className="cart_page_action">
//                                             <a href="#"> <i className="fal fa-times"></i> Remove</a>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className="cart_page_checkbox">
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value=""
//                                                     id="flexCheckDefault4"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_img">
//                                             <div className="img">
//                                                 <img src="assets/images/product_4.png" alt="Products"
//                                                     className="img-fluid w-100"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_details">
//                                             <a className="title" href="shop_details.html">Comfortable Sports Sneakers</a>
//                                             <p>$66.00 <del>$70.00</del></p>
//                                             <span><b>Color:</b> Blue</span>
//                                             <span><b>Size:</b> 40" (Large)</span>
//                                         </td>
//                                         <td className="cart_page_price">
//                                             <h3>$66.00</h3>
//                                         </td>
//                                         <td className="cart_page_quantity">
//                                             <div className="details_qty_input">
//                                                 <button className="minus"><i className="fal fa-minus"
//                                                         aria-hidden="true"></i></button>
//                                                 <input type="text" placeholder="01"/>
//                                                 <button className="plus"><i className="fal fa-plus"
//                                                         aria-hidden="true"></i></button>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_total">
//                                             <h3>$66.00</h3>
//                                         </td>
//                                         <td className="cart_page_action">
//                                             <a href="#"> <i className="fal fa-times"></i> Remove</a>
//                                         </td>
//                                     </tr>
//                                     <tr>
//                                         <td className="cart_page_checkbox">
//                                             <div className="form-check">
//                                                 <input className="form-check-input" type="checkbox" value=""
//                                                     id="flexCheckDefault5"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_img">
//                                             <div className="img">
//                                                 <img src="assets/images/product_17.png" alt="Products"
//                                                     className="img-fluid w-100"/>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_details">
//                                             <a className="title" href="shop_details.html">Denim Jeans Pants For Men</a>
//                                             <p>$52.00</p>
//                                             <span><b>Color:</b> Gray</span>
//                                             <span><b>Size:</b> 42" (Medium)</span>
//                                         </td>
//                                         <td className="cart_page_price">
//                                             <h3>$59.00</h3>
//                                         </td>
//                                         <td className="cart_page_quantity">
//                                             <div className="details_qty_input">
//                                                 <button className="minus"><i className="fal fa-minus"
//                                                         aria-hidden="true"></i></button>
//                                                 <input type="text" placeholder="01"/>
//                                                 <button className="plus"><i className="fal fa-plus"
//                                                         aria-hidden="true"></i></button>
//                                             </div>
//                                         </td>
//                                         <td className="cart_page_total">
//                                             <h3>$59.00</h3>
//                                         </td>
//                                         <td className="cart_page_action">
//                                             <a href="#"> <i className="fal fa-times"></i> Remove</a>
//                                         </td>
//                                     </tr>
//                                 </tbody>
//                             </table>
//                         </div>

//                     </div>
//                 </div>
//                 <div className="col-lg-4 col-md-9 wow fadeInRight">
//                     <div id="sticky_sidebar">
//                         <div className="cart_page_summary">
//                             <h3>Billing summary</h3>

//                             <a href="vendor_details.html" className="vendor_name">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                                     stroke-width="1.5" stroke="currentColor" className="size-6">
//                                     <path stroke-linecap="round" stroke-linejoin="round"
//                                         d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
//                                 </svg>
//                                 Zapier Gallery
//                             </a>
//                             <ul>
//                                 <li>
//                                     <a className="img" href="#">
//                                         <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100"/>
//                                     </a>
//                                     <div className="text">
//                                         <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
//                                         <p>$59.00 × 2</p>
//                                         <p>Color: Red, Size: XL</p>
//                                     </div>
//                                 </li>
//                                 <li>
//                                     <a className="img" href="#">
//                                         <img src="assets/images/product_16.png" alt="Products" className="img-fluid w-100"/>
//                                     </a>
//                                     <div className="text">
//                                         <a className="title" href="shop_details.html">cherry fabric western tops</a>
//                                         <p>$75.00 × 1</p>
//                                         <p>Color: Orange, Size: M</p>
//                                     </div>
//                                 </li>

//                             </ul>
//                             <a href="vendor_details.html" className="vendor_name">
//                                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
//                                     stroke-width="1.5" stroke="currentColor" className="size-6">
//                                     <path stroke-linecap="round" stroke-linejoin="round"
//                                         d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
//                                 </svg>
//                                 Comfort Gallery
//                             </a>
//                             <ul>
//                                 <li>
//                                     <a className="img" href="#">
//                                         <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100"/>
//                                     </a>
//                                     <div className="text">
//                                         <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
//                                         <p>$59.00 × 2</p>
//                                         <p>Color: Red, Size: XL</p>
//                                     </div>
//                                 </li>
//                             </ul>

//                             <h6>subtotal <span>$395.00</span></h6>
//                             <h6>Tax <span>(+) $100.00</span></h6>
//                             <h6>Discount <span>(-) $45.00</span></h6>
//                             <h4>Total <span>$410.00</span></h4>

//                             <form action="#">
//                                 <input type="text" placeholder="Coupon code"/>
//                                 <button type="submit" className="common_btn">Apply</button>
//                                 <p>
//                                     Coupon Code: HEM4556JL
//                                     <a href="#"><i className="fal fa-times"></i></a>
//                                 </p>
//                             </form>
//                         </div>
//                         <div className="cart_summary_btn">
//                             <a className="common_btn continue_shopping" href="shop.html">Contiue shopping</a>
//                             <a className="common_btn" href="checkout.html">checkout <i
//                                     className="fas fa-long-arrow-right"></i></a>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
    



//   </>
//   )
// }

// export default Item
