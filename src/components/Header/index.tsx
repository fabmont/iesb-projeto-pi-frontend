import { HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Link as ChakraLink,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const ThemeToggleButton = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <motion.div
        style={{ display: 'inline-block' }}
        key={useColorModeValue('light', 'dark')}
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 5, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <IconButton
          aria-label="Toggle theme"
          colorScheme={useColorModeValue('text', 'yellow')}
          icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          onClick={toggleColorMode}
          variant="ghost"
        />
      </motion.div>
    </AnimatePresence>
  );
};

const LinkItem: React.FC<{ to: string }> = ({ to, children, ...props }) => {
  const { pathname } = useLocation();
  const active = to === '/' ? pathname === to : pathname.includes(to);
  const inactiveColor = useColorModeValue('gray200', 'whiteAlpha.900');

  return (
    <ChakraLink
      as={Link}
      to={to}
      p={2}
      color={active ? 'unset' : inactiveColor}
      borderBottomColor={active ? 'blue.500' : 'transparent'}
      borderBottomWidth="3px"
      {...props}
    >
      {children}
    </ChakraLink>
  );
};

const Header: React.FC = (props) => {
  return (
    <Box
      position="fixed"
      as="nav"
      w="100%"
      bg={useColorModeValue('#00000013', '#00000030')}
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      zIndex={1}
      {...props}
    >
      <Container
        display="flex"
        p={2}
        maxW="container.xl"
        flexWrap="wrap"
        textAlign="center"
        justifyContent="space-between"
      >
        <Flex align="center" mr={5}>
          <Button variant="ghost" as={Link} to="/">
            <Heading as="h1" size="md" letterSpacing="tighter">
              <Text color={useColorModeValue('gray.800', 'whiteAlpha.900')}>
                <span role="img" aria-label="hi">
                  🇧🇷&nbsp;&nbsp;
                </span>
                InfoCâmara
              </Text>
            </Heading>
          </Button>
        </Flex>

        <Stack
          direction={{ base: 'column', md: 'row' }}
          display={{ base: 'none', md: 'flex' }}
          width={{ base: 'full', md: 'auto' }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 0 }}
        >
          <LinkItem to="/">Início</LinkItem>
          <LinkItem to="/eventos">Eventos</LinkItem>
          <LinkItem to="/partidos">Partidos</LinkItem>
          <LinkItem to="/deputados">Deputados</LinkItem>
        </Stack>

        <Box flex={1} textAlign="right">
          <ThemeToggleButton />

          <Box ml={4} display={{ base: 'inline-block', md: 'none' }}>
            <Menu isLazy id="navbar-menu">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon fontSize={24} />}
                variant="outline"
                aria-label="Options"
              />
              <MenuList>
                <MenuItem as={Link} to="/">
                  Home
                </MenuItem>
                <MenuItem as={Link} to="/">
                  Eventos
                </MenuItem>
                <MenuItem as={Link} to="/">
                  Partidos
                </MenuItem>
                <MenuItem as={Link} to="/">
                  Deputados
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
