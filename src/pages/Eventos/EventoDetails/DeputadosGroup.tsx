import { Avatar, Heading, Tooltip, Wrap } from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { useDeputadosEvento } from '../../../services/fetchers/eventos';

const DeputadosGroup: React.FC = () => {
  const { id } = useParams();
  const { data } = useDeputadosEvento(id);

  if (!data?.dados?.length) {
    return null;
  }

  return (
    <>
      <Heading size="md" mb={4}>
        Deputados participantes
      </Heading>
      <Wrap mb={8}>
        {data?.dados?.map(({ id: deputadoID, nome, siglaPartido, urlFoto }) => (
          <Tooltip key={deputadoID} label={`${nome} (${siglaPartido})`} mt={4}>
            <Link to={`/deputados/${deputadoID}`}>
              <Avatar name={nome} src={urlFoto} />
            </Link>
          </Tooltip>
        ))}
      </Wrap>
    </>
  );
};

export default DeputadosGroup;
