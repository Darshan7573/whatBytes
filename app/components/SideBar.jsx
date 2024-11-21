import Image from 'next/image'
import React from 'react'

const SideBar = () => {
    return (
        <div className='mt-4 items-center justify-start gap-4 flex flex-col  border-r w-[400px] h-screen hidden sm:hidden lg:block'>
            <div className=' flex flex-col gap-5 justify-around'>
                <div className='flex items-center justify-center gap-2 p-4 cursor-pointer'>
                    <Image className='cursor-pointer' src='/graph.png' alt='' width={25} height={30} />
                    <h1 className='hidden lg:block sm:hidden'>Dashboard</h1>
                </div>
                <div className='flex items-center justify-center gap-2 p-4 bg-zinc-100 text-blue-600 border outline-none rounded-md px-4 py-4 w-full cursor-pointer'>
                    <Image className='cursor-pointer' src='/rank.png' alt='' width={30} height={30} />
                    <h1 className='hidden lg:block sm:hidden'>Skill Test</h1>
                </div>
                <div className='flex items-center justify-center gap-2 p-4 cursor-pointer'>
                    <Image className='cursor-pointer' src='/paper.png' alt='' width={30} height={30} />
                    <h1>Internship</h1>
                </div>
            </div>
        </div>
    )
}

export default SideBar