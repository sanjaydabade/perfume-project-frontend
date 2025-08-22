// "use client"

// import {
//   Popover,
//   PopoverButton,
//   PopoverPanel,
//   Transition,
// } from "@headlessui/react"
// import { convertToLocale } from "@lib/util/money"
// import { HttpTypes } from "@medusajs/types"
// import { Button } from "@medusajs/ui"
// import DeleteButton from "@modules/common/components/delete-button"
// import LineItemOptions from "@modules/common/components/line-item-options"
// import LineItemPrice from "@modules/common/components/line-item-price"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import Thumbnail from "@modules/products/components/thumbnail"
// import { usePathname } from "next/navigation"
// import { Fragment, useEffect, useRef, useState } from "react"

// const CartDropdown = ({
//   cart: cartState,
// }: {
//   cart?: HttpTypes.StoreCart | null
// }) => {
//   const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
//     undefined
//   )
//   const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

//   const open = () => setCartDropdownOpen(true)
//   const close = () => setCartDropdownOpen(false)

//   const totalItems =
//     cartState?.items?.reduce((acc, item) => {
//       return acc + item.quantity
//     }, 0) || 0

//   const subtotal = cartState?.subtotal ?? 0
//   const itemRef = useRef<number>(totalItems || 0)

//   const timedOpen = () => {
//     open()

//     const timer = setTimeout(close, 5000)

//     setActiveTimer(timer)
//   }

//   const openAndCancel = () => {
//     if (activeTimer) {
//       clearTimeout(activeTimer)
//     }

//     open()
//   }

//   // Clean up the timer when the component unmounts
//   useEffect(() => {
//     return () => {
//       if (activeTimer) {
//         clearTimeout(activeTimer)
//       }
//     }
//   }, [activeTimer])

//   const pathname = usePathname()

//   // open cart dropdown when modifying the cart items, but only if we're not on the cart page
//   useEffect(() => {
//     if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
//       timedOpen()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [totalItems, itemRef.current])

//   return (
//     <div
//       className="h-full z-50"
//       onMouseEnter={openAndCancel}
//       onMouseLeave={close}
//     >
//       <Popover className="relative h-full">
//         {/* <PopoverButton className="h-full">
//           <LocalizedClientLink
//             className="hover:text-ui-fg-base"
//             href="/cart"
//             data-testid="nav-cart-link"
//           >{`Cart (${totalItems})`}</LocalizedClientLink>
//         </PopoverButton> */}


//  <li>
//     <LocalizedClientLink
//       className="flex items-center hover:text-ui-fg-base"
//       href="/cart"
//       data-testid="nav-cart-link"
//     >
//       <b>
//         <img
//           src="/assets/images/cart_black.svg"
//           alt="cart"
//           className="img-fluid w-5 h-5"
//         />
//       </b>
//       <span className="ml-1">{totalItems}</span>
//     </LocalizedClientLink>
//   </li>

//         <Transition
//           show={cartDropdownOpen}
//           as={Fragment}
//           enter="transition ease-out duration-200"
//           enterFrom="opacity-0 translate-y-1"
//           enterTo="opacity-100 translate-y-0"
//           leave="transition ease-in duration-150"
//           leaveFrom="opacity-100 translate-y-0"
//           leaveTo="opacity-0 translate-y-1"
//         >
//           <PopoverPanel
//             static
//             className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-white border-x border-b border-gray-200 w-[420px] text-ui-fg-base"
//             // className="mini_cart "  
//             data-testid="nav-cart-dropdown"
//           >
//             <div className="offcanvas offcanvas-end"  id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
//               <h3 className="offcanvas-title" id="offcanvasRightLabel">My Cart</h3>
//                 <button type="button"className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"><i
//                        className="far fa-times"></i></button>
//             </div>
//             {cartState && cartState.items?.length ? (
//               <>
//                 <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
//                   {cartState.items
//                     .sort((a, b) => {
//                       return (a.created_at ?? "") > (b.created_at ?? "")
//                         ? -1
//                         : 1
//                     })
//                     .map((item) => (
//                       <div
//                         className="grid grid-cols-[122px_1fr] gap-x-4"
//                         key={item.id}
//                         data-testid="cart-item"
//                       >
//                         <LocalizedClientLink
//                           href={`/products/${item.product_handle}`}
//                           className="w-24"
//                         >
//                           <Thumbnail
//                             thumbnail={item.thumbnail}
//                             images={item.variant?.product?.images}
//                             size="square"
//                           />
//                         </LocalizedClientLink>
                      
