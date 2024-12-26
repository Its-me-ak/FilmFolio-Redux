import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const SignUpPage = () => {
  const customAppearance = {
    elements: {
      card: "bg-[#21263a] text-white",
      headerTitle: "text-2xl font-bold text-white",
      input: "bg-transparent border-gray-600 text-white",
    },
  };

  return (
      <div className='flex justify-center h-svh items-center'>
          <SignUp appearance={customAppearance} />
      </div>
  )
}

export default SignUpPage