import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Pages from './pages';
import GlobalStyles from './styles/globalStyles';
import theme from './styles/theme';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <Pages />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
