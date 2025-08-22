// "use client"

// import { addToCart } from "@lib/data/cart"
// import { useIntersection } from "@lib/hooks/use-in-view"
// import { HttpTypes } from "@medusajs/types"
// import { Button } from "@medusajs/ui"
// import Divider from "@modules/common/components/divider"
// import OptionSelect from "@modules/products/components/product-actions/option-select"
// import { isEqual } from "lodash"
// import { useParams } from "next/navigation"
// import { useEffect, useMemo, useRef, useState } from "react"
// import ProductPrice from "../product-price"
// import MobileActions from "./mobile-actions"

// type ProductActionsProps = {
//   product: HttpTypes.StoreProduct
//   region: HttpTypes.StoreRegion
//   disabled?: boolean
// }

// const optionsAsKeymap = (
//   variantOptions: HttpTypes.StoreProductVariant["options"]
// ) => {
//   return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
//     acc[varopt.option_id] = varopt.value
//     return acc
//   }, {})
// }

// export default function ProductActions({
//   product,
//   disabled,
// }: ProductActionsProps) {
//   const [options, setOptions] = useState<Record<string, string | undefined>>({})
//   const [isAdding, setIsAdding] = useState(false)
//   const countryCode = useParams().countryCode as string

//   // If there is only 1 variant, preselect the options
//   useEffect(() => {
//     if (product.variants?.length === 1) {
//       const variantOptions = optionsAsKeymap(product.variants[0].options)
//       setOptions(variantOptions ?? {})
//     }
//   }, [product.variants])

//   const selectedVariant = useMemo(() => {
//     if (!product.variants || product.variants.length === 0) {
//       return
//     }

//     return product.variants.find((v) => {
//       const variantOptions = optionsAsKeymap(v.options)
//       return isEqual(variantOptions, options)
//     })
//   }, [product.variants, options])

//   // update the options when a variant is selected
//   const setOptionValue = (optionId: string, value: string) => {
//     setOptions((prev) => ({
//       ...prev,
//       [optionId]: value,
//     }))
//   }

//   //check if the selected options produce a valid variant
//   const isValidVariant = useMemo(() => {
//     return product.variants?.some((v) => {
//       const variantOptions = optionsAsKeymap(v.options)
//       return isEqual(variantOptions, options)
//     })
//   }, [product.variants, options])

//   // check if the selected variant is in stock
//   const inStock = useMemo(() => {
//     // If we don't manage inventory, we can always add to cart
//     if (selectedVariant && !selectedVariant.manage_inventory) {
//       return true
//     }

//     // If we allow back orders on the variant, we can add to cart
//     if (selectedVariant?.allow_backorder) {
//       return true
//     }

//     // If there is inventory available, we can add to cart
//     if (
//       selectedVariant?.manage_inventory &&
//       (selectedVariant?.inventory_quantity || 0) > 0
//     ) {
//       return true
//     }

//     // Otherwise, we can't add to cart
//     return false
//   }, [selectedVariant])

//   const actionsRef = useRef<HTMLDivElement>(null)

//   const inView = useIntersection(actionsRef, "0px")

//   // add the selected variant to the cart
//   const handleAddToCart = async () => {
//     if (!selectedVariant?.id) return null

//     setIsAdding(true)

//     await addToCart({
//       variantId: selectedVariant.id,
//       quantity: 1,
//       countryCode,
//     })

//     setIsAdding(false)
//   }

//   return (
//     <>
//       <div className="flex flex-col gap-y-2" ref={actionsRef}>
//         <div>
//           {(product.variants?.length ?? 0) > 1 && (
//             <div className="flex flex-col gap-y-4">
//               {(product.options || []).map((option) => {
//                 return (
//                   <div key={option.id}>
//                     <OptionSelect
//                       option={option}
//                       current={options[option.id]}
//                       updateOption={setOptionValue}
//                       title={option.title ?? ""}
//                       data-testid="product-options"
//                       disabled={!!disabled || isAdding}
//                     />
//                   </div>
//                 )
//               })}
//               <Divider />
//             </div>
//           )}
//         </div>

//         <ProductPrice product={product} variant={selectedVariant} />

//         <Button
//           onClick={handleAddToCart}
//           disabled={
//             !inStock ||
//             !selectedVariant ||
//             !!disabled ||
//             isAdding ||
//             !isValidVariant
//           }
//           variant="primary"
//           className="w-full h-10"
//           isLoading={isAdding}
//           data-testid="add-product-button"
//         >
//           {!selectedVariant && !options
//             ? "Select variant"
//             : !inStock || !isValidVariant
//             ? "Out of stock"
//             : "Add to cart"}
//         </Button>
//         <MobileActions
//           product={product}
//           // variant={selectedVariant}
//           options={options}
//           updateOptions={setOptionValue}
//           inStock={inStock}
//           handleAddToCart={handleAddToCart}
//           isAdding={isAdding}
//           show={!inView}
//           optionsDisabled={!!disabled || isAdding}
//         />
//       </div>
//     </>
//   )
// }








