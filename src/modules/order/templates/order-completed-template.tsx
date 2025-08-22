import { Heading, Text } from "@medusajs/ui"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  return (
    <div className="py-6 min-h-[calc(100vh-64px)]">
      <div className="content-container flex flex-col justify-center items-center gap-y-10 max-w-4xl h-full w-full">
        <div
          className="flex flex-col gap-4 max-w-4xl h-full bg-white w-full py-10"
          data-testid="order-complete-container"
        >
          <Heading level="h1" className="text-ui-fg-base text-3xl mb-2">
            Order Confirmed
          </Heading>
          <Text className="txt-medium text-ui-fg-subtle">
            Thank you! Your order was placed successfully.
          </Text>
          <Text className="txt-small text-ui-fg-subtle">Order ID: {order.id}</Text>
        </div>
      </div>
    </div>
  )
}
