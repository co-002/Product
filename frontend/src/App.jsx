import { useState } from 'react'
import ProductTable from './components/productTable'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ProductTable/>
    </>
  )
}

export default App
