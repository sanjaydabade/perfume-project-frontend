import { clx } from "@medusajs/ui"

import { getProductPrice } from "@lib/util/get-product-price"
import { HttpTypes } from "@medusajs/types"

export default function ProductPrice({
  product,
  variant,
}: {
  product: HttpTypes.StoreProduct
  variant?: HttpTypes.StoreProductVariant
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  })

  const selectedPrice = variant ? variantPrice : cheapestPrice

  if (!selectedPrice) {
    return <div className="block w-32 h-9 bg-gray-100 animate-pulse" />
  }

  return (
    <h3 className="price" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
      {!variant && "From "}
      <span
        data-testid="product-price"
        data-value={selectedPrice.calculated_price_number}
        style={{ fontWeight: "bold", fontSize: "1.5rem" }}
      >
        {selectedPrice.calculated_price}
      </span>
      {selectedPrice.price_type === "sale" && (
        <>
          {" "}
          <del
            data-testid="original-product-price"
            data-value={selectedPrice.original_price_number}
            style={{ fontWeight: "bold", fontSize: "1.5rem" }}
          >
            {selectedPrice.original_price}
          </del>
        </>
      )}
    </h3>
  )
}




