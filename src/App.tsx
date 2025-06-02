import './App.css';
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GitHubExplorer from './githubExplorer';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GitHubExplorer />
    </QueryClientProvider>
  );
}

export default App;
