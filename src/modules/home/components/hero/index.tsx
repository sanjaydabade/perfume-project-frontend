// import { Github } from "@medusajs/icons"
// import { Button, Heading } from "@medusajs/ui"

// const Hero = () => {
//   return (
//     <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
//       <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
//         <span>
//           <Heading
//             level="h1"
//             className="text-3xl leading-10 text-ui-fg-base font-normal"
//           >
//             Ecommerce Starter Template
//           </Heading>
//           <Heading
//             level="h2"
//             className="text-3xl leading-10 text-ui-fg-subtle font-normal"
//           >
//             Powered by Medusa and Next.js
//           </Heading>
//         </span>
//         <a
//           href="https://github.com/medusajs/nextjs-starter-medusa"
//           target="_blank"
//         >
//           <Button variant="secondary">
//             View on GitHub
//             <Github />
//           </Button>
//         </a>
//       </div>
//     </div>
//   )
// }

// export default Hero








"use client"
import { useEffect, useState, useRef } from "react"
import axios from "axios"
import { HttpTypes } from "@medusajs/types"
import { getProductPrice } from "@lib/util/get-product-price"
import { addToCart } from "@lib/data/cart"
import { useParams } from "next/navigation"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
// Dynamically import toast to avoid SSR issues
let toast: any;
if (typeof window !== 'undefined') {
  import('react-toastify').then((module) => {
    toast = module.toast;
  });
}


const loadJquery = () => import('jquery')
const loadSlickCarousel = () => import('slick-carousel')

// Initialize jQuery only on client side
let $: any
if (typeof window !== 'undefined') {
  $ = require('jquery')
  require('slick-carousel')
}

