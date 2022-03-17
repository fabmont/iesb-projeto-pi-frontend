/* eslint-disable react/no-unstable-nested-components */
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { ErrorBoundary as ErrBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import { Link } from 'react-router-dom';

const Fallback: React.FC<{ refetch: () => void }> = ({ refetch }) => {
  return (
    <Box
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Heading as="h1" size="lg">
        🚨 Oops...
      </Heading>
      <Text mb={4}>
        Aconteceu um erro ao tentar buscar a informação no servidor.
      </Text>
      <Stack direction="row">
        <Button colorScheme="blue" onClick={refetch} size="sm">
          Tentar novamente
        </Button>
        <Button colorScheme="blue" variant="ghost" size="sm" as={Link} to="/">
          Voltar para o início
        </Button>
      </Stack>
    </Box>
  );
};

const ErrorBoundary: React.FC = ({ children }) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrBoundary
          fallbackRender={({ resetErrorBoundary }) => (
            <Fallback refetch={resetErrorBoundary} />
          )}
        >
          {children}
        </ErrBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundary;
