"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RegisterPage({
  params,
}: {
  params: { countryCode: string }
}) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    try {
      // Add your registration logic here
      console.log("Registration data:", formData)
      
      // Redirect to login after successful registration
      router.push(`/${params.countryCode}/checkout`)
    } catch (error) {
      console.error("Registration error:", error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className="login_page mt_100 mb_100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8">
            <div className="login_area">
              <h2 className="text-center mb-4">Create Account</h2>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="single_input">
                      <label>First Name *</label>
                      <input 
                        type="text" 
                        name="firstName"
                        placeholder="Enter first name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="single_input">
                      <label>Last Name *</label>
                      <input 
                        type="text" 
                        name="lastName"
                        placeholder="Enter last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required 
                      />
                    </div>
                  </div>
                </div>
                
                <div className="single_input">
                  <label>Email *</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="single_input">
                  <label>Password *</label>
                  <input 
                    type="password" 
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <div className="single_input">
                  <label>Confirm Password *</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required 
                  />
                </div>
                
                <button type="submit" className="common_btn w-100">
                  Create Account
                </button>
              </form>
              
              <p className="mt-3 text-center">
                Already have an account? 
                <a 
                  href={`/${params.countryCode}/checkout`}
                  className="text-primary ms-2"
                >
                  Login here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
