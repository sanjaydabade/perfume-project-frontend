  import { Text, clx } from "@medusajs/ui"
  import { VariantPrice } from "types/global"

  export default  function PreviewPrice({ price }: { price: VariantPrice }) {
    if (!price) {
      return null
    }

    return (
      <>
        {price.price_type === "sale" && (
          <Text
           className="price"
            data-testid="original-price"
          >
            {price.original_price}
          </Text>
        )}
        <Text
          className={clx("price", {
            "text-ui-fg-interactive": price.price_type === "sale",
          })}
          data-testid="price"
        >
          {price.calculated_price}
        </Text>
      </>
    )
  }



