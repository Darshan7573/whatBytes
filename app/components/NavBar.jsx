import Image from 'next/image'
import React from 'react'

const NavBar = () => {
    return (
        <div className=' border-b w-full  mt-2 '>
            <div className='flex items-center p-5 justify-between'>
                <div className='flex items-center gap-1'>
                    <Image src='/skill.png' alt='' width={30} height={30} />
                    <h1 className='font-extrabold text-lg'>WhatBytes</h1>
                </div>
                <button className='bg-blue-500 px-3 py-2 rounded-md text-white cursor-pointer'>Login</button>
            </div>
        </div>
    )
}

export default NavBar