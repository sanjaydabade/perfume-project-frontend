// import { Suspense } from "react"

// import { listRegions } from "@lib/data/regions"
// import { StoreRegion } from "@medusajs/types"
// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import CartButton from "@modules/layout/components/cart-button"
// import SideMenu from "@modules/layout/components/side-menu"

// export default async function Nav() {
//   const regions = await listRegions().then((regions: StoreRegion[]) => regions)

//   return (
//     <div className="sticky top-0 inset-x-0 z-50 group">
//       <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
//         <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
//           <div className="flex-1 basis-0 h-full flex items-center">
//             <div className="h-full">
//               <SideMenu regions={regions} />
//             </div>
//           </div>

//           <div className="flex items-center h-full">
//             <LocalizedClientLink
//               href="/"
//               className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
//               data-testid="nav-store-link"
//             >
//               Medusa Store
//             </LocalizedClientLink>
//           </div>

//           <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
//             <div className="hidden small:flex items-center gap-x-6 h-full">
//               <LocalizedClientLink
//                 className="hover:text-ui-fg-base"
//                 href="/account"
//                 data-testid="nav-account-link"
//               >
//                 Account
//               </LocalizedClientLink>
//             </div>
//             <Suspense
//               fallback={
//                 <LocalizedClientLink
//                   className="hover:text-ui-fg-base flex gap-2"
//                   href="/cart"
//                   data-testid="nav-cart-link"
//                 >
//                   Cart (0)
//                 </LocalizedClientLink>
//               }
//             >
//               <CartButton />
//             </Suspense>
//           </div>
//         </nav>
//       </header>
//     </div>
//   )
// }











import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

import assert from "node:assert"


export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
   
 <>
      
      <section className="topbar d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 d-none d-lg-block">
              <ul className="topbar_info d-flex flex-wrap">
                <li>
                  <a href="callto:+1(700)230-0035">
                    <i className="fas fa-phone-alt"></i> 0000 000 000
                  </a>
                </li>
                <li>
                  <a href="mailto:company@gmail.com">
                    <i className="fas fa-envelope-open-text"></i> company@gmail.com
                  </a>
                </li>
                <li>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> Mumbai, India
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-lg-5">
              <div className="topbar_right d-flex flex-wrap align-items-center justify-content-end">
                <ul className="topbar_icon d-flex flex-wrap">
                  <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                  <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-behance"></i></a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

    
      <nav className="main_menu_2 main_menu">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex flex-wrap">
              <div className="main_menu_area">
                <div className="grocery_logo_area">
                  <a href="#">
                    <img src="/assets/images/logo.png" alt="mayas" className="img-fluid w-100" />
                  </a>
                  <div
                    className="mobile_menu_icon d-block d-lg-none"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasWithBothOptions"
                    aria-controls="offcanvasWithBothOptions"
                  >
                    <span className="mobile_menu_icon">
                      <i className="far fa-stream menu_icon_bar"></i>
                    </span>
                  </div>
                </div>

                <ul className="menu_item d-none d-lg-flex">
                  <li><a className="active" href="#">Home</a></li>
                  <li><a href="#">New Arrival</a></li>
                  <li>
                    <a className="active" href="#">By Category <i className="fas fa-chevron-down"></i></a>
                    <ul className="menu_droapdown">
                      <li><a href="#">Men’s Perfumes</a></li>
                      <li><a href="#">Women’s Perfumes</a></li>
                      <li><a href="#">Unisex Perfumes</a></li>
                      <li><a href="#">Bakhoor & Dakhoon</a></li>
                      <li><a href="#">Deodorants</a></li>
                      <li><a href="#">Gift Sets</a></li>
                    </ul>
                  </li>
                  <li>
                    <a className="active" href="#">By Collection <i className="fas fa-chevron-down"></i></a>
                    <ul className="menu_droapdown">
                      <li><a href="#">Artisan Series</a></li>
                      <li><a href="#">Wisal Series</a></li>
                      <li><a href="#">Aurum Series</a></li>
                      <li><a href="#">Oud Deodorants Series</a></li>
                      <li><a href="#">Aristocrat Series</a></li>
                      <li><a href="#">Amber Series</a></li>
                      <li><a href="#">Gold Series</a></li>
                      <li><a href="#">Royal Series</a></li>
                    </ul>
                  </li>
                  <li><a href="#">Gifting</a></li>
                  <li><a href="#">Sales/Offers</a></li>
                  <li><a href="#">Our Store</a></li>
                  <li><a href="#">Contact</a></li>
                </ul>

                <ul className="menu_icon d-none d-lg-flex">
                  <li>
                    <a href="#">
                      <b>
                        <img src="/assets/images/love_black.svg" alt="Wishlist" className="img-fluid" />
                      </b>
                      <span>5</span>
                    </a>
                  </li>


                  {/* <li>
                    <a href="#">
                      <b>
                        <img src="/assets/images/cart_black.svg" alt="cart" className="img-fluid" />
                      </b>
                      <span>2</span>
                    </a>
                  </li> */}

                
                    <CartButton />
                

                  <li>
                    <a className="user" href="#">
                      <b>
                        <img src="/assets/images/user_icon_black.svg" alt="user" className="img-fluid" />
                      </b>
                      <h5>Smith Jhon</h5>
                    </a>
                    <ul className="user_dropdown">
                      <li><a href="#">Dashboard</a></li>
                      <li><a  href="/account"
               data-testid="nav-account-link">My Account</a></li>
                      <li><a href="#">My Order</a></li>
                      <li><a href="#">Wishlist</a></li>
                      <li><a href="#">Logout</a></li>
                    </ul>
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </div>
      </nav>
    </>



)
  
}
