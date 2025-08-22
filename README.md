<p align="center">
  <a href="https://www.medusajs.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://user-images.githubusercontent.com/59018053/229103275-b5e482bb-4601-46e6-8142-244f531cebdb.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    <img alt="Medusa logo" src="https://user-images.githubusercontent.com/59018053/229103726-e5b529a3-9b3f-4970-8a1f-c6af37f087bf.svg">
    </picture>
  </a>
</p>

<h1 align="center">
  Medusa Next.js Starter Template
</h1>

<p align="center">
Combine Medusa's modules for your commerce backend with the newest Next.js 15 features for a performant storefront.</p>

<p align="center">
  <a href="https://github.com/medusajs/medusa/blob/master/CONTRIBUTING.md">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat" alt="PRs welcome!" />
  </a>
  <a href="https://discord.gg/xpCwq3Kfn8">
    <img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Discord Chat" />
  </a>
  <a href="https://twitter.com/intent/follow?screen_name=medusajs">
    <img src="https://img.shields.io/twitter/follow/medusajs.svg?label=Follow%20@medusajs" alt="Follow @medusajs" />
  </a>
</p>

### Prerequisites

To use the [Next.js Starter Template](https://medusajs.com/nextjs-commerce/), you should have a Medusa server running locally on port 9000.
For a quick setup, run:

```shell
npx create-medusa-app@latest
```

Check out [create-medusa-app docs](https://docs.medusajs.com/learn/installation) for more details and troubleshooting.

# Overview

The Medusa Next.js Starter is built with:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Typescript](https://www.typescriptlang.org/)
- [Medusa](https://medusajs.com/)

Features include:

- Full ecommerce support:
  - Product Detail Page
  - Product Overview Page
  - Product Collections
  - Cart
  - Checkout with Stripe
  - User Accounts
  - Order Details
- Full Next.js 15 support:
  - App Router
  - Next fetching/caching
  - Server Components
  - Server Actions
  - Streaming
  - Static Pre-Rendering

# Quickstart

### Setting up the environment variables

Navigate into your projects directory and get your environment variables ready:

```shell
cd nextjs-starter-medusa/
mv .env.template .env.local
```

### Install dependencies

Use Yarn to install all dependencies.

```shell
yarn
```

### Start developing

You are now ready to start up your project.

```shell
yarn dev
```

### Open the code and start customizing

Your site is now running at http://localhost:8000!

# Payment integrations

By default this starter supports the following payment integrations

- [Stripe](https://stripe.com/)

To enable the integrations you need to add the following to your `.env.local` file:

```shell
NEXT_PUBLIC_STRIPE_KEY=<your-stripe-public-key>
```

You'll also need to setup the integrations in your Medusa server. See the [Medusa documentation](https://docs.medusajs.com) for more information on how to configure [Stripe](https://docs.medusajs.com/resources/commerce-modules/payment/payment-provider/stripe#main).

# Resources

## Learn more about Medusa

- [Website](https://www.medusajs.com/)
- [GitHub](https://github.com/medusajs)
- [Documentation](https://docs.medusajs.com/)

## Learn more about Next.js

- [Website](https://nextjs.org/)
- [GitHub](https://github.com/vercel/next.js)
- [Documentation](https://nextjs.org/docs)



















--------------------------------------------------------------------------------------------------------------






@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";





@layer utilities {
  /* Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .no-scrollbar::-webkit-scrollbar-track {
    background-color: transparent;
  }

  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  input:focus ~ label,
  input:not(:placeholder-shown) ~ label {
    @apply -translate-y-2 text-xsmall-regular;
  }

  input:focus ~ label {
    @apply left-0;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: 1px solid #212121;
    -webkit-text-fill-color: #212121;
    -webkit-box-shadow: 0 0 0px 1000px #fff inset;
    transition: background-color 5000s ease-in-out 0s;
  }

  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
}

@layer components {
  .content-container {
    @apply max-w-[1440px] w-full mx-auto px-6;
  }

  .contrast-btn {
    @apply px-4 py-2 border border-black rounded-full hover:bg-black hover:text-white transition-colors duration-200 ease-in;
  }

  .text-xsmall-regular {
    @apply text-[10px] leading-4 font-normal;
  }

  .text-small-regular {
    @apply text-xs leading-5 font-normal;
  }

  .text-small-semi {
    @apply text-xs leading-5 font-semibold;
  }

  .text-base-regular {
    @apply text-sm leading-6 font-normal;
  }

  .text-base-semi {
    @apply text-sm leading-6 font-semibold;
  }

  .text-large-regular {
    @apply text-base leading-6 font-normal;
  }

  .text-large-semi {
    @apply text-base leading-6 font-semibold;
  }

  .text-xl-regular {
    @apply text-2xl leading-[36px] font-normal;
  }

  .text-xl-semi {
    @apply text-2xl leading-[36px] font-semibold;
  }

  .text-2xl-regular {
    @apply text-[30px] leading-[48px] font-normal;
  }

  .text-2xl-semi {
    @apply text-[30px] leading-[48px] font-semibold;
  }

  .text-3xl-regular {
    @apply text-[32px] leading-[44px] font-normal;
  }

  .text-3xl-semi {
    @apply text-[32px] leading-[44px] font-semibold;
  }
}










------------------------------------------

  {/* <script src="/assets/js/animated_barfiller.js"></script>
        <script src="/assets/js/bootstrap.bundle.min.js"></script>
        <script src="/assets/js/custom.js"></script>
        <script src="/assets/js/Font-Awesome.js"></script>
        <script src="/assets/js/jquery-3.7.1.min.js"></script>
        <script src="/assets/js/jquery.countup.min.js"></script>
        <script src="/assets/js/jquery.marquee.min.js"></script>
        <script src="/assets/js/jquery.nice-select.min.js"></script>
        <script src="/assets/js/jquery.pwstabs.min.js"></script>
        <script src="/assets/js/jquery.waypoints.min.js"></script>
        <script src="/assets/js/jquery.youtube-background.min.js"></script>
        <script src="/assets/js/multiple-image-video.js"></script>
        <script src="/assets/js/range_slider.js"></script>
        <script src="/assets/js/scroll_button.js"></script>
        <script src="/assets/js/select2.min.js"></script>
        <script src="/assets/js/simplyCountdown.js"></script>
        <script src="/assets/js/slick.min.js"></script>
        <script src="/assets/js/sticky_sidebar.js"></script>
        <script src="/assets/js/venobox.min.js."></script>
        <script src="/assets/js/wow.min.js"></script> */}









        ---------------------------------

         <body className="home_beauty">
        <main className="relative">{props.children}</main>



     <script src="/assets/js/jquery-3.7.1.min.js"></script>
    {/* <!--bootstrap js--> */}
    <script src="/assets/js/bootstrap.bundle.min.js"></script>
    {/* <!--font-awesome js--> */}
    <script src="/assets/js/Font-Awesome.js"></script>
    {/* <!--counter js--> */}
    <script src="/assets/js/jquery.waypoints.min.js"></script>
    <script src="/assets/js/jquery.countup.min.js"></script>
    {/* <!--nice select js--> */}
    <script src="/assets/js/jquery.nice-select.min.js"></script>
    {/* <!--select 2 js--> */}
    <script src="/assets/js/select2.min.js"></script>
    {/* <!--simply countdown js--> */}
    <script src="/assets/js/simplyCountdown.js"></script>
    {/* <!--slick slider js--> */}
    <script src="/assets/js/slick.min.js"></script>
    {/* <!--venobox js--> */}
    <script src="/assets/js/venobox.min.js"></script>
    {/* <!--wow js--> */}
    <script src="/assets/js/wow.min.js"></script>
    {/* <!--marquee js--> */}
    <script src="/assets/js/jquery.marquee.min.js"></script>
    {/* <!--pws tabs js--> */}
    <script src="/assets/js/jquery.pwstabs.min.js"></script>
    {/* <!--scroll button js--> */}
    <script src="/assets/js/scroll_button.js"></script>
    {/* <!--youtube background js--> */}
    <script src="/assets/js/jquery.youtube-background.min.js"></script>
    {/* <!--range slider js--> */}
    <script src="/assets/js/range_slider.js"></script>
    {/* <!--sticky sidebar js--> */}
    <script src="/assets/js/sticky_sidebar.js"></script>
    {/* <!--multiple image upload js--> */}
    <script src="/assets/js/multiple-image-video.js"></script>
    {/* <!--animated barfiller js--> */}
    <script src="/assets/js/animated_barfiller.js"></script>
    {/* <!--main/custom js--> */}
    <script src="/assets/js/custom.js"></script>

    <script src="/assets/js/init-slick.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jquery.youtube-background/jquery.youtube-background.min.js"></script>


<script type="text/javascript" src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>

      </body>























       <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_6.png" alt="Product" className="img-fluid w-100"/>
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
                            <h3 className="price">₹356.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star-half-alt"></i>
                                <span>49 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_7.png" alt="Product" className="img-fluid w-100"/>
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
                            <h3 className="price">₹367.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                                <span>38 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_8.png" alt="Product" className="img-fluid w-100"/>
                            <ul className="discount_list">
                                <li className="discount"> <b>-</b> 22%</li>
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
                            <h3 className="price"><del>₹85.00</del> $77.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                                <span>07 reviews</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-1-5 col-6 col-md-4 col-xl-3 wow fadeInUp">
                    <div className="beauty_product_item">
                        <div className="img">
                            <img src="assets/images/beauty_pro_9.png" alt="Product" className="img-fluid w-100"/>
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
                            <h3 className="price">₹385.00</h3>
                            <a className="title" href="#">Denim Series Perfume Men's Perfume - 100 ml</a>
                            <p className="rating">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="far fa-star"></i>
                                <i className="far fa-star"></i>
                                <span>53 reviews</span>
                            </p>
                        </div>
                    </div>

                </div>








correct code    


{/* <div className="beauty_product_item">
              <div className="img">
                <img
                  src={product.thumbnail || "assets/images/beauty_pro_5.png"}
                  alt={product.title}
                  className="img-fluid w-100"
                />
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
               <h3 className="price">
  {product.variants &&
  product.variants[0] &&
  product.variants[0].prices &&
  product.variants[0].prices[0] &&
  typeof product.variants[0].prices[0].amount === "number"
    ? `${product.variants[0].prices[0].currency_code?.toUpperCase() || "INR"} ${(
        product.variants[0].prices[0].amount / 100
      ).toFixed(2)}`
    : "Price N/A"}
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
            </div> */}



















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
                <a className="title" href={`/products/${item.product_handle}`}>
                  {item.product_title}
                </a>
                {/* <p>
                  {item.unit_price / 100} 
                </p> */}
                {item.variant?.options?.map((opt) => (
                  <span key={opt.id}>
                    <b>{opt.option?.title}:</b> {opt.value}
                  </span>
                ))}
              </td>

              {/* Unit Price */}
              {/* <td className="cart_page_price">
                <h3>
                  {(item.unit_price / 100).toFixed(2)}{" "}
                 
                </h3>
              </td> */}


              <td className="cart_page_price">
                    <h3>
                        <LineItemUnitPrice item={item} currencyCode={cart.currency_code} />
                    </h3>
                    </td>

              {/* Quantity */}
              <td className="cart_page_quantity">
                <div className="details_qty_input">
                  <button className="minus">
                    <i className="fal fa-minus" aria-hidden="true"></i>
                  </button>
                  <input
                    type="text"
                    value={item.quantity}
                    readOnly
                  />
                  <button className="plus">
                    <i className="fal fa-plus" aria-hidden="true"></i>
                  </button>
                </div>
              </td>

              {/* Total Price */}
              {/* <td className="cart_page_total">
                <h3>
                  {((item.unit_price * item.quantity) / 100).toFixed(2)}{" "}
                 
                </h3>
              </td> */}


              <td className="cart_page_total">
            <h3>
                <LineItemPrice item={item} currencyCode={cart.currency_code} />
            </h3>
            </td>

              {/* Remove */}
              <td className="cart_page_action">
                <a href="#">
                  <i className="fal fa-times"></i> Remove
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>










      // <div>
    //   <div className="pb-3 flex items-center">
    //     <Heading className="text-[2rem] leading-[2.75rem]">Cart</Heading>
    //   </div>
    //   <Table>
    //     <Table.Header className="border-t-0">
    //       <Table.Row className="text-ui-fg-subtle txt-medium-plus">
    //         <Table.HeaderCell className="!pl-0">Item</Table.HeaderCell>
    //         <Table.HeaderCell></Table.HeaderCell>
    //         <Table.HeaderCell>Quantity</Table.HeaderCell>
    //         <Table.HeaderCell className="hidden small:table-cell">
    //           Price
    //         </Table.HeaderCell>
    //         <Table.HeaderCell className="!pr-0 text-right">
    //           Total
    //         </Table.HeaderCell>
    //       </Table.Row>
    //     </Table.Header>
    //     <Table.Body>
    //       {items
    //         ? items
    //             .sort((a, b) => {
    //               return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
    //             })
    //             .map((item) => {
    //               return (
    //                 <Item
    //                   key={item.id}
    //                   item={item}
    //                   currencyCode={cart?.currency_code}
    //                 />
    //               )
    //             })
    //         : repeat(5).map((i) => {
    //             return <SkeletonLineItem key={i} />
    //           })}
    //     </Table.Body>
    //   </Table>
    // </div>
















     <div className="col-lg-4 col-md-9 wow fadeInRight">
                    <div id="sticky_sidebar">
                        <div className="cart_page_summary">
                            <h3>Billing summary</h3>

                            <a href="vendor_details.html" className="vendor_name">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                </svg>
                                Zapier Gallery
                            </a>
                            <ul>
                                <li>
                                    <a className="img" href="#">
                                        <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100"/>
                                    </a>
                                    <div className="text">
                                        <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
                                        <p>$59.00 × 2</p>
                                        <p>Color: Red, Size: XL</p>
                                    </div>
                                </li>
                                <li>
                                    <a className="img" href="#">
                                        <img src="assets/images/product_16.png" alt="Products" className="img-fluid w-100"/>
                                    </a>
                                    <div className="text">
                                        <a className="title" href="shop_details.html">cherry fabric western tops</a>
                                        <p>$75.00 × 1</p>
                                        <p>Color: Orange, Size: M</p>
                                    </div>
                                </li>

                            </ul>
                            <a href="vendor_details.html" className="vendor_name">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" className="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                                </svg>
                                Comfort Gallery
                            </a>
                            <ul>
                                <li>
                                    <a className="img" href="#">
                                        <img src="assets/images/product_18.png" alt="Products" className="img-fluid w-100"/>
                                    </a>
                                    <div className="text">
                                        <a className="title" href="shop_details.html">Full Sleeve Hoodie Jacket</a>
                                        <p>$59.00 × 2</p>
                                        <p>Color: Red, Size: XL</p>
                                    </div>
                                </li>
                            </ul>

                            <h6>subtotal <span>$395.00</span></h6>
                            <h6>Tax <span>(+) $100.00</span></h6>
                            <h6>Discount <span>(-) $45.00</span></h6>
                            <h4>Total <span>$410.00</span></h4>

                            <form action="#">
                                <input type="text" placeholder="Coupon code"/>
                                <button type="submit" className="common_btn">Apply</button>
                                <p>
                                    Coupon Code: HEM4556JL
                                    <a href="#"><i className="fal fa-times"></i></a>
                                </p>
                            </form>
                        </div>
                        <div className="cart_summary_btn">
                            <a className="common_btn continue_shopping" href="shop.html">Contiue shopping</a>
                            <a className="common_btn" href="checkout.html">checkout <i
                                    className="fas fa-long-arrow-right"></i></a>
                        </div>
                    </div>
                </div>