// import React, { Suspense } from "react"

// import ImageGallery from "@modules/products/components/image-gallery"
// import ProductActions from "@modules/products/components/product-actions"
// import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
// import ProductTabs from "@modules/products/components/product-tabs"
// import RelatedProducts from "@modules/products/components/related-products"
// import ProductInfo from "@modules/products/templates/product-info"
// import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
// import { notFound } from "next/navigation"
// import ProductActionsWrapper from "./product-actions-wrapper"
// import { HttpTypes } from "@medusajs/types"

// type ProductTemplateProps = {
//   product: HttpTypes.StoreProduct
//   region: HttpTypes.StoreRegion
//   countryCode: string
// }

// const ProductTemplate: React.FC<ProductTemplateProps> = ({
//   product,
//   region,
//   countryCode,
// }) => {
//   if (!product || !product.id) {
//     return notFound()
//   }

//   return (
//     <>
//       <div
//         className="content-container flex flex-col small:flex-row small:items-start py-6 relative"
//         data-testid="product-container"
//       >
//         <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-6">
//           <ProductInfo product={product} />
//           <ProductTabs product={product} />
//         </div>
//         <div className="block w-full relative">
//           <ImageGallery images={product?.images || []} />
//         </div>
//         <div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-12">
//           <ProductOnboardingCta />
//           <Suspense
//             fallback={
//               <ProductActions
//                 disabled={true}
//                 product={product}
//                 region={region}
//               />
//             }
//           >
//             <ProductActionsWrapper id={product.id} region={region} />
//           </Suspense>
//         </div>
//       </div>
//       <div
//         className="content-container my-16 small:my-32"
//         data-testid="related-products-container"
//       >
//         <Suspense fallback={<SkeletonRelatedProducts />}>
//           <RelatedProducts product={product} countryCode={countryCode} />
//         </Suspense>
//       </div>
//     </>
//   )
// }

// export default ProductTemplate












// import React, { Suspense } from "react"

// import ImageGallery from "@modules/products/components/image-gallery"
// import ProductActions from "@modules/products/components/product-actions"
// import ProductOnboardingCta from "@modules/products/components/product-onboarding-cta"
// import ProductTabs from "@modules/products/components/product-tabs"
// import RelatedProducts from "@modules/products/components/related-products"
// import ProductInfo from "@modules/products/templates/product-info"
// import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
// import { notFound } from "next/navigation"
// import ProductActionsWrapper from "./product-actions-wrapper"
// import { HttpTypes } from "@medusajs/types"

// import { getProductPrice } from "@lib/util/get-product-price"
// import PreviewPrice from "@modules/products/components/product-preview/price"

// type ProductTemplateProps = {
//   product: HttpTypes.StoreProduct
//   region: HttpTypes.StoreRegion
//   countryCode: string
// }

// const ProductTemplate: React.FC<ProductTemplateProps> = ({
//   product,
//   region,
//   countryCode,
// }) => {
//   if (!product || !product.id) {
//     return notFound()
//   }

// const mainImage = product.images?.[0]?.url || "/assets/images/placeholder.png"
//   const galleryImages = product.images?.slice(1) || []


// const { cheapestPrice } = getProductPrice({ product })


//   return (
//     <>

//       <section className="page_banner" style={{ background: "url(/assets/images/page_banner_bg.jpg)" }}>
//         <div className="page_banner_overlay">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-12">
//                         <div className="page_banner_text wow fadeInUp">
                            
//                             <ul>
//                                 <li><a href="#"><i className="fal fa-home-lg"></i> Home</a></li>
//                                 <li><a href="#">Shop</a></li>
//                                 <li><a href="#">Shop Details</a></li>
//                             </ul>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>




