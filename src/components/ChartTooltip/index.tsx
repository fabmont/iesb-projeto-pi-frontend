import { Box, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { TooltipProps } from 'recharts';
import capitalizeString from '../../helpers/capitalizeString';
import formatCurrency from '../../helpers/formatCurrency';

const ChartTooltip = ({ active, payload }: TooltipProps<number, string>) => {
  if (active) {
    return (
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="md"
        boxShadow="lg"
        maxWidth="300px"
        bg={useColorModeValue('gray.100', 'gray.800')}
      >
        <Text fontSize="sm" mb={2}>
          {payload?.[0]?.payload?.tipoDespesa &&
            capitalizeString(payload?.[0]?.payload?.tipoDespesa)}
        </Text>
        <Heading size="md">
          {payload?.[0]?.value && `${formatCurrency(payload?.[0]?.value || 0)}`}
        </Heading>
      </Box>
    );
  }

  return null;
};

export default ChartTooltip;