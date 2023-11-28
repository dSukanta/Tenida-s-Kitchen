import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState, useCallback, useContext} from 'react';
import {globalStyles} from '../constants/globalStyles';
import ProductCard from '../components/ProductCard';
import {useFocusEffect} from '@react-navigation/native';
import colors from '../constants/colors';
import {Appcontext} from '../context/AppContext';
import {Button} from '@rneui/base';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import CustomHeader from '../components/CustomHeader';

const Menu = ({route, navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const categories = [
    {category: 'Soft Drinks', image: require('../images/soft_drink.webp')},
    {category: 'All-In-1 Meals', image: require('../images/allinonemeal.jpeg')},
    {category: 'Mini Meals', image: require('../images/minimeal.jpg')},
    {
      category: 'Chicken Starters',
      image: require('../images/chickenmeal.png'),
    },
  ];
  const [currentCategory, setCurrentCategory] = useState('Soft Drinks');
  const [productData, setProductData] = useState([
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
    {
      id: 2,
      name: 'Mini Meals',
      category: 'Mini Meals',
      image: require('../images/minimeal.jpg'),
    },
    {
      id: 3,
      name: 'Chicken Starters',
      category: 'Chicken Starters',
      image: require('../images/chickenmeal.png'),
    },
    {
      id: 4,
      name: 'Soft Drinks',
      category: 'Soft Drinks',
      image: require('../images/soft_drink.webp'),
    },
  ]);

  const {userCart,cartTotal} = useContext(Appcontext);

  const handleClick = (index, category) => {
    setCurrentIndex(index);
    setCurrentCategory(category);
  };

  useFocusEffect(
    useCallback(() => {
      if (route?.params?.index) {
        setCurrentIndex(route?.params?.index);
        setCurrentCategory(categories[route?.params?.index]?.category);
      } else {
        setCurrentIndex(0);
        setCurrentCategory('Soft Drinks');
      }
    }, [route?.params?.index]),
  );

  // const getCartTotal= ()=>{
  //   const total= userCart.reduce((init,next)=> init+(Number(next.price)* Number(next.quantity)),0);
  //   return total;
  // }

  return (
    <View style={styles.container}>
      <CustomHeader route={route} navigation={navigation}/>
      <ScrollView style={styles.content}>
        <View style={styles.listcontainer}>
          <FlatList
            horizontal
            data={categories}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                style={
                  currentIndex === index ? styles.activeItem : styles.listItem
                }
                onPress={() => handleClick(index, item?.category)}>
                <Text style={[globalStyles.text]}>{item?.category}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{marginHorizontal: 10}}>
          {productData
            ?.filter((data, i) => data.category === currentCategory)
            ?.map((product, index) => (
              <ProductCard data={product} key={product?.id} />
            ))}
        </View>
      </ScrollView>
      <View>
        {userCart?.length?(
          <View style={styles.cartSection}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Image
                source={userCart[userCart?.length - 1]?.image}
                style={{width: 50, height: 50, resizeMode: 'cover',borderRadius:5}}
              />
              <View>
              <Text style={[globalStyles.text,{color:'black'}]}>{userCart[userCart?.length - 1]?.name} {userCart.length>=2 ? <Text>{`+${userCart?.length-1} more`}</Text>:null}</Text>
              <Text style={[globalStyles.text,{color:'black'}]}>{userCart?.length} Item(s) | <Text style={[globalStyles.text,{color:'black'}]}>Total: ₹{cartTotal}</Text></Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.viewCartBtn} onPress={()=>navigation.navigate('Cart')}>
              <Text style={globalStyles.text}>{`View Cart`} <AntDesign name='caretright' color={'white'} size={10}/></Text>
              </TouchableOpacity>
            </View>
          </View>
        ):null}
      </View>
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    flex: 1,
  },
  listcontainer: {
    marginHorizontal: 10,
  },
  listItem: {
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: colors.red,
    borderRadius: 5,
  },
  activeItem: {
    padding: 10,
    margin: 5,
    backgroundColor: colors.red,
    color: 'white',
    borderRadius: 5,
  },
  cartSection: {
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 20,
    marginVertical: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  viewCartBtn:{
    backgroundColor: colors.red,
    padding:10,
    justifyContent: 'center',
    alignItems:'center',
    borderRadius: 10,
  }
});
