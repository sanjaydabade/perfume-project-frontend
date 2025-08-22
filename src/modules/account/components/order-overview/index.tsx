"use client"

import { Button } from "@medusajs/ui"

import OrderCard from "../order-card"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

const OrderOverview = ({ orders }: { orders: HttpTypes.StoreOrder[] }) => {
  if (orders?.length) {
    return (
      <div className="grid grid-cols-1 gap-6 w-full max-w-4xl mx-auto">
        {orders.map((o) => (
          <div key={o.id}>
            <OrderCard order={o} />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="w-full flex flex-col items-center gap-y-3 py-10 max-w-4xl mx-auto"
      data-testid="no-orders-container"
    >
      <h2 className="text-2xl font-semibold">No orders yet</h2>
      <p className="text-base-regular text-gray-600">
        You don&apos;t have any orders yet, let us change that :)
      </p>
      <div className="mt-4">
        <LocalizedClientLink href="/" passHref>
          <Button data-testid="continue-shopping-button" className="px-5 py-2">
            Continue shopping
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default OrderOverview
