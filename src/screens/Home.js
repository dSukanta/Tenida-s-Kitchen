import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import {Button} from '@rneui/base';
import {Card} from '@rneui/themed';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {globalStyles} from '../constants/globalStyles';
import RedLine from '../components/RedLine';
import CategoriesCard from '../components/CategoriesCard';
import CarouselComp from '../components/CarouselComp';
import RecomendedCard from '../components/RecomendedCard';
import HomeHeader from '../components/HomeHeader';
import { Appcontext } from '../context/AppContext';
import { getFromStorage } from '../utils/Helper';
import { clientRequest } from '../utils/ApiRequests';
import colors from '../constants/colors';

const {height, width} = Dimensions.get('window');

const Home = ({navigation}) => {

  const {userData,setUserData} = useContext(Appcontext);

  const data = [1, 1, 1];
  const [categories,setCategories] = useState([]);
  const [offers,setOffers] = useState([]);
  const [loading,setLoading] = useState(false);

  const recomendedProducts=[
    {
      id: 0,
      name: 'Soft Drinks',
      category: 'Soft Drinks',
      image: require('../images/soft_drink.webp'),
    },
    {
      id: 1,
      name: 'All-In-1 Meals',
      category: 'All-In-1 Meals',
      image: require('../images/allinonemeal.jpeg'),
    },
  ];

  const detectLogin= async()=>{
    const token = await getFromStorage('token');
    const user = await getFromStorage('user');
    // console.log(token, user,'user');
    if(  token && user){
        setUserData(user)
    }else{
      setUserData([]);
    }
  };

  const getCategories= async()=>{
    const devideId= await getFromStorage('deviceId');
    const categories= await clientRequest('api/v1/public/categories','GET',{deviceid: devideId,devicename: 'Android'});
    if( categories?.data){
       return categories.data;
    }
  };

  const getOffers= async()=>{
    const devideId= await getFromStorage('deviceId');
    const offers= await clientRequest('api/v1/public/offers','GET',{deviceid: devideId,devicename: 'Android'});
    // console.log(offers,'offers');
    if( offers?.data){
      return offers.data
    }
  };

  const fetchPageData= async()=>{
    setLoading(true);
    const categoryData= getCategories();
    const offerData= getOffers();

    const [categories, offers] = await Promise.all([categoryData,offerData]);

    setCategories(categories);
    setOffers(offers);
    setLoading(false);
  }

  useEffect(()=>{
    detectLogin();
    fetchPageData();
  },[]);

  return (
    <View style={styles.container}>
      <View>
        <HomeHeader navigation={navigation}/>
      </View>
      {
        loading?
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size={'large'} color={colors.red}/>
        </View>:
      <ScrollView>
        <View>
          <FlatList
            horizontal
            data={data}
            showsHorizontalScrollIndicator={false}
            renderItem={({item, index}) => (
              <Card
                containerStyle={{
                  width: 250,
                  height: 150,
                  padding: 0,
                  margin: 0,
                  marginLeft: 7,
                  position: 'relative',
                  borderRadius: 10,
                  marginRight: index === data?.length - 1 ? 7 : 0,
                }}>
                <Card.Image
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 10,
                  }}
                  source={require('../images/slider_image.jpg')}
                />
              </Card>
            )}
          />
        </View>
        <View>
          <RedLine text={'offers for you'} />
        </View>
        <View style={{marginVertical: 10}}>
          <CarouselComp data={offers} navigation={navigation}/>
        </View>

        <View>
          <RedLine text={'Our popular Categories'} />
        </View>

        <View style={{paddingVertical:10}}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={categories}
            renderItem={({item,index})=>(
              <CategoriesCard data={item} navigation={navigation}/>
            )}
          />
        </View>

        {/* <View>
          <FlatList
            horizontal
            data={categories}
            renderItem={({item, index}) => (
              <CategoriesCard
                data={item}
                navigation={navigation}
                index={index}
              />
            )}
          />
        </View> */}

        <View>
          <RedLine text={'Recomended for you'} />
        </View>
        <View style={{alignSelf: 'center', marginBottom: '18%'}}>
          <FlatList
            data={recomendedProducts}
            renderItem={({item, index}) => (
              <RecomendedCard
                data={item}
                navigation={navigation}
                index={index}
              />
            )}
          />
        </View>
      </ScrollView>
      }
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  secondSlider: {
    width: 250,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
    borderRadius: 10,
  },
  loginTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  redLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'red',
    margin: 10,
  },
});
