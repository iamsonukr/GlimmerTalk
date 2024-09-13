import React from 'react'

const ConversationCard = () => {
  return (
    <>
        <div className='flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer'>

            {/* avatar */}
            <div className="avatar online ">
                <div className='w-12 rounded-full'>
                    <img className='w-1 h-[1px] rounded-full ' src="https://pm1.aminoapps.com/6901/f741eb25415169697cb2ca00241f021d7ffe953ar1-575-538v2_uhq.jpg" alt="user avatar" />
                </div>
            </div>
            {/* name and icon */}
            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray'>Jonh Doe</p>
                    <span className='text-xl'>🍂</span>
                </div>
            </div>

        </div>

        <div className='divider my-0 py-0 h-1' /> 
    </>
  )
}

export default ConversationCard