//       {/* <section className="shop_details mt_100">
//         <div className="container">
//             <div className="row">
//                 <div className="col-xxl-10">
//                     <div className="row">
//                         <div className="col-lg-6 col-md-10 wow fadeInLeft">
//                             <div className="shop_details_slider_area">
//                                 <div className="row">
//                                     <div className="col-xl-2 col-lg-3 col-md-3 order-2 order-md-1">
//                                         <div className="row details_slider_nav">
//                                             <div className="col-12">
//                                                 <div className="details_slider_nav_item">
//                                                     <img src="/assets/images/product_1-1.png" alt="Product"
//                                                         className="img-fluid w-100"/>
//                                                 </div>
//                                             </div>
//                                             <div className="col-12">
//                                                 <div className="details_slider_nav_item">
//                                                     <img src="/assets/images/product_1-2.png" alt="Product"
//                                                         className="img-fluid w-100"/>
//                                                 </div>
//                                             </div>
//                                             <div className="col-12">
//                                                 <div className="details_slider_nav_item">
//                                                     <img src="/assets/images/product_1-3.png" alt="Product"
//                                                         className="img-fluid w-100"/>
//                                                 </div>
//                                             </div>
//                                             <div className="col-12">
//                                                 <div className="details_slider_nav_item">
//                                                     <img src="/assets/images/product_1-4.png" alt="Product"
//                                                         className="img-fluid w-100"/>
//                                                 </div>
//                                             </div>
//                                             <div className="col-12">
//                                                 <div className="details_slider_nav_item">
//                                                     <img src="/assets/images/product_1-5.png" alt="Product"
//                                                         className="img-fluid w-100"/>
//                                                 </div>
//                                             </div>
//                                             <div className="col-12">
//                                                 <div className="details_slider_nav_item">
//                                                     <img src="/assets/images/product_1-6.png" alt="Product"
//                                                         className="img-fluid w-100"/>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="col-xl-10 col-lg-9 col-md-9  order-md-1">
//                                         <div className="row details_slider_thumb">
                                            
//                                             <div className="col-12">
//                                                 <div className="details_slider_thumb_item">
//                                                     <img src="/assets/images/product_1-5.png" alt="Dress"
//                                                         className="img-fluid w-100"/>
//                                                 </div>
//                                             </div>
                                           
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="col-lg-6 wow fadeInUp">
//                             <div className="shop_details_text">
//                                 <p className="category">Men's Perfume</p>
//                                 <h2 className="details_title">Denim Series Perfume Men's Perfume - 100 ml</h2>
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <p className="stock">In Stock</p>
                                    
//                                     <p className="rating">
//                                         <i className="fas fa-star"></i>
//                                         <i className="fas fa-star"></i>
//                                         <i className="fas fa-star"></i>
//                                         <i className="fas fa-star"></i>
//                                         <i className="fas fa-star"></i>
//                                         <span>(93 reviews)</span>
//                                     </p>
//                                 </div>
//                                 <h3 className="price">₹345.00 <del>₹405.00</del></h3>
//                                 <p className="short_description">Maayas Miracle - Denim Series Perfume Men's Perfume Ideal For: Men Fragrance classNameification: Perfume Fragrance Family: Fresh</p>

//                                 <div className="details_single_variant">
//                                     <p className="variant_title">ML :</p>
//                                     <ul className="details_variant_size">
//                                         <li>50</li>
//                                         <li className="active">100</li>
//                                         <li>150</li>
//                                     </ul>
//                                 </div>
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <div className="details_qty_input">
//                                         <button className="minus"><i className="fal fa-minus"></i></button>
//                                         <input type="text" placeholder="01"/>
//                                         <button className="plus"><i className="fal fa-plus"></i></button>
//                                     </div>
//                                     <div className="details_btn_area">
//                                         <a className="common_btn buy_now" href="#">Buy Now <i
//                                                 className="fas fa-long-arrow-right"></i></a>
//                                         <a className="common_btn" href="#">Add to cart <i
//                                                 className="fas fa-long-arrow-right"></i></a>
//                                     </div>
//                                 </div>

//                                 <ul className="details_list_btn">
//                                     <li>
//                                         <a href="#"> <i className="fal fa-heart"></i> Add Wishlist </a>
//                                     </li>
//                                     <li>
//                                         <a href="#"><i className="fal fa-exchange"></i> Compare</a>
//                                     </li>
//                                     <li>
//                                         <a href="#"><i className="fal fa-question-circle"></i> Ask a question</a>
//                                     </li>
//                                 </ul>

//                                 <ul className="details_tags_sku">
//                                     <li><span>SKU:</span> HRYUSG67EG</li>
//                                     <li><span>Category:</span> Men's Perfume</li>
//                                     <li><span>Tag:</span> Men</li>
//                                 </ul>