"use client"

import { addToCart } from "@lib/data/cart"
import { useIntersection } from "@lib/hooks/use-in-view"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import Divider from "@modules/common/components/divider"
import { isEqual } from "lodash"
import { useParams } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductPrice from "../product-price"
import MobileActions from "./mobile-actions"
import { useRouter } from "next/navigation"

type ProductActionsProps = {
  product: HttpTypes.StoreProduct
  region: HttpTypes.StoreRegion
  disabled?: boolean
}

const optionsAsKeymap = (
  variantOptions: HttpTypes.StoreProductVariant["options"]
) => {
  return variantOptions?.reduce((acc: Record<string, string>, varopt: any) => {
    acc[varopt.option_id] = varopt.value
    return acc
  }, {})
}

export default function ProductActions({
  product,
  disabled,
}: ProductActionsProps) {
  const [options, setOptions] = useState<Record<string, string | undefined>>({})
  const [isAdding, setIsAdding] = useState(false)
  const countryCode = useParams().countryCode as string
  const [quantity, setQuantity] = useState(1)


  useEffect(() => {
    if (product.variants?.length === 1) {
      const variantOptions = optionsAsKeymap(product.variants[0].options)
      setOptions(variantOptions ?? {})
    }
  }, [product.variants])

  const selectedVariant = useMemo(() => {
    if (!product.variants || product.variants.length === 0) return
    return product.variants.find((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const setOptionValue = (optionId: string, value: string) => {
    setOptions((prev) => ({
      ...prev,
      [optionId]: value,
    }))
  }

  const isValidVariant = useMemo(() => {
    return product.variants?.some((v) => {
      const variantOptions = optionsAsKeymap(v.options)
      return isEqual(variantOptions, options)
    })
  }, [product.variants, options])

  const inStock = useMemo(() => {
    if (selectedVariant && !selectedVariant.manage_inventory) return true
    if (selectedVariant?.allow_backorder) return true
    if (
      selectedVariant?.manage_inventory &&
      (selectedVariant?.inventory_quantity || 0) > 0
    )
      return true
    return false
  }, [selectedVariant])

  const actionsRef = useRef<HTMLDivElement>(null)
  const inView = useIntersection(actionsRef, "0px")

    const router = useRouter()
  const handleAddToCart = async () => {
    if (!selectedVariant?.id) return null
    setIsAdding(true)
    await addToCart({
      variantId: selectedVariant.id,
      quantity: 1,
      countryCode,

    })
    setIsAdding(false)
     
  }

  return (
    <div className="flex flex-col gap-y-2" ref={actionsRef}>
      {/* Custom Variant Selector */}
      {(product.options || []).map((option) => (
        <div key={option.id} className="details_single_variant">
          <p className="variant_title">{option.title}:</p>
          <ul className="details_variant_size">
            {option.values?.map((value) => {
              const isActive = options[option.id] === value.value
              return (
                <li
                  key={value.id}
                  className={isActive ? "active" : ""}
                  onClick={() =>
                    !disabled && !isAdding && setOptionValue(option.id, value.value)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {value.value}
                </li>
              )
            })}
          </ul>
        </div>
      ))}



     
<Divider />

<ProductPrice product={product} variant={selectedVariant} />

{/* Quantity and Buttons */}
<div className="d-flex flex-wrap align-items-center">
  <div className="details_qty_input ">
    <button
      className="minus px-3 py-2"
      onClick={() =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
      }
    >
      <i className="fal fa-minus"></i>
    </button>
    <input
      type="text"
      value={quantity}
      onChange={(e) => {
        const val = parseInt(e.target.value) || 1
        setQuantity(val > 0 ? val : 1)
      }}
      className="w-12 text-center border-l border-r"
    />
    <button
      className="plus px-3 py-2"
      onClick={() => setQuantity((prev) => prev + 1)}
    >
      <i className="fal fa-plus"></i>
    </button>
  </div>

  <div className="details_btn_area flex gap-2">
    <button
      className="common_btn buy_now"
      disabled={!inStock || !selectedVariant || isAdding}
      onClick={() => {
        // Buy Now logic
      }}
    >
      Buy Now <i className="fas fa-long-arrow-right"></i>
    </button>

    <button
    
      className="common_btn"
      
      onClick={handleAddToCart}
      disabled={
        !inStock || !selectedVariant || !!disabled || isAdding || !isValidVariant
      }
    >
      Add to cart <i className="fas fa-long-arrow-right"></i>
    </button>
  </div>
</div>


    
    </div>
  )
}