//                        <div className="offcanvas-body">
//                 <ul>
//                     <li>
//                         <LocalizedClientLink
//                           href={`/products/${item.product_handle}`}
//                           className="w-24"
//                         >
//                           <Thumbnail
//                             thumbnail={item.thumbnail}
//                             images={item.variant?.product?.images}
//                             size="square"
//                           />
//                         </LocalizedClientLink>
//                         <div className="cart_text">
//                             <a className="cart_title" href="#">Men's Fashionable Hoodie</a>
//                             <p>₹140 <del>₹150</del></p>
//                         </div>
//                         <a className="del_icon" href="#"><i className="fal fa-times"></i></a>
//                     </li>
                    
//                 </ul>
//                 <h5>sub total <span>$429.00</span></h5>
//                 <div className="minicart_btn_area">
//                     <a className="common_btn" href="#">view cart<span></span></a>
//                 </div>
//             </div>
//                       </div>
//                     ))}
//                 </div>
                
//               </>
//             ) : (
//               <div>
//                 <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
//                   <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
//                     <span>0</span>
//                   </div>
//                   <span>Your shopping bag is empty.</span>
//                   <div>
//                     <LocalizedClientLink href="/store">
//                       <>
//                         <span className="sr-only">Go to all products page</span>
//                         <Button onClick={close}>Explore products</Button>
//                       </>
//                     </LocalizedClientLink>
//                   </div>
//                 </div>
//               </div>
//             )}

//           </PopoverPanel>
//         </Transition>
//       </Popover>
//     </div>
//   )
// }

// export default CartDropdown























// "use client"

// import {
//   Popover,
//   PopoverButton,
//   PopoverPanel,
//   Transition,
// } from "@headlessui/react"
// import { convertToLocale } from "@lib/util/money"
// import { HttpTypes } from "@medusajs/types"
// import { Button } from "@medusajs/ui"
// import DeleteButton from "@modules/common/components/delete-button"
// import LineItemOptions from "@modules/common/components/line-item-options"
// import LineItemPrice from "@modules/common/components/line-item-price"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import Thumbnail from "@modules/products/components/thumbnail"
// import { usePathname } from "next/navigation"
// import { Fragment, useEffect, useRef, useState } from "react"

// const CartDropdown = ({
//   cart: cartState,
// }: {
//   cart?: HttpTypes.StoreCart | null
// }) => {
//   const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
//     undefined
//   )
//   const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

//   const open = () => setCartDropdownOpen(true)
//   const close = () => setCartDropdownOpen(false)

//   const totalItems =
//     cartState?.items?.reduce((acc, item) => {
//       return acc + item.quantity
//     }, 0) || 0

//   const subtotal = cartState?.subtotal ?? 0
//   const itemRef = useRef<number>(totalItems || 0)

//   const timedOpen = () => {
//     open()

//     const timer = setTimeout(close, 5000)

//     setActiveTimer(timer)
//   }

//   const openAndCancel = () => {
//     if (activeTimer) {
//       clearTimeout(activeTimer)
//     }

//     open()
//   }

//   // Clean up the timer when the component unmounts
//   useEffect(() => {
//     return () => {
//       if (activeTimer) {
//         clearTimeout(activeTimer)
//       }
//     }
//   }, [activeTimer])

//   const pathname = usePathname()

//   // open cart dropdown when modifying the cart items, but only if we're not on the cart page
//   useEffect(() => {
//     if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
//       timedOpen()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [totalItems, itemRef.current])

//   return (
//     <div
//       className="h-full z-50"
//       onMouseEnter={openAndCancel}
//       onMouseLeave={close}
//     >
//       <Popover className="relative h-full">
//         {/* <PopoverButton className="h-full">
//           <LocalizedClientLink
//             className="hover:text-ui-fg-base"
//             href="/cart"
//             data-testid="nav-cart-link"
//           >{`Cart (${totalItems})`}</LocalizedClientLink>
//         </PopoverButton> */}


