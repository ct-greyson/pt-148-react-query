import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ProductCatalog from './components/ProductCatalog';
import AddProduct from './components/AddProduct';

function App() {

  const queryClient = new QueryClient();

  return (
    // Providing react query to our entire application
    <QueryClientProvider client={queryClient}>
      <AddProduct />
      <ProductCatalog />
    </QueryClientProvider>
  )
}

export default App
