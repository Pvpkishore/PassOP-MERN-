import React from 'react'

const footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-col justify-center items-center text-center min-h-[6vh] pt-1 font-poppins w-full bottom-auto'>
        <div className="text-xl font-bold text-white">
             <span className="text-green-500"> &lt;</span>
            <span>pass</span>
            <span className="text-green-500">OP/&gt;</span>
           
             </div>
        <div>
            <p className="text-sm text-gray-400">{new Date().getFullYear()} &copy; Pvpkishore </p>
        </div>
    </div>
  )
}

export default footer