//  <li>
//     <LocalizedClientLink
//       className="flex items-center hover:text-ui-fg-base"
//       href="/cart"
//       data-testid="nav-cart-link"
//     >
//       <b>
//         <img
//           src="/assets/images/cart_black.svg"
//           alt="cart"
//           className="img-fluid w-5 h-5"
//         />
//       </b>
//       <span className="ml-1">{totalItems}</span>
//     </LocalizedClientLink>
//   </li>

       
       
//         <Transition
//           show={cartDropdownOpen}
//           as={Fragment}
//           enter="transition ease-out duration-200"
//           enterFrom="opacity-0 translate-y-1"
//           enterTo="opacity-100 translate-y-0"
//           leave="transition ease-in duration-150"
//           leaveFrom="opacity-100 translate-y-0"
//           leaveTo="opacity-0 translate-y-1"
//         >


//           <PopoverPanel
//             static
//            className="offcanvas offcanvas-end"   id="offcanvasRight" aria-labelledby="offcanvasRightLabel"
//             data-testid="nav-cart-dropdown"
//           >
//             <div className="p-4 flex items-center justify-center">
//               <h3 className="offcanvas-title" id="offcanvasRightLabel">Cart</h3>
//             </div>
//             {cartState && cartState.items?.length ? (
//               <>
//                 <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-8 no-scrollbar p-px">
//                   {cartState.items
//                     .sort((a, b) => {
//                       return (a.created_at ?? "") > (b.created_at ?? "")
//                         ? -1
//                         : 1
//                     })
//                     .map((item) => (
//                       <div
//                         className="grid grid-cols-[122px_1fr] gap-x-4"
//                         key={item.id}
//                         data-testid="cart-item"
//                       >
//                         <LocalizedClientLink
//                           href={`/products/${item.product_handle}`}
//                           className="w-24"
//                         >
//                           <Thumbnail
//                             thumbnail={item.thumbnail}
//                             images={item.variant?.product?.images}
//                             size="square"
//                           />
//                         </LocalizedClientLink>
//                         <div className="flex flex-col justify-between flex-1">
//                           <div className="flex flex-col flex-1">
//                             <div className="flex items-start justify-between">
//                               <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4 w-[180px]">
//                                 <h3 className="text-base-regular overflow-hidden text-ellipsis">
//                                   <LocalizedClientLink
//                                     href={`/products/${item.product_handle}`}
//                                     data-testid="product-link"
//                                   >
//                                     {item.title}
//                                   </LocalizedClientLink>
//                                 </h3>
//                                 <LineItemOptions
//                                   variant={item.variant}
//                                   data-testid="cart-item-variant"
//                                   data-value={item.variant}
//                                 />
//                                 <span
//                                   data-testid="cart-item-quantity"
//                                   data-value={item.quantity}
//                                 >
//                                   Quantity: {item.quantity}
//                                 </span>
//                               </div>
//                               <div className="flex justify-end">
//                                 <LineItemPrice
//                                   item={item}
//                                   style="tight"
//                                   currencyCode={cartState.currency_code}
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <DeleteButton
//                             id={item.id}
//                             className="mt-1"
//                             data-testid="cart-item-remove-button"
//                           >
//                             Remove
//                           </DeleteButton>
//                         </div>
//                       </div>
//                     ))}
//                 </div>
//                 <div className="p-4 flex flex-col gap-y-4 text-small-regular">
//                   <div className="flex items-center justify-between">
//                     <span className="text-ui-fg-base font-semibold">
//                       Subtotal{" "}
//                       <span className="font-normal">(excl. taxes)</span>
//                     </span>
//                     <span
//                       className="text-large-semi"
//                       data-testid="cart-subtotal"
//                       data-value={subtotal}
//                     >
//                       {convertToLocale({
//                         amount: subtotal,
//                         currency_code: cartState.currency_code,
//                       })}
//                     </span>
//                   </div>
//                   <LocalizedClientLink href="/cart" passHref>
//                     <Button
//                       className="w-full"
//                       size="large"
//                       data-testid="go-to-cart-button"
//                     >
//                       Go to cart
//                     </Button>
//                   </LocalizedClientLink>
//                 </div>
//               </>
//             ) : (
//               <div>
//                 <div className="flex py-16 flex-col gap-y-4 items-center justify-center">
//                   <div className="bg-gray-900 text-small-regular flex items-center justify-center w-6 h-6 rounded-full text-white">
//                     <span>0</span>
//                   </div>
//                   <span>Your shopping bag is empty.</span>
//                   <div>
//                     <LocalizedClientLink href="/store">
//                       <>
//                         <span className="sr-only">Go to all products page</span>
//                         <Button onClick={close}>Explore products</Button>
//                       </>
//                     </LocalizedClientLink>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </PopoverPanel>




          
//         </Transition>




