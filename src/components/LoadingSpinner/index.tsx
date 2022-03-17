import { Box, Spinner } from '@chakra-ui/react';

const LoadingSpinner = () => (
  <Box h="full" display="flex" alignItems="center" justifyContent="center">
    <Spinner size="xl" />
  </Box>
);

export default LoadingSpinner;
