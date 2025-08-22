import { NextResponse } from "next/server"
import { sdk } from "@lib/config"
import { getAuthHeaders, getCartId } from "@lib/data/cookies"

export async function POST(request: Request) {
  try {
    const id = await getCartId()
    if (!id) {
      return NextResponse.json(
        { message: "No existing cart found" },
        { status: 400 }
      )
    }

    const headers = {
      ...(await getAuthHeaders()),
    }

    // Try to read payload to prepare cart (email/addresses/payment)
    let body: any = null
    try {
      body = await request.json()
    } catch {}

    if (body) {
      // Update email and addresses if provided
      const updateData: any = {}
      if (body.email) updateData.email = body.email
      if (body.shipping_address) updateData.shipping_address = body.shipping_address
      if (body.billing_address) updateData.billing_address = body.billing_address

      if (Object.keys(updateData).length > 0) {
        await sdk.store.cart.update(id, updateData, {}, headers)
      }

      // Ensure at least one shipping method
      try {
        const shipOptions = await sdk.client.fetch<{ shipping_options: any }>(
          "/store/shipping-options",
          { query: { cart_id: id }, headers }
        )
        const firstOption = shipOptions?.shipping_options?.[0]
        if (firstOption) {
          await sdk.store.cart.addShippingMethod(
            id,
            { option_id: firstOption.id },
            {},
            headers
          )
        }
      } catch {}

      // Initiate payment session for selected method -> map to provider_id
      const pm: string | undefined = body.payment_method
      let providerId: string | undefined
      if (["cod", "bank_transfer", "cheque", "manual"].includes(pm || "")) {
        providerId = "pp_system_default"
      } else if (pm === "paypal") {
        providerId = "pp_paypal_paypal"
      } else if (pm === "card" || pm === "stripe") {
        providerId = "pp_stripe_stripe"
      }
      try {
        if (providerId) {
          const cartResp = await sdk.client.fetch<{ cart: any }>(
            `/store/carts/${id}`,
            { method: "GET", headers }
          )
          const init = await sdk.store.payment.initiatePaymentSession(
            cartResp.cart,
            { provider_id: providerId },
            {},
            headers
          )

          // For stripe-like providers, an additional confirm step may be required on frontend
          // Here we only ensure a session exists so complete() doesn't fail
          if (!init) {
            throw new Error("Failed to initiate payment session")
          }
        }
      } catch {}
    }

    let cartRes: any
    try {
      cartRes = await sdk.store.cart.complete(id, {}, headers)
    } catch (e: any) {
      const msg = e?.message || ""
      if (msg.toLowerCase().includes("payment sessions are required")) {
        // Retry once: fetch cart and ensure a session exists, then complete
        try {
          const cartResp = await sdk.client.fetch<{ cart: any }>(
            `/store/carts/${id}`,
            { method: "GET", headers }
          )
          if (cartResp?.cart && !cartResp.cart.payment_collection) {
            await sdk.store.payment.initiatePaymentSession(
              cartResp.cart,
              { provider_id: "pp_system_default" },
              {},
              headers
            )
          }
        } catch {}
        cartRes = await sdk.store.cart.complete(id, {}, headers)
      } else {
        throw e
      }
    }

    if ((cartRes as any)?.type === "order") {
      const orderId = (cartRes as any)?.order?.id
      const countryCode = (cartRes as any)?.order?.shipping_address?.country_code?.toLowerCase()
      return NextResponse.json({ type: "order", orderId, countryCode })
    }

    return NextResponse.json({ type: "cart", cart: (cartRes as any)?.cart ?? null })
  } catch (e: any) {
    return NextResponse.json(
      { message: e?.message || "Failed to complete cart" },
      { status: 500 }
    )
  }
}