const Hero = () => {
  const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:9000/store/products", {
          params: {
            region_id: "reg_01K1G78QJ9STZ2XE68BEVPSKAN",
            limit: 12,
          },
          headers: {
            "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
          },
        })
        setProducts(response.data.products)
      } catch (err: any) {
        if (err.response) {
          console.log("API error response:", err.response.data)
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchProducts()
  }, [])

  const region = {
    id: "reg_01K1G78QJ9STZ2XE68BEVPSKAN",
    name: "India",
    currency_code: "inr",
  }

  const handleAddToCart = async (productId: string) => {
    try {
      // Get the first variant of the product
      const variantId = products.find(p => p.id === productId)?.variants?.[0]?.id
      
      if (!variantId) {
        toast?.error("Product variant not available")
        return
      }

      await addToCart({
        variantId,
        quantity: 1,
        countryCode: 'in',
      })
      
      toast?.success("Product added to cart!")
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast?.error("Failed to add product to cart")
    }
  }

  // Initialize slick carousels
  useEffect(() => {
    if (typeof window === 'undefined') return

    const initSlick = () => {
      if ($(".beauty_banner_slider_large").length > 0 && 
          $(".beauty_banner_slider_small").length > 0) {
        
        // Initialize main slider
        $(".beauty_banner_slider_large").slick({
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          arrows: false,
          dots: false,
          fade: true,
          asNavFor: ".beauty_banner_slider_small",
        });

        // Initialize thumbnail slider
        $(".beauty_banner_slider_small").slick({
          slidesToShow: 3,
          slidesToScroll: 1,
          asNavFor: ".beauty_banner_slider_large",
          autoplay: true,
          autoplaySpeed: 3000,
          dots: false,
          arrows: false,
          centerMode: true,
          centerPadding: "0px",
          focusOnSelect: true,
          vertical: true,
          responsive: [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              },
            },
          ],
        });
      } else {
        // Retry after delay if DOM is not ready
        setTimeout(initSlick, 100);
      }
    };

    // Initialize after short delay to ensure DOM is mounted
    const timer = setTimeout(initSlick, 100);
    
    // Cleanup function to destroy sliders on unmount
    return () => {
      clearTimeout(timer);
      if ($ && $.fn && $.fn.slick) {
        $(".beauty_banner_slider_large, .beauty_banner_slider_small").slick('unslick');
      }
    };
  }, []);

  return (
    <>
   
     <section className="beauty_banner">
        <div className="container">
            <div className="row">
                <div className="col-xl-11">
                    <div className="row beauty_banner_slider_large">
                        <div className="col-xl-12">
                            <div className="beauty_banner_slider_item">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_text">
                                            <h4>For Men</h4>
                                            <h1>Make a Bold Statement</h1>
                                            <p>A fragrance is your signature, a powerful part of your identity. Our collection of men's perfumes is crafted to help you tell your story and leave a lasting impression. </p>
                                            <ul className="d-flex flex-wrap">
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_1.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Long Lasting Formula</b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_2.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Premium Ingredients </b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_3.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>UPTO 25% Perfume Oil </b>
                                                </li>
                                            </ul>
                                            <a className="common_btn" href="#">
                                                shop now
                                                <i className="fas fa-long-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_img">
                                            <div className="img">
                                                <img src="assets/images/banner_beauty_img_2.png" alt="Beauty Banner"
                                                    className="img-fluid w-100"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="beauty_banner_slider_item">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_text">
                                            <h4>For Women</h4>
                                            <h1>Embrace Your Essence </h1>
                                            <p>Your scent is a reflection of your unique spirit. Our collection of women's perfume is designed to celebrate your essence, with aromas that are as intricate and captivating as you to evoke emotions and create lasting memories. </p>
                                            <ul className="d-flex flex-wrap">
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_1.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Long Lasting Formula</b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_2.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Premium Ingredients </b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_3.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>UPTO 25% Perfume Oil </b>
                                                </li>
                                            </ul>
                                            <a className="common_btn" href="#">
                                                shop now
                                                <i className="fas fa-long-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_img">
                                            <div className="img">
                                                <img src="assets/images/banner_beauty_img_1.png" alt="Beauty Banner"
                                                    className="img-fluid w-100"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="beauty_banner_slider_item">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_text">
                                            <h4>For Cars</h4>
                                            <h1>Happiness in the Car </h1>
                                            <p>Your car is more than just a ride; it's your personal space. Our car perfumes are meticulously crafted to transform your daily commute into a luxurious experience and make every journey memorable. </p>
                                            <ul className="d-flex flex-wrap">
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_1.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Long Lasting Formula</b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_2.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Premium Ingredients </b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_3.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>UPTO 25% Perfume Oil </b>
                                                </li>
                                            </ul>
                                            <a className="common_btn" href="#">
                                                shop now
                                                <i className="fas fa-long-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_img">
                                            <div className="img">
                                                <img src="assets/images/banner_beauty_img_3.png" alt="Beauty Banner"
                                                    className="img-fluid w-100"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="beauty_banner_slider_item">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_text">
                                            <h4>Home Fragrances</h4>
                                            <h1>Your Home, Your Scent </h1>
                                            <p>Your home is your personal sanctuary, and the right scent can define its atmosphere. Our home fragrance collection is designed to transform your home into a haven of comfort and luxury to create memorable experiences and a welcoming ambiance. </p>
                                            <ul className="d-flex flex-wrap">
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_1.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Long Lasting Formula</b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_2.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Premium Ingredients </b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_3.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>UPTO 25% Perfume Oil </b>
                                                </li>
                                            </ul>
                                            <a className="common_btn" href="#">
                                                shop now
                                                <i className="fas fa-long-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_img">
                                            <div className="img">
                                                <img src="assets/images/banner_beauty_img_4.png" alt="Beauty Banner"
                                                    className="img-fluid w-100"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="beauty_banner_slider_item">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_text">
                                            <h4>Timeless Attars</h4>
                                            <h1>Experience Pure Essence</h1>
                                            <p>Attar is more than just a perfume; it is an intermix of art and chemistry waiting to be experienced. Our attar collection is a tribute to this heritage that evolves with your skin's warmth to create a fragrance that is uniquely yours. </p>
                                            <ul className="d-flex flex-wrap">
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_1.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Long Lasting Formula</b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_2.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>Premium Ingredients </b>
                                                </li>
                                                <li>
                                                    <span>
                                                        <img src="assets/images/beauty_banner_icon_3.png" alt="Icon"
                                                            className="img-fluid w-100"/>
                                                    </span>
                                                    <b>UPTO 25% Perfume Oil </b>
                                                </li>
                                            </ul>
                                            <a className="common_btn" href="#">
                                                shop now
                                                <i className="fas fa-long-arrow-right"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="beauty_banner_img">
                                            <div className="img">
                                                <img src="assets/images/banner_beauty_img_5.png" alt="Beauty Banner"
                                                    className="img-fluid w-100"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-xl-1 d-none d-xl-block">
                    <div className="beauty_banner_slider_small_area">
                        <div className="beauty_banner_slider_small">

                            <div className="beauty_banner_slider_small_item">
                                <img src="assets/images/banner_beauty_small_img_2.png" alt="banner_small_img"
                                    className="img-fluid"/>
                            </div>

                            <div className="beauty_banner_slider_small_item">
                                <img src="assets/images/banner_beauty_small_img_1.png" alt="banner_small_img"
                                    className="img-fluid"/>
                            </div>
                            <div className="beauty_banner_slider_small_item">
                                <img src="assets/images/banner_beauty_small_img_3.png" alt="banner_small_img"
                                    className="img-fluid"/>
                            </div>
                            <div className="beauty_banner_slider_small_item">
                                <img src="assets/images/banner_beauty_small_img_4.png" alt="banner_small_img"
                                    className="img-fluid"/>
                            </div>
                            <div className="beauty_banner_slider_small_item">
                                <img src="assets/images/banner_beauty_small_img_5.png" alt="banner_small_img"
                                    className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>


<section className="beauty_category mt_100">
        <div className="container">
            <div className="row beauty_category_slider">
                <div className="col-xl-2 wow fadeInUp">
                    <a href="#" className="beauty_category_item">
                        <div className="img">
                            <img src="assets/images/beauty_category_img_1.jpg" alt="Category" className="img-fluid w-100"/>
                        </div>
                        <h4>For Men <span>(20)</span></h4>
                    </a>
                </div>
                <div className="col-xl-2 wow fadeInUp">
                    <a href="#" className="beauty_category_item">
                        <div className="img">
                            <img src="assets/images/beauty_category_img_2.jpg" alt="Category" className="img-fluid w-100"/>
                        </div>
                        <h4>For Women <span>(12)</span></h4>
                    </a>
                </div>
                <div className="col-xl-2 wow fadeInUp">
                    <a href="#" className="beauty_category_item">
                        <div className="img">
                            <img src="assets/images/beauty_category_img_6.jpg" alt="Category" className="img-fluid w-100"/>
                        </div>
                        <h4>Unisex<span>(32)</span></h4>
                    </a>
                </div>
                <div className="col-xl-2 wow fadeInUp">
                    <a href="#" className="beauty_category_item">
                        <div className="img">
                            <img src="assets/images/beauty_category_img_3.jpg" alt="Category" className="img-fluid w-100"/>
                        </div>
                        <h4>For Cars <span>(09)</span></h4>
                    </a>
                </div>
                <div className="col-xl-2 wow fadeInUp">
                    <a href="#" className="beauty_category_item">
                        <div className="img">
                            <img src="assets/images/beauty_category_img_4.jpg" alt="Category" className="img-fluid w-100"/>
                        </div>
                        <h4>For Home <span>(06)</span></h4>
                    </a>
                </div>
                <div className="col-xl-2 wow fadeInUp">
                    <a href="#" className="beauty_category_item">
                        <div className="img">
                            <img src="assets/images/beauty_category_img_5.jpg" alt="Category" className="img-fluid w-100"/>
                        </div>
                        <h4>Timeless Attars <span>(46)</span></h4>
                    </a>
                </div>
            </div>
        </div>
    </section>





{/* product */}

{/* 
<section className="beauty_best_sell_products mt_95">
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-sm-9">
                    <div className="section_heading_beauty mb_15">
                        <h5>Best Selling products</h5>
                        <h3>Our best selling products</h3>
                    </div>
                </div>
                <div className="col-xl-6 col-sm-3">
                    <div className="view_all_btn_area">
                        <a className="view_all_btn" href="#">View all</a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_5.png" alt="Product" className="img-fluid w-100"/>
                            <ul className="btn_list">
                                <li>
                                    <a href="#" onClick={(e) => {
  e.preventDefault();
  handleAddToCart(product.id);
}}> <i className="far fa-heart"></i> </a>
                                </li>
                                <li>
                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                </li>
                            </ul>
                            <a href="#" className="common_btn">Add to Cart</a>
                        </div>
                        <div className="text">
                            <h3 className="price">₹339.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <span>14 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    </section> */}


{/* fetch product code  */}




<section className="beauty_best_sell_products mt_95">
  <div className="container">
    <div className="row">
      <div className="col-xl-6 col-sm-9">
        <div className="section_heading_beauty mb_15">
          <h5>Best Selling products</h5>
          <h3>Our best selling products</h3>
        </div>
      </div>
      <div className="col-xl-6 col-sm-3">
        <div className="view_all_btn_area">
          <a className="view_all_btn" href="#">View all</a>
        </div>
      </div>
    </div>
   <div className="row">
  {loading ? (
    <div className="col-12">
      <p>Loading...</p>
    </div>
  ) : (
    products.map((product) => {
      const { cheapestPrice } = getProductPrice({ product })
      return (
        <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp" key={product.id}>
          <div className="beauty_product_item">
            
            <div className="img">
              <img
                src={product.thumbnail || "/assets/images/beauty_pro_5.png"}
                alt={product.title}
                className="img-fluid w-100"
              />
                <ul className="btn_list">
                    <li>
                    <a href="#" onClick={(e) => {
  e.preventDefault();
  handleAddToCart(product.id);
}}> <i className="far fa-heart"></i> </a>
                    </li>
                    <li>
                    <a href="#"> <i className="far fa-exchange"></i> </a>
                    </li>
                </ul>
                <a href={`/products/${product.handle}`} className="common_btn">Add to Cart</a>
              
            </div>  
            <div className="text">
              <h3 className="price">
            {cheapestPrice ? (
              <>
                {cheapestPrice.price_type === "sale" && (
                  <span style={{ textDecoration: "line-through", color: "#888", marginRight: 8 }}>
                    {cheapestPrice.original_price}
                  </span>
                )}
                <span style={{ color: cheapestPrice.price_type === "sale" ? "#090909ff" : "#222" }}>
                  {cheapestPrice.calculated_price}
                </span>
              </>
            ) : (
              "Price N/A"
            )}
          </h3>
              <a className="title" href="#">{product.title}</a>
               <p className="rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>    
                  <i className="fas fa-star"></i>
                  <span>14 reviews</span>
                </p>
            </div>
          </div>
        </div>
      )
    })
  
  )}
</div>







  </div>
</section>


{/* Beauty product start */}


 <section className="beauty_add_area mt_70">
        <div className="row">
            <div className="col-lg-4 wow fadeInUp">
                <div className="beauty_add_large">
                    <img src="assets/images/beauty_add_large_img_1.jpg" alt="add" className="img-fluid w-100"/>
                    <div className="text">
                        <h4>Black Friday Offer</h4>
                        <h2> Rose Glow div Oil Up To 70% Off</h2>
                        <a className="common_btn" href="#">
                            shop now
                            <i className="fas fa-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 wow fadeInUp">
                {/* <div className="beauty_add_video" style="background: url(assets/images/add_video_bg.jpg);"> */}
                <div
  className="beauty_add_video"
  style={{ backgroundImage: "url('assets/images/add_video_bg.jpg')" }}
>

                    <div id="vbg12" data-vbg-loop="true" data-vbg="https://youtu.be/VdJGeeJg6E0?si=5HfXR62tPUb5XeJf">
                    </div>
                    <div className="container">
                        <div className="row wow fadeInUp" data-wow-duration="1.5s">
                            <div className="col-xl-12">
                                <div className="beauty_add_video_text">
                                    <h2>Skin Care</h2>
                                    <a href="#">Discover The Products<i className="fas fa-arrow-right"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 wow fadeInUp">
                <div className="beauty_add_large beauty_add_large_2">
                    <img src="assets/images/beauty_add_large_img_2.jpg" alt="add" className="img-fluid w-100"/>
                    <div className="text">
                        <h4>Summer Collection</h4>
                        <h2>Ageless Radiance Night Cream</h2>
                        <a className="common_btn" href="#">
                            shop now
                            <i className="fas fa-long-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

  {/* beauty product end */} 





  {/* <!--=================================
        BEAUTY TRENDING PRODUCT START
    ===================================--> */}

    <section className="beauty_trending_product mt_95">
        <div className="container">
            <div className="row">
                <div className="col-xl-6">
                    <div className="section_heading_beauty mb_15">
                        <h5>Trending This Month</h5>
                        <h3>Trending Products</h3>
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="product_tabs">
                        <div data-pws-tab="tab111" data-pws-tab-name="Men">
                            <div className="row">
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_10.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price">₹384.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <span>97 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_1.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="discount_list">
                                                <li className="new">New</li>
                                            </ul>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#" > <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price">₹356.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <span>43 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_2.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="discount_list">
                                                <li className="new"> new</li>
                                                <li className="discount"> <b>-</b> 42%</li>
                                            </ul>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#" > <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price"><del>₹99.00</del> $90.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <span>25 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_3.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price">₹339.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <span>52 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_4.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="discount_list">
                                                <li className="new"> new</li>
                                            </ul>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price">₹363.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <span>74 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_5.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="discount_list">
                                                <li className="discount"> <b>-</b> 67%</li>
                                            </ul>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price"><del>₹405.00</del> ₹345.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <span>41 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_6.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price">₹355.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <span>75 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_7.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="discount_list">
                                                <li className="new"> new</li>
                                            </ul>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price">₹347.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <span>04 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_8.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price">₹361.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <span>23 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3">
                                    <div className="beauty_product_item">
                                        <div className="img">
                                            <img src="assets/images/beauty_pro_9.png" alt="Product"
                                                className="img-fluid w-100"/>
                                            <ul className="discount_list">
                                                <li className="discount"> <b>-</b> 16%</li>
                                            </ul>
                                            <ul className="btn_list">
                                                <li>
                                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                                </li>
                                                <li>
                                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                                </li>
                                            </ul>
                                            <a href="#" className="common_btn">Add to Cart</a>
                                        </div>
                                        <div className="text">
                                            <h3 className="price"><del>₹60.00</del> $51.00</h3>
                                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                                            <p className="rating">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                                <span>28 reviews</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                       
                               
                               
                            </div>
                        
                    
                </div>
            </div>
        </div>
    </section>
    {/* <!--=================================
        BEAUTY TRENDING PRODUCT END
    ===================================--> */}







{/* space */}

 <section className="beauty_features mt_95">
        <div className="container">
            <div className="row">
                <div className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp">
                    <div className="beauty_features_item">
                        <div className="icon">
                            <img src="assets/images/feature-icon_1.svg" alt="feature"/>
                        </div>
                        <div className="text">
                            <h3>Return & refund</h3>
                            <p>Money back guarantee</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp">
                    <div className="beauty_features_item">
                        <div className="icon">
                            <img src="assets/images/feature-icon_3.svg" alt="feature"/>
                        </div>
                        <div className="text">
                            <h3>Quality Support</h3>
                            <p>Always online 24/7</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp">
                    <div className="beauty_features_item">
                        <div className="icon">
                            <img src="assets/images/feature-icon_2.svg" alt="feature"/>
                        </div>
                        <div className="text">
                            <h3>Secure Payment</h3>
                            <p>30% off by subscribing</p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-3 col-sm-6 col-lg-3 wow fadeInUp">
                    <div className="beauty_features_item border-0">
                        <div className="icon">
                            <img src="assets/images/feature-icon_4.svg" alt="feature"/>
                        </div>
                        <div className="text">
                            <h3>Daily Offers</h3>
                            <p>20% off by subscribing</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>













  {/* <!--======================================
        BEAUTY NEW ARRIVAL START
    =======================================--> */}
    <section className="beauty_new_arrival mt_95 mb_95">
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-sm-9">
                    <div className="section_heading_beauty mb_15">
                        <h5>New Arrival</h5>
                        <h3>New Arrival products</h3>
                    </div>
                </div>
                <div className="col-xl-6 col-sm-3">
                    <div className="view_all_btn_area">
                        <a className="view_all_btn" href="#">View all</a>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_11.png" alt="Product" className="img-fluid w-100"/>
                            <ul className="discount_list">
                                <li className="new"> new</li>
                            </ul>
                            <ul className="btn_list">
                                <li>
                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                </li>
                                <li>
                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                </li>
                            </ul>
                            <a href="#" className="common_btn">Add to Cart</a>
                        </div>
                        <div className="text">
                            <h3 className="price">₹350.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <span>07 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_21.png" alt="Product" className="img-fluid w-100"/>
                            <ul className="discount_list">
                                <li className="new">New</li>
                            </ul>
                            <ul className="btn_list">
                                <li>
                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                </li>
                                <li>
                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                </li>
                            </ul>
                            <a href="#" className="common_btn">Add to Cart</a>
                        </div>
                        <div className="text">
                            <h3 className="price">₹372.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                                <span>17 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_12.png" alt="Product" className="img-fluid w-100"/>
                            <ul className="discount_list">
                                <li className="new"> new</li>
                            </ul>
                            <ul className="btn_list">
                                <li>
                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                </li>
                                <li>
                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                </li>
                            </ul>
                            <a href="#" className="common_btn">Add to Cart</a>
                        </div>
                        <div className="text">
                            <h3 className="price">₹344.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                                <i className="far fa-star"></i>
                                <span>66 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_4.png" alt="Product" className="img-fluid w-100"/>
                            <ul className="discount_list">
                                <li className="new"> new</li>
                                <li className="discount"> <b>-</b> 42%</li>
                            </ul>
                            <ul className="btn_list">
                                <li>
                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                </li>
                                <li>
                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                </li>
                            </ul>
                            <a href="#" className="common_btn">Add to Cart</a>
                        </div>
                        <div className="text">
                            <h3 className="price"><del>₹70.00</del> $65.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <span>90 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_4.png" alt="Product" className="img-fluid w-100"/>
                            <ul className="discount_list">
                                <li className="new"> new</li>
                            </ul>
                            <ul className="btn_list">
                                <li>
                                    <a href="#"> <i className="far fa-heart"></i> </a>
                                </li>
                                <li>
                                    <a href="#"> <i className="far fa-exchange"></i> </a>
                                </li>
                            </ul>
                            <a href="#" className="common_btn">Add to Cart</a>
                        </div>
                        <div className="text">
                            <h3 className="price">₹334.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <span>46 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {/* <!--======================================
        BEAUTY NEW ARRIVAL END
    =======================================--> */}

    
    </>
  )

}

