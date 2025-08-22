// import { listCategories } from "@lib/data/categories"
// import { listCollections } from "@lib/data/collections"
// import { Text, clx } from "@medusajs/ui"

// import LocalizedClientLink from "@modules/common/components/localized-client-link"
// import MedusaCTA from "@modules/layout/components/medusa-cta"

// export default async function Footer() {
//   const { collections } = await listCollections({
//     fields: "*products",
//   })
//   const productCategories = await listCategories()

//   return (
//     <footer className="border-t border-ui-border-base w-full">
//       <div className="content-container flex flex-col w-full">
//         <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-40">
//           <div>
//             <LocalizedClientLink
//               href="/"
//               className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
//             >
//               Medusa Store
//             </LocalizedClientLink>
//           </div>
//           <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-2 sm:grid-cols-3">
//             {productCategories && productCategories?.length > 0 && (
//               <div className="flex flex-col gap-y-2">
//                 <span className="txt-small-plus txt-ui-fg-base">
//                   Categories
//                 </span>
//                 <ul
//                   className="grid grid-cols-1 gap-2"
//                   data-testid="footer-categories"
//                 >
//                   {productCategories?.slice(0, 6).map((c) => {
//                     if (c.parent_category) {
//                       return
//                     }

//                     const children =
//                       c.category_children?.map((child) => ({
//                         name: child.name,
//                         handle: child.handle,
//                         id: child.id,
//                       })) || null

//                     return (
//                       <li
//                         className="flex flex-col gap-2 text-ui-fg-subtle txt-small"
//                         key={c.id}
//                       >
//                         <LocalizedClientLink
//                           className={clx(
//                             "hover:text-ui-fg-base",
//                             children && "txt-small-plus"
//                           )}
//                           href={`/categories/${c.handle}`}
//                           data-testid="category-link"
//                         >
//                           {c.name}
//                         </LocalizedClientLink>
//                         {children && (
//                           <ul className="grid grid-cols-1 ml-3 gap-2">
//                             {children &&
//                               children.map((child) => (
//                                 <li key={child.id}>
//                                   <LocalizedClientLink
//                                     className="hover:text-ui-fg-base"
//                                     href={`/categories/${child.handle}`}
//                                     data-testid="category-link"
//                                   >
//                                     {child.name}
//                                   </LocalizedClientLink>
//                                 </li>
//                               ))}
//                           </ul>
//                         )}
//                       </li>
//                     )
//                   })}
//                 </ul>
//               </div>
//             )}
//             {collections && collections.length > 0 && (
//               <div className="flex flex-col gap-y-2">
//                 <span className="txt-small-plus txt-ui-fg-base">
//                   Collections
//                 </span>
//                 <ul
//                   className={clx(
//                     "grid grid-cols-1 gap-2 text-ui-fg-subtle txt-small",
//                     {
//                       "grid-cols-2": (collections?.length || 0) > 3,
//                     }
//                   )}
//                 >
//                   {collections?.slice(0, 6).map((c) => (
//                     <li key={c.id}>
//                       <LocalizedClientLink
//                         className="hover:text-ui-fg-base"
//                         href={`/collections/${c.handle}`}
//                       >
//                         {c.title}
//                       </LocalizedClientLink>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//             <div className="flex flex-col gap-y-2">
//               <span className="txt-small-plus txt-ui-fg-base">Medusa</span>
//               <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
//                 <li>
//                   <a
//                     href="https://github.com/medusajs"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="hover:text-ui-fg-base"
//                   >
//                     GitHub
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://docs.medusajs.com"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="hover:text-ui-fg-base"
//                   >
//                     Documentation
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="https://github.com/medusajs/nextjs-starter-medusa"
//                     target="_blank"
//                     rel="noreferrer"
//                     className="hover:text-ui-fg-base"
//                   >
//                     Source code
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
//           <Text className="txt-compact-small">
//             © {new Date().getFullYear()} Medusa Store. All rights reserved.
//           </Text>
//           <MedusaCTA />
//         </div>
//       </div>
//     </footer>
//   )
// }










