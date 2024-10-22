import React from "react";
import gitimg from '../assets/icons8-github.svg';

function Navbar(){
    return (
        <div >
          <nav className="bg-slate-800 flex flex-row p-3 justify-between text-center items-center text-white font-poppins" >
             <div className="text-2xl font-bold text-white">
             <span className="text-green-500"> &lt;</span>
            <span>pass</span>
            <span className="text-green-500">OP/&gt;</span>
             </div>
           <ul className=" flex  gap-6 items-center">
            {/* <li><a href="" className="text-white">Home</a></li>
            <li><a href="" className="text-white">About</a></li>
            <li ><a href="" className="text-white">Login</a></li> */}
            <li><button className="bg-green-600 w-fit flex rounded-full px-2 py-1 border border-black text-center mx-1 ring-white ring-1"><img className="invert"  src={gitimg} alt="logo" /><span className="font-semibold pl-1"><a className='w-fit'href="https://github.com/Pvpkishore" target="_blank">Github</a></span></button>
           </li>
           </ul>
           </nav> 
         </div>
    )
}

export default Navbar;