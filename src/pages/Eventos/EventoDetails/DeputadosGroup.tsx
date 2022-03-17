import { Avatar, Tooltip, Wrap } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useDeputadosEvento } from '../../../services/fetchers/eventos';

const DeputadosGroup: React.FC = () => {
  const { id } = useParams();
  const { data } = useDeputadosEvento(id);

  return (
    <Wrap mb={8}>
      {data?.dados?.map(({ id: deputadoID, nome, siglaPartido, urlFoto }) => (
        <Tooltip key={deputadoID} label={`${nome} (${siglaPartido})`}>
          <Link to={`/deputados/${id}`}>
            <Avatar name={nome} src={urlFoto} />
          </Link>
        </Tooltip>
      ))}
    </Wrap>
  );
};

export default DeputadosGroup;