import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import MedusaCTA from "@modules/layout/components/medusa-cta"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
  <>
  <footer className="beauty_footer pt_100" style={{ backgroundImage: 'url(/assets/images/beauty_booter_bg.jpg)' }}>
        <div className="container">
            <div className="row justify-content-between">
                <div className="col-lg-3 col-md-7 wow fadeInUp" data-wow-delay=".7s">
                    <div className="footer_2_logo_area">
                        <a className="footer_logo" href="#">
                            <img src="/assets/images/logo-dark.png" alt="mayas" className="img-fluid w-100"/>
                        </a>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, distinctio molestiae error
                            ullam obcaecati dolorem inventore fugiat optio nihil vitae repellat.</p>
                        <ul>
                            <li><span>Follow :</span></li>
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-4 col-md-4  wow fadeInUp" data-wow-delay="1s">
                    <div className="footer_link">
                        <h3>Category</h3>
                        <ul>
                            <li><a href="#">Men’s Perfumes</a></li>
                            <li><a href="#">Women’s Perfumes</a></li>
                            <li><a href="#">Unisex Perfumes</a></li>
                            <li><a href="#">Bakhoor & Dakhoon</a></li>
                            <li><a href="#">Deodorants</a></li>
                            <li><a href="#">Gift Sets</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-4 col-md-4  wow fadeInUp" data-wow-delay="1.3s">
                    <div className="footer_link">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Artisan Series</a></li>
                            <li><a href="#">Wisal Series</a></li>
                            <li><a href="#">Aurum Series</a></li>
                            <li><a href="#">Oud Deodorants Series</a></li>
                            <li><a href="#">Aristocrat Series</a></li>
                            <li><a href="#">Amber Series</a></li>
                            <li><a href="#">Gold Series</a></li>
                            <li><a href="#">Royal Series</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-4 col-md-4  wow fadeInUp" data-wow-delay="1.6s">
                    <div className="footer_link">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="#">Gifting</a></li>
                            <li><a href="#">Sales/Offers</a></li>
                            <li><a href="#">Our Store</a></li>
                            <li><a href="#">contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-lg-3 col-md-4  wow fadeInUp" data-wow-delay="1.9s">
                    <div className="footer_link footer_logo_area">
                        <h3>Contact Us</h3>
                        <p>It is a long established fact that reader distracted looking layout It is a long established
                            fact.</p>
                        <span>
                            <b><img src="/assets/images/location_icon_white.png" alt="Map" className="img-fluid"/></b>
                            Mumbai, India</span>
                        <span>
                            <b><img src="/assets/images/phone_icon_white.png" alt="Call" className="img-fluid"/></b>
                            <a href="callto:+123324587939">+123 324 5879 39</a>
                        </span>
                        <span>
                            <b><img src="/assets/images/mail_icon_white.png" alt="Mail" className="img-fluid"/></b>
                            <a href="mailto:support@mail.com">info@mayas.com</a>
                        </span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="footer_copyright mt_75">
                        <p>Copyright @ mayas2025. All right reserved.</p>
                        <ul className="payment">
                            <li>Payment by :</li>
                            <li>
                                <img src="/assets/images/footer_payment_icon_1.jpg" alt="payment"
                                    className="img-fluid w-100"/>
                            </li>
                            <li>
                                <img src="/assets/images/footer_payment_icon_2.jpg" alt="payment"
                                    className="img-fluid w-100"/>
                            </li>
                            <li>
                                <img src="/assets/images/footer_payment_icon_3.jpg" alt="payment"
                                    className="img-fluid w-100"/>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer> 






     {/* <!--==========================
        SCROLL BUTTON START
    ===========================--> */}
    <div className="progress-wrap">
        <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
    </div>
    {/* <!--==========================
        SCROLL BUTTON END
    ===========================--> */}


  </>



  )
}

