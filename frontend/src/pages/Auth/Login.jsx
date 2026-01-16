// import React from 'react'
// import Input from '../../layouts/Input'
// import { useState } from 'react';
// import {useNavigate} from 'react-router-dom'
// import { Mail, Lock, User, Search } from 'lucide-react';
// import { FaGithub } from "react-icons/fa";
// import { FaGoogle } from "react-icons/fa6";

// export default function Login() {

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Authenticated:", { email });

//     const res = axiosInstance.post('/login' , {
//       email , password
//     })

//     console.log(res.data);
//   }

//   return (
//     <div className='min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden font-sans'>
    

//       <div className='w-50 lg:w-1/2 flex items-center justify-center p-8 sm:p-16'>
//         <div className='w-50 max-w-md'>
          
//           <div className='mb-10'>
//             <h3 className='text-2xl  font-bold text-purple-700 mb-20 font-mono '>Memo-Deck : for all your notes</h3>
//             <h3 className='text-xl  text-white mb-5'>Login to continue</h3>
            
//           </div>

//           <form onSubmit={handleSubmit} className='space-y-2'>
//             <Input 
//               type="text"
//               placeholder='name@company.com' 
//               label='Email Address' 
//               icon={Mail}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//               type="password"
//               placeholder='••••••••••••' 
//               label='Password' 
//               icon={Lock}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <div className='flex justify-end mb-8'>
//               <span className='text-xs text-gray-500 hover:text-white cursor-pointer transition-colors'>Forgot password?</span>
//             </div>

//             <button 
//               type="submit" 
//               className="group w-full bg-white text-black font-bold py-4 rounded-xl
//                flex items-center justify-center gap-2 hover:bg-transparent hover:text-white  hover:border-2
//                transition-all duration-300 mb-30 "
//             >
//               Sign into Deck
//               {/* <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" /> */}
//             </button>
//           </form>
//           <p className='text-gray-500 mt-3'>Don't have an account?
//                <span onClick={() => navigate('/register')}
//                className='text-blue-600 cursor-pointer hover:underline'>  Create new account</span></p>

//           <div className='relative my-10 flex items-center'>
//             <div className='flex-grow border-t border-white/10'></div>
//             <span className='mx-4 text-gray-600 text-[10px] uppercase tracking-widest'>Or continue with</span>
//             <div className='flex-grow border-t border-white/10'></div>
//           </div>

//           <div className='grid grid-cols-2 gap-4'>
//             <button className='flex items-center justify-center gap-3 py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all'>
//               <FaGithub size={18} />
//               <span className='text-sm font-medium'>Github</span>
//             </button>
//             <button className='flex items-center justify-center gap-3 py-3 border border-white/10 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all'>
//               <FaGoogle size={18} />
//               <span className='text-sm font-medium'>Google</span>
//             </button>
//           </div>

//         </div>
//       </div>

//     </div>
//   )
// }
