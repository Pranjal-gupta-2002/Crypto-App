import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { server } from '../index';
import { useParams } from 'react-router-dom';
import Loader from './Loader';
import {
  Box,
  Container,
  HStack,
  Button,
  RadioGroup,
  Radio,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
} from '@chakra-ui/react';

import ErrorComponent from './ErrorComponent';
import Chart from './Chart';


const CoinDetails = () => {
  const [coin, setCoin] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr');
  const [days, setdDays] = useState('24h');
  const [chartArray, setChartArray] = useState([]);
  const params = useParams();

  const btns = ['24h','7d','14d','30d','60d','200d','365d','max']

  const currencySymbol =
    currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';


  const switchChartStats = (key)=>{
    switch(key){
      case "24h":
        setdDays("24h");
        setLoading(true);
        break;
      case "7d":
        setdDays("7d");
        setLoading(true);
        break;
      case "14d":
        setdDays("14d");
        setLoading(true);
        break;
      case "30d":
        setdDays("30d");
        setLoading(true);
        break;
      case "60d":
        setdDays("60d");
        setLoading(true);
        break;
      case "200d":
        setdDays("200d");
        setLoading(true);
        break;
      case "365d":
        setdDays("365d");
        setLoading(true);
        break;
      case "max":
        setdDays("max");
        setLoading(true);
        break;

      default:
        setdDays("24h");
        setLoading(true);
        break;
    }
  }

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);
        const { data : chartData } = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`);
        setCoin(data);
        setChartArray(chartData.prices)
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchCoin();
  }, [params.id,currency,days]);
  if (error) return <ErrorComponent message={`Error while fetching Coins`} />;
  return (
    <Container maxW={'container.xl'}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Box w={'full'} borderWidth={'1'}>
            <Chart currency={currencySymbol} arr={chartArray} />
          </Box>

          <HStack p={4} wrap={'wrap'}>
            {
              btns.map((i)=>(
                <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
              ))
            }
          </HStack>

          <RadioGroup value={currency} onChange={setCurrency} p={'8'}>
            <HStack spacing={4}>
              <Radio value={'inr'}>INR</Radio>
              <Radio value={'usd'}>USD</Radio>
              <Radio value={'eur'}>EUR</Radio>
            </HStack>
          </RadioGroup>

          <VStack spacing={4} padding={16} alignItems={'flex-start'}>
            <Text fontSize={'small'} alignSelf={'center'}>
              Last updated on{' '}
              {Date(coin.market_data.last_updated).split('G')[0]}
            </Text>
            <Image src={coin.image.large} h={16} w={16} objectFit={'contain'} />

            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol} {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'increase'
                      : 'decrease'
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>

            <Badge
              fontSize={'2xl'}
              bgColor={'blackAlpha.900'}
              color={'white'}
            >{`#${coin.market_cap_rank}`}</Badge>

            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}`}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <Box w={'full'} p={4}>
              <Item title={"Max Supply"} value={coin.market_data.max_supply}/>
              <Item title={"Circulating Supply"} value={coin.market_data.circulating_supply}/>
              <Item title={"Market Cap"} value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}/>
              <Item title={"All Time Low"} value={`${currencySymbol}${coin.market_data.atl[currency]}`}/>
              <Item title={"All Time High"} value={`${currencySymbol}${coin.market_data.ath[currency]}`}/>
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

export default CoinDetails;

const CustomBar = ({ high, low }) => (
  <VStack w={'full'}>
    <Progress value={'50'} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
      <Badge children={low} color={'red'} />
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} color={'green'} />
    </HStack>
  </VStack>
);


const Item = ({title,value})=>(
  <HStack justifyContent={'space-between'} width={'full'} my={4}>
    <Text fontFamily={"Bebas Neue" } letterSpacing={'widest'}>{title}</Text>
    <Text>{value}</Text>
  </HStack>
)
