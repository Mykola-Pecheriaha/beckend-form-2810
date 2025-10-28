'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        Счетчик (CSR Component)
      </h2>
      <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{count}</div>
      <div className="flex gap-2">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
        >
          -1
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition-colors"
        >
          Сброс
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
        >
          +1
        </button>
      </div>
    </div>
  )
}
