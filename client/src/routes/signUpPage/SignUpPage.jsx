import React from 'react'
import "./SignUpPage.css"
import { SignUp } from '@clerk/clerk-react'

const SignUpPage = () => {
  return (
    <div className='signInPage'><SignUp path="/sign-up" signInUrl='/sign-in' /></div>
  )
}

export default SignUpPage