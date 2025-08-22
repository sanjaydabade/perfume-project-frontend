"use client"

import { useEffect, useState } from "react"
import { retrieveCart } from "@lib/data/cart"
import { retrieveCustomer } from "@lib/data/customer"
import PaymentWrapper from "@modules/checkout/components/payment-wrapper"
import CheckoutForm from "@modules/checkout/templates/checkout-form"
import CheckoutSummary from "@modules/checkout/templates/checkout-summary"
import CartTotals from "@modules/common/components/cart-totals"
import { useRouter } from "next/navigation"
import type { HttpTypes } from "@medusajs/types"


export default function CheckoutPage({
  params,
  searchParams,
}: {
  params: { countryCode: string }
  searchParams: { step?: string }
}) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState("login") // login, address, payment
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(null)
  const [cart, setCart] = useState<HttpTypes.StoreCart | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("")
  const [billingAddress, setBillingAddress] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    country: "",
    city: "",
    state: "",
    zip: "",
    address: ""
  })
  const [orderNotes, setOrderNotes] = useState("")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [loading, setLoading] = useState(true)

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const customerData = await retrieveCustomer()
        const cartData = await retrieveCart()
        
        if (customerData) {
          setIsLoggedIn(true)
          setCustomer(customerData)
          setCurrentStep("address")
        } else {
          setIsLoggedIn(false)
          setCurrentStep("login")
        }
        
        if (cartData) {
          setCart(cartData)
        }
        
        setLoading(false)
      } catch (error) {
        console.error("Error checking auth:", error)
        setLoading(false)
      }
    }

    checkAuth()
  }, [])


  
  // Handle login
  const handleLogin = async (email: string, password: string) => {
    try {
      // Here you would implement actual login logic
      // For now, we'll simulate a successful login
      const customerData = await retrieveCustomer()
      if (customerData) {
        setIsLoggedIn(true)
        setCustomer(customerData)
        setCurrentStep("address")
      }
    } catch (error) {
      console.error("Login error:", error)
    }
  }

  // Proper logout then go to register
  const handleLogout = async () => {
    try {
      const base = process.env.NEXT_PUBLIC_MEDUSA_API_URL || ""
      await fetch(`${base}/store/auth/logout`, {
        method: "POST",
        credentials: "include",
      }).catch(() => {})
    } catch {}
    setIsLoggedIn(false)
    setCurrentStep("login")
    // Redirect to the main account page which has proper routing
    router.push(`/${params.countryCode}/account`)
  }

  // Handle address selection
  const handleAddressSelect = (addressId: string) => {
    setSelectedAddress(addressId)
  }

  // Handle payment method selection
  const handlePaymentMethodSelect = (method: string) => {
    setSelectedPaymentMethod(method)
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handlePlaceOrder()
  }

  // Place order (shared by summary button and form submit)
  const handlePlaceOrder = async () => {
    if (!termsAccepted) {
      alert("Please accept the terms and conditions")
      return
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method")
      return
    }

    if (!cart || !cart.items || cart.items.length === 0) {
      alert("Your cart is empty")
      return
    }

    try {
      // Map our UI billingAddress into Medusa address shape
      const [firstName, ...restName] = (billingAddress.name || "").trim().split(" ")
      const lastName = restName.join(" ")
      const medusaAddress = {
        first_name: firstName || undefined,
        last_name: lastName || undefined,
        address_1: billingAddress.address || undefined,
        address_2: undefined,
        company: billingAddress.company || undefined,
        postal_code: billingAddress.zip || undefined,
        city: billingAddress.city || undefined,
        country_code: (billingAddress.country || "").toLowerCase() || undefined,
        province: billingAddress.state || undefined,
        phone: billingAddress.phone || undefined,
      }

      const res = await fetch("/api/cart/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: billingAddress.email || customer?.email,
          shipping_address: medusaAddress,
          billing_address: medusaAddress,
          payment_method: selectedPaymentMethod,
        }),
      })
      if (!res.ok) {
        const msg = await res.json().catch(() => null)
        throw new Error(msg?.message || "Failed to complete cart")
      }
      const data = await res.json()

      if (data?.type === "order" && data?.orderId) {
        const cc = data?.countryCode || params.countryCode
        // Redirect to account orders list (as requested)
        window.location.href = `/${cc}/account/orders`
        return
      }

      // Fallback
      window.location.href = `/${params.countryCode}/account/orders`
    } catch (error) {
      console.error("Order submission error:", error)
      alert("Error placing order. Please try again.")
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  // Login Step
  if (currentStep === "login") {
    return (
      <section className="checkout_page mt_100 mb_100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="login_form">
                <h3>Login to Continue</h3>
                <form onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)
                  handleLogin(
                    formData.get("email") as string,
                    formData.get("password") as string
                  )
                }}>
                  <div className="single_input">
                    <label>Email *</label>
                    <input type="email" name="email" required />
                  </div>
                  <div className="single_input">
                    <label>Password *</label>
                    <input type="password" name="password" required />
                  </div>
                  <button type="submit" className="common_btn">Login</button>
                </form>
                <p className="mt-3">
                  Don't have an account? <a href={`/${params.countryCode}/account/register`}>Register here</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Main Checkout Form
  return (
    <>
    
      <section className="checkout_page mt_100 mb_100">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 wow fadeInUp">
              <form onSubmit={handleSubmit}>
                {/* Customer Info Header */}
                <div className="checkout_header">
                  <h3>Shipping Information</h3>
                  <p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                      stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                    account: <b>{customer?.first_name} {customer?.last_name}</b>{" "}
                    <button type="button" onClick={handleLogout} className="text-primary underline bg-transparent border-0 p-0">
                      (logout)
                    </button>
                  </p>
                </div>



                {/* Billing Address */}
                <div className="checkout_form_area">
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item border-0">
                      <div className="accordion-header">
                        <div className="accordion-button collapsed p-0" data-bs-toggle="collapse"
                          role="tabpanel" data-bs-target="#collapseThree" aria-expanded="false"
                          aria-controls="collapseThree">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value=""
                              id="flexCheckDefault" defaultChecked/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              Bill to a different address?
                            </label>
                          </div>
                        </div>
                      </div>
                      <div id="collapseThree" className="accordion-collapse collapse show"
                        data-bs-parent="#accordionExample">
                        <div className="accordion-body p-0">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="single_input">
                                <label>Name *</label>
                                <input 
                                  type="text" 
                                  placeholder="Enter the name"
                                  value={billingAddress.name}
                                  onChange={(e) => setBillingAddress({...billingAddress, name: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="single_input">
                                <label>Email *</label>
                                <input 
                                  type="email" 
                                  placeholder="Enter the email"
                                  value={billingAddress.email}
                                  onChange={(e) => setBillingAddress({...billingAddress, email: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="single_input">
                                <label>Phone</label>
                                <input 
                                  type="text" 
                                  placeholder="Enter the mobile Number"
                                  value={billingAddress.phone}
                                  onChange={(e) => setBillingAddress({...billingAddress, phone: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="single_input">
                                <label>Company name</label>
                                <input 
                                  type="text" 
                                  placeholder="Company Name"
                                  value={billingAddress.company}
                                  onChange={(e) => setBillingAddress({...billingAddress, company: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="single_input">
                                <label>Country</label>
                                <select 
                                  className="select_2"
                                  value={billingAddress.country}
                                  onChange={(e) => setBillingAddress({...billingAddress, country: e.target.value})}
                                >
                                 
                                  <option value="IN">India</option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="single_input">
                                <label>City</label>
                                <input 
                                  type="text" 
                                  placeholder="City"
                                  value={billingAddress.city}
                                  onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="single_input">
                                <label>State</label>
                                <input 
                                  type="text" 
                                  placeholder="State"
                                  value={billingAddress.state}
                                  onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="single_input">
                                <label>ZIP</label>
                                <input 
                                  type="text" 
                                  placeholder="12345"
                                  value={billingAddress.zip}
                                  onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})}
                                />
                              </div>
                            </div>
                            <div className="col-xl-12">
                              <div className="single_input">
                                <label>Address</label>
                                <textarea 
                                  rows={4} 
                                  placeholder="Write your address"
                                  value={billingAddress.address}
                                  onChange={(e) => setBillingAddress({...billingAddress, address: e.target.value})}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12">
                    <div className="single_input">
                      <label>Order notes (optional)</label>
                      <textarea 
                        rows={2} 
                        placeholder="Note"
                        value={orderNotes}
                        onChange={(e) => setOrderNotes(e.target.value)}
                      />
                    </div>
                  </div>
          </div>
              </form>
          </div>

            {/* Order Summary */}
            {cart && (
              <CartTotals 
                totals={{
                  total: cart.total,
                  subtotal: cart.subtotal,
                  tax_total: cart.tax_total,
                  discount_total: cart.discount_total,
                  currency_code: cart.currency_code || "usd"
                }}
                items={cart.items || []}
                cart={cart}
                hideButtons={true}
                showPaymentMethods={true}
                selectedPaymentMethod={selectedPaymentMethod}
                onSelectPaymentMethod={handlePaymentMethodSelect}
                termsAccepted={termsAccepted}
                onToggleTerms={setTermsAccepted}
                onPlaceOrder={handlePlaceOrder}
              />
            )}
        </div>
      </div>
    </section>
    </>
  )
}



  