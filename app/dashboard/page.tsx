import React from 'react'
import Sidebar from '@/components/sidebar'
import { Component } from '@/components/charts/test'

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
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Total Visitors
          </h4>
          <p className="mt-2 text-3xl font-bold">
            12, 678
          </p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Total Sales
          </h4>
          <p className="mt-2 text-3xl font-bold">
            $ 89, 765
          </p>
        </div>
      </div>

      <Component />
    </main>
    </div>
  )
}

export default page