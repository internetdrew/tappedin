import './App.css';
import { queryClient } from '../utils/trpc';
import { QueryClientProvider } from '@tanstack/react-query';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <h1>hello</h1>
    </QueryClientProvider>
  );
}

export default App;