//                                 <ul className="shop_details_shate">
//                                     <li>Share:</li>
//                                     <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
//                                     <li><a href="#"><i className="fab fa-twitter"></i></a></li>
//                                     <li><a href="#"><i className="fab fa-instagram"></i></a></li>
//                                     <li><a href="#"><i className="fab fa-whatsapp"></i></a></li>
//                                 </ul>

//                             </div>
//                         </div>
//                     </div>
                  
                  
                  
                  
//                     <div className="row mt_90 wow fadeInUp">
//                         <div className="col-12">
//                             <div className="shop_details_des_area">
//                                 <ul className="nav nav-pills" id="pills-tab2" role="tablist">
//                                     <li className="nav-item" role="presentation">
//                                         <button className="nav-link active" id="description-tab" data-bs-toggle="pill"
//                                             data-bs-target="#description" type="button" role="tab"
//                                             aria-controls="description" aria-selected="false">Description</button>
//                                     </li>
//                                     <li className="nav-item" role="presentation">
//                                         <button className="nav-link" id="description-tab2" data-bs-toggle="pill"
//                                             data-bs-target="#description2" type="button" role="tab"
//                                             aria-controls="description2" aria-selected="false">Technical Details</button>
//                                     </li>
//                                     <li className="nav-item" role="presentation">
//                                         <button className="nav-link" id="description-tab3" data-bs-toggle="pill"
//                                             data-bs-target="#description3" type="button" role="tab"
//                                             aria-controls="description3" aria-selected="false">Additional Information</button>
//                                     </li>
//                                     <li className="nav-item" role="presentation">
//                                         <button className="nav-link" id="description-tab4" data-bs-toggle="pill"
//                                             data-bs-target="#description4" type="button" role="tab"
//                                             aria-controls="description4" aria-selected="false">Reviews</button>
//                                     </li>
//                                 </ul>

//                                 <div className="tab-content" id="pills-tabContent2">
//                                     <div className="tab-pane fade show active" id="description" role="tabpanel"
//                                         aria-labelledby="description-tab" tabIndex={0}>
//                                         <div className="shop_details_description">
//                                             <h3>Description</h3>
//                                             <ul>
//                                                 <li>Base Note: Patchouli Indonesia, Oakmoss, Vetiver Haiti</li>
//                                                 <li>Heart Note: Clove Bud, Jasmine Absolute, Nutmeg India</li>
//                                                 <li>Top Note: Armoire Spain, Lavender French, Bergamot Italy, Lemon</li>
//                                             </ul>


//                                         </div>
//                                     </div>
//                                     <div className="tab-pane fade" id="description2" role="tabpanel"
//                                         aria-labelledby="description-tab2" tabIndex={0}>
//                                         <div className="shop_details_additional_info">
//                                             <div className="table-responsive">
//                                                 <table className="table table-striped">
//                                                     <tbody>
//                                                         <tr>
//                                                             <th>Manufacturer</th>
//                                                             <td>
//                                                                 Mayas Perfume World
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th>Country of Origin</th>
//                                                             <td>
//                                                                 India
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th>Item part number</th>
//                                                             <td>
//                                                                 Miracle - 100
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th>ASIN</th>
//                                                             <td>
//                                                                 B0D3XQ5GHR
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th>Frame</th>
//                                                             <td>
//                                                                 Aluminum
//                                                             </td>
//                                                         </tr>
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="tab-pane fade" id="description3" role="tabpanel"
//                                         aria-labelledby="description-tab3" tabIndex={0}>
//                                         <div className="shop_details_additional_info">
//                                             <div className="table-responsive">
//                                                 <table className="table table-striped">
//                                                     <tbody>
//                                                         <tr>
//                                                             <th>Manufacturer</th>
//                                                             <td>
//                                                                 Mayas Perfume World, Mayas Perfume World, D-209, Green Park, Baramati, Dist: Pune. India-413133 mayas, email: info@mayasperfumes.com | www.mayasperfumes.com, perfume world Customer Care: +917522980101
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th>Packer</th>
//                                                             <td>
//                                                                 BIG ELEPHANT MARKETING PRIVATE LIMITED, RS. NO. 184, CTS NO. 5855, CONGRESS ROAD, S. V. NAGAR. TILAKWADI, Belagavi.590001. e-mail: bigelephantmarketingpvtltd@gmail.com
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th>Net Quantity</th>
//                                                             <td>
//                                                                 100.0 Milliliters
//                                                             </td>
//                                                         </tr>
//                                                         <tr>
//                                                             <th>Best Sellers Rank</th>
//                                                             <td>
//                                                                 #242,577 in Beauty (See Top 100 in Beauty) #6,164 in Perfume
//                                                             </td>
//                                                         </tr>
                                                        
