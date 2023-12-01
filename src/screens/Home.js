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
} from 'react-native';
import React, { useContext, useEffect } from 'react';
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

const {height, width} = Dimensions.get('window');

const Home = ({navigation}) => {

  const {userData,setUserData} = useContext(Appcontext);

  const data = [1, 1, 1];
  const categories = [
    {category: 'Soft Drinks', image: require('../images/soft_drink.webp')},
    {category: 'All-In-1 Meals', image: require('../images/allinonemeal.jpeg')},
    {category: 'Mini Meals', image: require('../images/minimeal.jpg')},
    {
      category: 'Chicken Starters',
      image: require('../images/chickenmeal.png'),
    },
  ];

  const sliderData = [
    {
      id: 1,
      image:
        'https://img.freepik.com/premium-vector/special-offer-sale-discount-banner_180786-46.jpg',
    },
    {
      id: 2,
      image:
        'https://t3.ftcdn.net/jpg/03/46/18/98/360_F_346189806_SzptQ1X7BbpcAY4RRrp9iwaJw5UI1vVJ.jpg',
    },
  ];

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

  useEffect(()=>{
    detectLogin();
  },[]);

  return (
    <View style={styles.container}>
      <View>
        <HomeHeader navigation={navigation}/>
      </View>
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
          <CarouselComp data={sliderData} />
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
              <CategoriesCard data={item} navigation={navigation} index={index}/>
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
