import React from 'react'
import { Oval } from 'react-loader-spinner'

const Loader = () => {
  return (
      <div className='flex justify-center items-center'>
      <Oval
        visible={true}
        height="40"
        width="40"
        color="#38ccd4"
        secondaryColor= "#455e94"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  )
}

export default Loader