//                                                     </tbody>
//                                                 </table>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="tab-pane fade" id="description4" role="tabpanel"
//                                         aria-labelledby="description-tab4" tabIndex={0}>
//                                         <div className="shop_details_review">

//                                             <div className="single_review_list_area">
//                                                 <h3>Customer Reviews</h3>
//                                                 <div className="single_review">
//                                                     <div className="img">
//                                                         <img src="assets/images/testimonial_img_2.jpg" alt="Reviews"
//                                                             className="img-fluid w-100"/>
//                                                     </div>
//                                                     <div className="text">
//                                                         <h5>
//                                                             sumona islam
//                                                             <span>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                             </span>
//                                                         </h5>
//                                                         <p className="date">05 January 2025</p>
//                                                         <p className="description">Lorem ipsum dolor sit amet,
//                                                             consectetur adipisicing elit. Delectus
//                                                             exercitationem accusantium obcaecati quos voluptate
//                                                             nesciunt facilis itaque.</p>
//                                                         <ul>
//                                                             <li>
//                                                                 <img src="assets/images/product_13.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_9.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_20.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_24.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_6.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                                 <div className="single_review">
//                                                     <div className="img">
//                                                         <img src="assets/images/comment_1.png" alt="Reviews"
//                                                             className="img-fluid w-100"/>
//                                                     </div>
//                                                     <div className="text">
//                                                         <h5>Smith Jhon
//                                                             <span>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="far fa-star"></i>
//                                                             </span>
//                                                         </h5>
//                                                         <p className="date">03 April 2025</p>
//                                                         <p className="description">Lorem ipsum dolor sit amet,
//                                                             consectetur adipisicing elit. Delectus
//                                                             exercitationem accusantium obcaecati quos voluptate.
//                                                         </p>
//                                                         <ul>
//                                                             <li>
//                                                                 <img src="assets/images/product_20.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_24.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_6.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                                 <div className="single_review">
//                                                     <div className="img">
//                                                         <img src="assets/images/comment_2.png" alt="Reviews"
//                                                             className="img-fluid w-100"/>
//                                                     </div>
//                                                     <div className="text">
//                                                         <h5>
//                                                             arun singh
//                                                             <span>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                             </span>
//                                                         </h5>
//                                                         <p className="date">10 March 2025</p>
//                                                         <p className="description">Lorem ipsum dolor sit amet,
//                                                             consectetur adipisicing elit. Delectus
//                                                             exercitationem accusantium obcaecati quos voluptate
//                                                             nesciunt facilis itaque</p>
//                                                         <ul>
//                                                             <li>
//                                                                 <img src="assets/images/product_13.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_9.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_20.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_24.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_6.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                                 <div className="single_review">
//                                                     <div className="img">
//                                                         <img src="assets/images/testimonial_img_2.jpg" alt="Reviews"
//                                                             className="img-fluid w-100"/>
//                                                     </div>
//                                                     <div className="text">
//                                                         <h5>
//                                                             sumona islam
//                                                             <span>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                                 <i className="fas fa-star"></i>
//                                                             </span>
//                                                         </h5>
//                                                         <p className="date">05 January 2025</p>
//                                                         <p className="description">Lorem ipsum dolor sit amet,
//                                                             consectetur adipisicing elit. Delectus
//                                                             exercitationem accusantium obcaecati quos voluptate
//                                                             nesciunt facilis itaque.</p>

