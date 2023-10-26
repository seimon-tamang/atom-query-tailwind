import Sidebar from './Sidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { atom } from 'jotai';
export const cityAtom = atom("Kathmandu");

const queryClient = new QueryClient() 

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <Sidebar />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </div>
  );
}

export default App;
