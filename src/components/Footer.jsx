import { Avatar, Box, Center, Stack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box
      bgColor={'blackAlpha.900'}
      color={'whiteAlpha.700'}
      px={16}
      py={['16', '8']}
      minH={48}
    >
      <Stack direction={['column', 'row']} h={'full'} alignItems={'center'}>
        <VStack w={'full'} alignItems={['center', 'flex-start']}>
          <Text fontWeight={'bold'}>About us</Text>
          <Text
            fontSize={'sm'}
            letterSpacing={'widest'}
            textAlign={['center', 'left']}
          >
            We are the best Crypto trading app in India, we provide our guidance
            at a very reasonable price
          </Text>
        </VStack>
        <VStack>
          <Avatar boxSize={28} mt={['4', '0']} />
          <Text>Our Founder</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
