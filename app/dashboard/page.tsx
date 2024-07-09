import React from 'react'
import Sidebar from '@/components/sidebar'
import { Component } from '@/components/charts/test'
import { Component2 } from '@/components/charts/test2'
import { Component3 } from '@/components/charts/test3'

const page=()=> {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100 dark:bg-gray-800 " >
      <h3 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Dashboard
      </h3>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        Welcome back!
      </p>
    
      {/* two cards equally placed in a 4*4 grid */}

      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2">
        <div className="p-4 ">
         <Component3 />
        </div>
        <div className="p-4 ">
        <Component />
        </div>
      </div>

      <Component2 />
    </main>
    </div>
  )
}

export default page