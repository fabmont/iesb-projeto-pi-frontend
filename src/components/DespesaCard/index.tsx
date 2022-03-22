import {
  Box,
  Button,
  Heading,
  Select,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/pt-br';
import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import formatCurrency from '../../helpers/formatCurrency';
import { useDeputadosDespesas } from '../../services/fetchers/despesasDeputados';
import ChartTooltip from '../ChartTooltip';

const createYears = () => {
  const currentYear = new Date().getFullYear();
  const yearList = [];

  for (let i = 2005; i <= currentYear; i += 1) {
    yearList.push(i);
  }

  return yearList;
};

const months = [
  { label: 'Janeiro', value: 1 },
  { label: 'Fevereiro', value: 2 },
  { label: 'Março', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Maio', value: 5 },
  { label: 'Junho', value: 6 },
  { label: 'Julho', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Setembro', value: 9 },
  { label: 'Outubro', value: 10 },
  { label: 'Novembro', value: 11 },
  { label: 'Dezembro', value: 12 },
];

const DespesaCard: React.FC = () => {
  const { id = '' } = useParams();
  const { data } = useDeputadosDespesas(id, {});
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const chartData = useMemo(
    () =>
      data?.dados?.map((despesa) => ({
        dataDespesa: moment(despesa.dataDocumento).format('MMM, YY'),
        tipoDespesa: despesa.tipoDespesa,
        valorDespesa: despesa.valorLiquido,
      })),
    [data?.dados],
  );

  return (
    <Box
      w="full"
      borderWidth="1px"
      borderRadius="md"
      p={4}
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <Heading size="md">Despesas</Heading>

      <Stack direction={['column', 'row']} mt={4} mb={8}>
        <Select placeholder="Mês" value={currentMonth}>
          {months.map(({ label, value }) => (
            <option key={value}>{label}</option>
          ))}
        </Select>
        <Select placeholder="Ano">
          {createYears().map((year) => (
            <option selected={!!currentYear} key={year}>
              {year}
            </option>
          ))}
        </Select>
      </Stack>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={chartData}>
          <Area type="monotone" dataKey="valorDespesa" />
          <XAxis dataKey="dataDespesa" tickLine={false} />
          <YAxis
            dataKey="valorDespesa"
            axisLine={false}
            tickLine={false}
            tickFormatter={(val: number) => formatCurrency(val)}
          />
          <Tooltip
            label="Valor da despesa"
            formatter={(val: number) => `R$ ${formatCurrency(val)}`}
            content={<ChartTooltip />}
          />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>

      <Box display="flex" justifyContent="space-between" mt={6}>
        <Button variant="outline">Anterior</Button>
        <Button variant="outline">Próximo</Button>
      </Box>
    </Box>
  );
};

export default DespesaCard;
