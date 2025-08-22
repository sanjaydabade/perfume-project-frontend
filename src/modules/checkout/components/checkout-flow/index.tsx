"use client"

import { useState, useEffect } from "react"
import { Cart, Customer } from "@medusajs/medusa"
import { useRouter, useSearchParams } from "next/navigation"
import AddressStep from "./address-step"
import PaymentStep from "./payment-step"
import OrderSummary from "./order-summary"

interface CheckoutFlowProps {
  cart: Cart
  customer: Customer
  countryCode: string
}

type CheckoutStep = "address" | "payment" | "review"

export default function CheckoutFlow({ cart, customer, countryCode }: CheckoutFlowProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("address")
  const [selectedAddress, setSelectedAddress] = useState<any>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("")

  useEffect(() => {
    const step = searchParams.get("step") as CheckoutStep
    if (step && ["address", "payment", "review"].includes(step)) {
      setCurrentStep(step)
    }
  }, [searchParams])

  const updateStep = (step: CheckoutStep) => {
    setCurrentStep(step)
    router.push(`/${countryCode}/checkout?step=${step}`)
  }

  const handleAddressNext = (address: any) => {
    setSelectedAddress(address)
    updateStep("payment")
  }

  const handlePaymentNext = (method: string) => {
    setPaymentMethod(method)
    updateStep("review")
  }

  const handlePlaceOrder = async () => {
    // Order placement logic येथे implement करा
    console.log("Placing order with:", {
      cart,
      address: selectedAddress,
      payment: paymentMethod
    })
    
    // Success page वर redirect करा
    router.push(`/${countryCode}/order/success`)
  }

  return (
    <section className="checkout_page mt_100 mb_100">
      <div className="container">
        {/* Progress Steps */}
        <div className="checkout_progress mb-4">
          <div className="row">
            <div className="col-12">
              <div className="d-flex justify-content-center">
                <div className={`step ${currentStep === "address" ? "active" : currentStep === "payment" || currentStep === "review" ? "completed" : ""}`}>
                  <span className="step-number">1</span>
                  <span className="step-title">Address</span>
                </div>
                <div className="step-line"></div>
                <div className={`step ${currentStep === "payment" ? "active" : currentStep === "review" ? "completed" : ""}`}>
                  <span className="step-number">2</span>
                  <span className="step-title">Payment</span>
                </div>
                <div className="step-line"></div>
                <div className={`step ${currentStep === "review" ? "active" : ""}`}>
                  <span className="step-number">3</span>
                  <span className="step-title">Review</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8">
            {currentStep === "address" && (
              <AddressStep 
                customer={customer}
                onNext={handleAddressNext}
                selectedAddress={selectedAddress}
              />
            )}
            
            {currentStep === "payment" && (
              <PaymentStep
                cart={cart}
                onNext={handlePaymentNext}
                onBack={() => updateStep("address")}
                selectedPayment={paymentMethod}
              />
            )}
            
            {currentStep === "review" && (
              <div className="checkout_review">
                <h3>Order Review</h3>
                <div className="review_section">
                  <h5>Shipping Address:</h5>
                  {selectedAddress && (
                    <div className="address_review">
                      <p>{selectedAddress.first_name} {selectedAddress.last_name}</p>
                      <p>{selectedAddress.address_1}</p>
                      <p>{selectedAddress.city}, {selectedAddress.province} {selectedAddress.postal_code}</p>
                      <p>{selectedAddress.country_code}</p>
                    </div>
                  )}
                  
                  <h5>Payment Method:</h5>
                  <p>{paymentMethod}</p>
                  
                  <div className="review_actions">
                    <button 
                      type="button" 
                      className="btn btn-outline-primary me-3"
                      onClick={() => updateStep("payment")}
                    >
                      Back to Payment
                    </button>
                    <button 
                      type="button" 
                      className="common_btn"
                      onClick={handlePlaceOrder}
                    >
                      Place Order <i className="fas fa-long-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="col-lg-4">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </section>
  )
}