export default Hero







// "use client"
// import { useEffect, useState } from "react"
// import axios from "axios"
// import ProductPreviewClient from "@modules/products/components/product-preview/client-wrapper"
// import { HttpTypes } from "@medusajs/types"

// const Hero = () => {
//   const [products, setProducts] = useState<HttpTypes.StoreProduct[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     axios
//       .get("http://localhost:9000/store/products", {
//         params: {
//           region_id: "reg_01K1G78QJ9STZ2XE68BEVPSKAN",
//           limit: 12,
//         },
//         headers: {
//           "x-publishable-api-key": process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY as string,
//         },
//       })
//       .then((res) => {
//         setProducts(res.data.products)
//         setLoading(false)
//       })
//       .catch((err) => {
//         if (err.response) {
//           console.log("API error response:", err.response.data)
//         }
//         setLoading(false)
//       })
//   }, [])
//  const region = {
//   id: "reg_01K1G78QJ9STZ2XE68BEVPSKAN",
//   name: "India",
//   currency_code: "inr",
//  }

//   return (
//     <section>
//       <div>
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <div className="product-grid">
//            {products.map((product) => (
//   <ProductPreviewClient
//     key={product.id}
//     product={product}
//     region={region}
//   />
// ))}
//           </div>
//         )}
//       </div>
//     </section>
//   )
// }

// export default Hero