//       </Popover>
//     </div>
//   )
// }

// export default CartDropdown

















"use client"

import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState} from "react"
import { useRouter } from "next/navigation";


const CartDropdown = ({ cart: cartState }: { cart?: HttpTypes.StoreCart | null }) => {
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)
  const totalItems = cartState?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0
  const itemRef = useRef<number>(totalItems || 0)
  const pathname = usePathname()
   const router = useRouter();


  // Auto open cart dropdown on cart change
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      setCartDropdownOpen(true)
      const timer = setTimeout(() => setCartDropdownOpen(false), 5000)
      return () => clearTimeout(timer)
    }
  }, [totalItems, pathname])

  return (
    <>
 
                <li>
                    <a   type="button" 
                    onClick={() => setCartDropdownOpen(true)}
                    
                    >
                      <b>
                        <img src="/assets/images/cart_black.svg" alt="cart" className="img-fluid" />
                      </b>
                      <span>{totalItems}</span>
                    </a>
                  </li>

                

      {/* Right side sliding panel */}

      {/* <div className="mini_cart"> */}
     <div
  className={`offcanvas offcanvas-end ${cartDropdownOpen ? "show" : ""}`}
  tabIndex={-1}
   id="offcanvasRight" aria-labelledby="offcanvasRightLabel"
  style={{ visibility: cartDropdownOpen ? "visible" : "hidden" }}
>
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasRightLabel">
      My Cart ({cartState?.items?.length ?? 0})
    </h5>
    <button
      type="button"
      className="btn-close"
      data-bs-dismiss="offcanvas"
      aria-label="Close"
      onClick={() => setCartDropdownOpen(false)}
    >
      {/* <i className="far fa-times"></i> */}
    </button>
  </div>

  <div className="offcanvas-body">
    {cartState?.items?.length ? (
      <ul >
        {cartState.items.map((item) => (

          
          <li
            key={item.id}
            
          >
            {/* Product Image */}
            <a href="#" className="cart_image ">
              <Thumbnail
                thumbnail={item.thumbnail}
                images={item.variant?.product?.images}
                className="img-fluid w-100"
               
              />
            </a>

            {/* Product Text */}
            <div className="cart_text ">
              <a className="cart_title " 
               href={`/products/${item.product_handle}`}
               data-testid="product-link"
               >
                {item.title}
              </a>
              {/* <p className="mb-0 text-muted">
                ₹{item.variant?.prices?.[0]?.amount ?? 0}
              </p> */}
            </div>

            {/* Delete Icon */}
            <a
              className="del_icon text-muted ms-3"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                // delete logic here
              }}
            >
              <i className="fal fa-times"></i>
            </a>
          </li>
        ))}
      </ul>





    ) : (
      <p>Your shopping bag is empty.</p>
    )}

    {/* Subtotal */}
    {cartState?.items?.length ? (
      <div className="mt-4 border-top pt-3">
        <p className="fw-semibold">
          Subtotal: ₹{cartState.subtotal ?? 0}
        </p>
       <Button
      onClick={() => router.push("/cart")}
      className="w-100"
    >
      View Cart
    </Button>
      </div>
    ) : null}
  </div>
</div> 
{/* </div> */}

    </>
  )
}

export default CartDropdown
  