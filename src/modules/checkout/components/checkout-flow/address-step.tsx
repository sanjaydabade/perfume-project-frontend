"use client"

import { useState, useEffect } from "react"
// import { Customer } from "@medusajs/medusa"

interface Customer {
  id: string
  first_name?: string
  last_name?: string
  email: string
  phone?: string
  shipping_addresses?: any[]
}

interface AddressStepProps {
  customer: Customer
  onNext: (address: any) => void
  selectedAddress: any
}

export default function AddressStep({ customer, onNext, selectedAddress }: AddressStepProps) {
  const [addresses, setAddresses] = useState<any[]>([])
  const [selectedAddressId, setSelectedAddressId] = useState<string>("")
  const [showNewAddressForm, setShowNewAddressForm] = useState(false)
  const [newAddress, setNewAddress] = useState({
    first_name: customer?.first_name || "",
    last_name: customer?.last_name || "",
    address_1: "",
    address_2: "",
    city: "",
    province: "",
    postal_code: "",
    country_code: "IN",
    phone: customer?.phone || ""
  })

  useEffect(() => {
    // Customer च्या existing addresses load करा
    if (customer?.shipping_addresses) {
      setAddresses(customer.shipping_addresses)
      if (customer.shipping_addresses.length > 0 && !selectedAddress) {
        setSelectedAddressId(customer.shipping_addresses[0].id)
      }
    }
  }, [customer, selectedAddress])

  const handleAddressSelect = (addressId: string) => {
    setSelectedAddressId(addressId)
    const address = addresses.find(addr => addr.id === addressId)
    if (address) {
      onNext(address)
    }
  }

  const handleNewAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // नवा address save करा आणि next step वर जा
    const addressWithId = { ...newAddress, id: `new_${Date.now()}` }
    onNext(addressWithId)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setNewAddress(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="checkout_address_section">
      <div className="checkout_header">
        <h3>Shipping Information</h3>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
          account: <b>{customer?.first_name} {customer?.last_name}</b> <a href="/account/logout">(logout)</a>
        </p>
      </div>

      <div className="checkout_address_area">
        <div className="row">
          {addresses.length > 0 ? addresses.map((address) => (
            <div key={address.id} className="col-md-6">
              <div className="checkout_single_address">
                <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="inlineRadioOptions"
                    id={`inlineRadioAddress${address.id}`} 
                    value={address.id}
                    checked={selectedAddressId === address.id}
                    onChange={() => handleAddressSelect(address.id)}
                  />
                  <label className="form-check-label" htmlFor={`inlineRadioAddress${address.id}`}>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {address.address_1}, {address.city}, {address.province} {address.postal_code}
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                      </svg>
                      {customer?.email}
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                      </svg>
                      {address.phone}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )) : (
            <div className="col-md-6">
              <div className="checkout_single_address">
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions"
                    id="inlineRadioAddress01" value="option1" defaultChecked />
                  <label className="form-check-label" htmlFor="inlineRadioAddress01">
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      37 West 24th Street, New York 10010, United States
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z" />
                      </svg>
                      {customer?.email}
                    </span>
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M15.75 3.75 18 6m0 0 2.25 2.25M18 6l2.25-2.25M18 6l-2.25 2.25m1.5 13.5c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                      </svg>
                      +123 324 5879 39
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add New Address Button */}
      <div className="add_new_address mb-4">
        <button 
          type="button" 
          className="btn btn-outline-primary"
          onClick={() => setShowNewAddressForm(!showNewAddressForm)}
        >
          {showNewAddressForm ? "Cancel" : "Add New Address"}
        </button>
      </div>

      {/* New Address Form */}
      {showNewAddressForm && (
        <form className="checkout_form_area" onSubmit={handleNewAddressSubmit}>
          <h5>Add New Address:</h5>
          <div className="row">
            <div className="col-md-6">
              <div className="single_input">
                <label>First Name *</label>
                <input 
                  type="text" 
                  name="first_name"
                  value={newAddress.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="single_input">
                <label>Last Name *</label>
                <input 
                  type="text" 
                  name="last_name"
                  value={newAddress.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="single_input">
                <label>Phone *</label>
                <input 
                  type="text" 
                  name="phone"
                  value={newAddress.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="single_input">
                <label>Country</label>
                <select 
                  name="country_code"
                  value={newAddress.country_code}
                  onChange={handleInputChange}
                  className="select_2"
                >
                  <option value="IN">India</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="single_input">
                <label>City *</label>
                <input 
                  type="text" 
                  name="city"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="single_input">
                <label>State *</label>
                <input 
                  type="text" 
                  name="province"
                  value={newAddress.province}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="single_input">
                <label>ZIP Code *</label>
                <input 
                  type="text" 
                  name="postal_code"
                  value={newAddress.postal_code}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-xl-12">
              <div className="single_input">
                <label>Address Line 1 *</label>
                <input 
                  type="text" 
                  name="address_1"
                  value={newAddress.address_1}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="col-xl-12">
              <div className="single_input">
                <label>Address Line 2</label>
                <input 
                  type="text" 
                  name="address_2"
                  value={newAddress.address_2}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          
          <div className="form_actions">
            <button type="submit" className="common_btn">
              Save Address & Continue <i className="fas fa-long-arrow-right"></i>
            </button>
          </div>
        </form>
      )}

      {/* Continue with Selected Address */}
      {!showNewAddressForm && selectedAddressId && (
        <div className="continue_section">
          <button 
            type="button" 
            className="common_btn"
            onClick={() => {
              const address = addresses.find(addr => addr.id === selectedAddressId)
              if (address) onNext(address)
            }}
          >
            Continue to Payment <i className="fas fa-long-arrow-right"></i>
          </button>
        </div>
      )}
    </div>
  )
}
