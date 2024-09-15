import React, { useState } from 'react'
import { IoSearch } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversation from '../../hooks/useGetConversation';
import toast from 'react-hot-toast';


const SearchInput = () => {
  const[search,setSearch]=useState("")
  const {setSelectedConversation}=useConversation()
  const {conversation}=useGetConversation()

  
  const handleSubmit=(e)=>{
    e.preventDefault();
    
    const person = conversation.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()))
    if(person){
      setSelectedConversation(person)
      setSearch(" ")
    }else toast.error("No such user found! ")

  }
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" placeholder='Search...' className='input input-boardered rounded-full' value={search} onChange={(e)=>setSearch(e.target.value)} />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
            <IoSearch className='w-6 h-6 outline-none' />
        </button>

    </form>
  )
}

export default SearchInput