//                                                         <ul>
//                                                             <li>
//                                                                 <img src="assets/images/product_9.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                             <li>
//                                                                 <img src="assets/images/product_20.png" alt="Image"
//                                                                     className="img-fluid w-100"/>
//                                                             </li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                                 <div className="row">
//                                                     <div className="pagination_area">
//                                                         <nav aria-label="...">
//                                                             <ul className="pagination justify-content-start mt_25">
//                                                                 <li className="page-item">
//                                                                     <a className="page-link" href="#">
//                                                                         <i className="far fa-arrow-left"></i>
//                                                                     </a>
//                                                                 </li>
//                                                                 <li className="page-item">
//                                                                     <a className="page-link active" href="#">01</a>
//                                                                 </li>
//                                                                 <li className="page-item">
//                                                                     <a className="page-link" href="#">02</a>
//                                                                 </li>
//                                                                 <li className="page-item">
//                                                                     <a className="page-link" href="#">03</a>
//                                                                 </li>
//                                                                 <li className="page-item">
//                                                                     <a className="page-link" href="#">
//                                                                         <i className="far fa-arrow-right"></i>
//                                                                     </a>
//                                                                 </li>
//                                                             </ul>
//                                                         </nav>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

   
//             </div>
//         </div>
//     </section> */}
















import React from "react"
import { notFound } from "next/navigation"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import ProductActions from "@modules/products/components/product-actions" // <-- तुझं दिलेलं logic

type ProductTemplateProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  product,
  region,
  countryCode,
}) => {
  if (!product || !product.id) {
    return notFound()
  }

  const mainImage = product.images?.[0]?.url || "/assets/images/placeholder.png"
  const { cheapestPrice } = getProductPrice({ product })

  return (
    <>
      <section
        className="page_banner"
        style={{ background: "url(/assets/images/page_banner_bg.jpg)" }}
      >
        <div className="page_banner_overlay">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="page_banner_text wow fadeInUp">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fal fa-home-lg"></i> Home
                      </a>
                    </li>
                    <li>
                      <a href="#">Shop</a>
                    </li>
                    <li>
                      <a href="#">Shop Details</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="shop_details mt_100">
        <div className="container">
          <div className="row">
            <div className="col-xxl-10">
              <div className="row">
                {/* Images */}
                <div className="col-lg-6 col-md-10 wow fadeInLeft">
                  <div className="shop_details_slider_area">
                    <div className="row">
                      <div className="col-xl-2 col-lg-3 col-md-3 order-2 order-md-1">
                        <div className="row details_slider_nav">
                          {product.images?.map((img, idx) => (
                            <div className="col-12" key={img.id || idx}>
                              <div className="details_slider_nav_item">
                                <img
                                  src={img.url}
                                  alt={product.title}
                                  className="img-fluid w-100"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-xl-10 col-lg-9 col-md-9 order-md-1">
                        <div className="row details_slider_thumb">
                          <div className="col-12">
                            <div className="details_slider_thumb_item">
                              <img
                                src={mainImage}
                                alt={product.title}
                                className="img-fluid w-100"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="col-lg-6 wow fadeInUp">
                  <div className="shop_details_text">
                    <p className="category">
                      {product.collection?.title ||
                        product.categories?.[0]?.name ||
                        "Category"}
                    </p>
                    <h2 className="details_title">{product.title}</h2>
                    <div className="d-flex flex-wrap align-items-center">
                      <p className="stock">
                        {product.status === "published"
                          ? "In Stock"
                          : "Out of Stock"}
                      </p>
                      <p className="rating">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <span>(22 reviews)</span>
                      </p>
                    </div>

                   
         
                    
                    <p className="short_description">
                      {product.description}
                    </p>

                    {/* New Variant Selector & Add to Cart */}
                   
                    <ProductActions product={product} region={region} />

                    <ul className="details_list_btn">
                                    <li>
                                        <a href="#"> <i className="fal fa-heart"></i> Add Wishlist </a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fal fa-exchange"></i> Compare</a>
                                    </li>
                                    <li>
                                        <a href="#"><i className="fal fa-question-circle"></i> Ask a question</a>
                                    </li>
                                </ul>

                    {/* SKU, Category, Tags */}
                    <ul className="details_tags_sku">
                      <li>
                        <span>SKU:</span>
                      </li>
                      <li>
                        <span>Category:</span>{" "}
                      </li>
                      <li>
                        <span>Tag:</span>{" "}
                        {product.tags?.map((t) => t.value).join(", ") || "N/A"}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductTemplate
