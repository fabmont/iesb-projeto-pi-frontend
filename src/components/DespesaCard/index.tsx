import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
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
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
  const currentYear = new Date().getFullYear();
  const [selectedMonth, setSelectedMonth] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>(
    currentYear.toString(),
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, refetch } = useDeputadosDespesas(id, {
    ano: selectedYear,
    mes: selectedMonth,
    pagina: currentPage,
  });

  const chartData = useMemo(
    () =>
      data?.dados?.map((despesa) => ({
        dataDespesa: moment(`${despesa.mes}-${despesa.ano}`, 'MM-YYYY').format(
          'MMM',
        ),
        dataDocumento: moment(despesa.dataDocumento).format('DD/MM/YYYY'),
        tipoDespesa: despesa.tipoDespesa,
        valorDespesa: despesa.valorLiquido,
        nomeFornecedor: despesa.nomeFornecedor,
      })),
    [data?.dados],
  );

  useEffect(() => {
    refetch();
  }, [selectedMonth, selectedYear, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear]);

  const paginateNext = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
  }, []);

  const paginatePrevious = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
  }, []);

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
        <Select
          placeholder="Selecione..."
          defaultValue={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {months.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Select>
        <Select
          defaultValue={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          {createYears().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </Stack>

      <ResponsiveContainer height={320} width="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 20, bottom: 0, left: 24 }}
        >
          <Area type="monotone" dataKey="valorDespesa" />
          <XAxis dataKey="dataDespesa" tickLine={false} fontSize={12} />
          <YAxis
            dataKey="valorDespesa"
            axisLine={false}
            tickLine={false}
            tickFormatter={(val: number) => formatCurrency(val)}
            fontSize={12}
          />
          <Tooltip
            label="Valor da despesa"
            formatter={(val: number) => `R$ ${formatCurrency(val)}`}
            content={<ChartTooltip />}
          />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>

      <Stack spacing={4} mt={6} direction="row" justify="center">
        <Button
          variant="outline"
          leftIcon={<ArrowBackIcon />}
          size="sm"
          isDisabled={currentPage <= 1}
          onClick={paginatePrevious}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          rightIcon={<ArrowForwardIcon />}
          size="sm"
          isDisabled={!data?.links?.find((i) => i.rel === 'next')}
          onClick={paginateNext}
        >
          Próximo
        </Button>
      </Stack>
    </Box>
  );
};

export default DespesaCard;
