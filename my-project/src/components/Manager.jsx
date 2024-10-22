import React, { useEffect, useRef, useState } from 'react'
import eyeimgopen from '../assets/icons8-eye-60.png'
import eyeimgclose from '../assets/eye-password-hide.256x256.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function Manager() {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setform] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setpasswordArray] = useState([]);

    const getpasswords = async () => {
        let req = await fetch('http://localhost:3000/')
        let passwords = await req.json()
        setpasswordArray(passwords)
    }

    useEffect(() => {
        getpasswords()
    }, [])

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }

    const showpasswordeye = () => {
        if (ref.current.src.includes(eyeimgclose)) {
            passwordref.current.type = "text"
            ref.current.src = eyeimgopen;
        }
        else {
            ref.current.src = eyeimgclose;
            passwordref.current.type = "password"
        }
    }

    const Savepassword = async () => {
        if (form.site.length >3 && form.username.length >3 && form.password.length >3 ) {

            // if any such id exists in the db,delete it
            // await fetch('http://localhost:3000/', {
            //     method: 'DELETE',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({id:form.id })
            // })
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])

            await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            
            setform({ site: '', username: '', password: '' })

                toast.success('Password saved!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });
        }
        else {
            toast.warn('please fill all the fields more than 3 characters!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }
    const deletepassword = async (id) => {
        let c = confirm("Do you really want to  delete this password?")
        if (c == true) {
            const updatedPasswords = passwordArray.filter(item => item.id !== id);
            setpasswordArray(updatedPasswords);
            await fetch('http://localhost:3000/', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({id})
            })

            toast.error('Password deleted successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const Editpassword = (id) => {
        setform({ ...passwordArray.filter(i => i.id === id)[0], id:id })
        setpasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handlechange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce" />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-500 opacity-20 blur-[100px]"></div></div>
            <div className='justify-center text-center rounded-md mt-4 py-3 max-w-6xl md:mx-auto p-2 md:p-0'>
                <h1 className='text-4xl text font-bold text-center'>
                    <span className="text-green-500"> &lt;</span>
                    <span>pass</span>
                    <span className="text-green-500">OP/&gt;</span>
                </h1>
                <p className='text-green-700 text-lg text-center'>Your own password manager</p>

                <div className='flex flex-col w-full text-black md:gap-2 gap-2 items-center '>
                    <input value={form.site} onChange={handlechange} className="mx-2 my-2 rounded-full border border-green-500 w-full py-1 px-4 text-sm" type="text" id="site" name="site" placeholder='Enter website URL' required />
                    <div className='flex flex-col md:flex-row w-full justify-between md:gap-2 gap-2'>
                        <input value={form.username} onChange={handlechange} className="rounded-full my-3 border border-green-500 w-full py-1 px-4 text-sm" type="text" id="username" name="username" placeholder='Enter Username' required />
                        <div className='relative w-full items-center text-center'>
                            <input ref={passwordref} value={form.password} onChange={handlechange} className="rounded-full my-3 border border-green-500 w-full py-1 px-4 text-sm"
                                type="" id="password" name="password" placeholder='Enter password' required />
                            <span className='absolute right-[3px] top-[16px] cursor-pointer' onClick={showpasswordeye}>
                                <img ref={ref} className='p-1 hover:bg-slate-200 hover:rounded-full' src={eyeimgopen} style={{ width: 22 }} alt="eye"></img>
                            </span>
                        </div>
                    </div>
                    <button onClick={Savepassword} className='flex justify-center items-center bg-green-400
                 hover:bg-green-300 px-4 rounded-full w-fit py-1 border border-black'><lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                        >
                        </lord-icon>
                        Save</button>
                </div>
                <div className='passwords'>
                    <h1 className='font-bold text-xl py-2'>Your Passwords</h1>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="table-auto w-full mb-3 rounded-md overflow-hidden text-sm md:text-lg ">
                        <thead className="w-full bg-green-700 text-white font-poppins">
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} className='font-poppins'>
                                    <td className='py-2 border border-white text-center hover:underlind '>
                                        <div className='flex flex-wrap items-center justify-center text-center text-sm' onClick={() => { copyText(item.site) }}>
                                            <a href={item.site} target='_blank'>{item.site}</a>
                                            <div className='size-7 cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" >
                                                </lord-icon>
                                            </div></div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex flex-wrap  items-center  justify-center text-center text-sm'>
                                            <span>{item.username}</span>
                                            <div className='size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" >
                                                </lord-icon>
                                            </div></div>
                                    </td>
                                    <td className='py-2 border border-white text-center'>
                                        <div className='flex flex-wrap  items-center justify-center text-center text-sm' onClick={() => { copyText(item.password) }}>
                                            <span>{"*".repeat(item.password.length)}</span>
                                            <div className='size-7 cursor-pointer'>
                                                <lord-icon
                                                    style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                                                    src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" >
                                                </lord-icon>
                                            </div></div>
                                    </td>
                                    <td className='justify-center py-2 border border-white text-center'>
                                        <span className='cursor-pointer' onClick={() => { Editpassword(item.id) }}>
                                            <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-2' onClick={() => { deletepassword(item.id) }}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
