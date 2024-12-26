import React from 'react'
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => {
    const customAppearance = {
        elements: {
            card: "bg-[#21263a] text-white", 
            headerTitle: "text-2xl font-bold text-white",    
            input: "bg-transparent border-gray-600 text-white",
        },
    };

    return (
        <div className='flex justify-center h-svh items-center'>
            <SignIn appearance={customAppearance} />
        </div>
    )
}

export default SignInPage