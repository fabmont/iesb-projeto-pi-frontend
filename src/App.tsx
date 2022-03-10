import { ChakraProvider } from '@chakra-ui/react';

import theme from './styles/theme';
import GlobalStyles from './styles/globalStyles';
import Pages from './pages';

function App() {
  return (
    <ChakraProvider theme={theme} resetCSS>
      <GlobalStyles />
      <Pages />
    </ChakraProvider>
  );
}

export default App;
