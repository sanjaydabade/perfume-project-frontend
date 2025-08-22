"use client"

import { useState } from "react"
import { Cart } from "@medusajs/medusa"

interface PaymentStepProps {
  cart: Cart
  onNext: (paymentMethod: string) => void
  onBack: () => void
  selectedPayment: string
}

export default function PaymentStep({ cart, onNext, onBack, selectedPayment }: PaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState(selectedPayment || "")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  })

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method)
  }

  const handleCardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleContinue = () => {
    if (!paymentMethod) {
      alert("कृपया payment method निवडा")
      return
    }

    if (paymentMethod === "card" && (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
      alert("कृपया card details भरा")
      return
    }

    onNext(paymentMethod)
  }

  return (
    <div className="checkout_payment_section">
      <div className="checkout_header">
        <h3>Payment Method</h3>
        <p>तुमच्या order साठी payment method निवडा</p>
      </div>

      <div className="checkout_payment">
        <div className="payment_methods">
          {/* Cash on Delivery */}
          <div className="form-check payment_option">
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              id="cod"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={() => handlePaymentMethodChange("cod")}
            />
            <label className="form-check-label" htmlFor="cod">
              <div className="payment_info">
                <h5>Cash on Delivery</h5>
               
              </div>
            </label>
          </div>

          {/* Online Payment */}
          <div className="form-check payment_option">
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              id="online"
              value="online"
              checked={paymentMethod === "online"}
              onChange={() => handlePaymentMethodChange("online")}
            />
            <label className="form-check-label" htmlFor="online">
              <div className="payment_info">
                <h5>Online Payment</h5>
                <p>UPI, Net Banking, Wallet</p>
              </div>
            </label>
          </div>

          {/* Card Payment */}
          <div className="form-check payment_option">
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              id="card"
              value="card"
              checked={paymentMethod === "card"}
              onChange={() => handlePaymentMethodChange("card")}
            />
            <label className="form-check-label" htmlFor="card">
              <div className="payment_info">
                <h5>Credit/Debit Card</h5>
                <p>Visa, Mastercard, RuPay</p>
              </div>
            </label>
          </div>

          {/* Bank Transfer */}
          <div className="form-check payment_option">
            <input 
              className="form-check-input" 
              type="radio" 
              name="paymentMethod" 
              id="bank"
              value="bank"
              checked={paymentMethod === "bank"}
              onChange={() => handlePaymentMethodChange("bank")}
            />
            <label className="form-check-label" htmlFor="bank">
              <div className="payment_info">
                <h5>Direct Bank Transfer</h5>
                <p>NEFT/RTGS/IMPS</p>
              </div>
            </label>
          </div>
        </div>

        {/* Card Details Form */}
        {paymentMethod === "card" && (
          <div className="card_details_form mt-4">
            <h5>Card Details:</h5>
            <div className="row">
              <div className="col-md-12">
                <div className="single_input">
                  <label>Cardholder Name *</label>
                  <input 
                    type="text" 
                    name="cardholderName"
                    value={cardDetails.cardholderName}
                    onChange={handleCardInputChange}
                    placeholder="Card वर लिहिलेले नाव"
                    required
                  />
                </div>
              </div>
              <div className="col-md-12">
                <div className="single_input">
                  <label>Card Number *</label>
                  <input 
                    type="text" 
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="single_input">
                  <label>Expiry Date *</label>
                  <input 
                    type="text" 
                    name="expiryDate"
                    value={cardDetails.expiryDate}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="single_input">
                  <label>CVV *</label>
                  <input 
                    type="text" 
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Icons */}
        <div className="checkout_card mt-4">
          <p>Accepted Payment Methods:</p>
          <ul>
            <li><img src="/assets/images/payment-1.jpg" alt="Visa" className="img-fluid w-100"/></li>
            <li><img src="/assets/images/payment-2.jpg" alt="Mastercard" className="img-fluid w-100"/></li>
            <li><img src="/assets/images/payment-3.jpg" alt="RuPay" className="img-fluid w-100"/></li>
            <li><img src="/assets/images/payment-4.jpg" alt="UPI" className="img-fluid w-100"/></li>
            <li><img src="/assets/images/payment-5.jpg" alt="Paytm" className="img-fluid w-100"/></li>
          </ul>
        </div>

        {/* Terms and Conditions */}
        <div className="terms mt-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" id="termsCheck" required/>
            <label className="form-check-label" htmlFor="termsCheck">
              मी website च्या terms and conditions ला सहमत आहे.
            </label>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="payment_actions mt-4">
          <button 
            type="button" 
            className="btn btn-outline-primary me-3"
            onClick={onBack}
          >
            <i className="fas fa-long-arrow-left"></i> Back to Address
          </button>
          <button 
            type="button" 
            className="common_btn"
            onClick={handleContinue}
          >
            Continue to Review <i className="fas fa-long-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
