import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useCallback, useContext, useEffect} from 'react';
import {globalStyles} from '../constants/globalStyles';
import ProductCard from '../components/ProductCard';
import {useFocusEffect} from '@react-navigation/native';
import colors from '../constants/colors';
import {Appcontext} from '../context/AppContext';
import {Button} from '@rneui/base';
import AntDesign from 'react-native-vector-icons/AntDesign'; 
import CustomHeader from '../components/CustomHeader';
import { getFromStorage } from '../utils/Helper';
import { clientRequest } from '../utils/ApiRequests';
import {BASE_URI} from '@env';

const Menu = ({route, navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [categories,setCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(categories[0]?.title);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(false);

  const {userCart,cartTotal} = useContext(Appcontext);

  const handleClick = (category) => {
    setCurrentCategory(category);
  };

  // console.log(currentCategory,'currentCategory')

  

  useFocusEffect(
    useCallback(() => {
      // console.log(categories)
      if (route?.params?.category){
        setCurrentCategory(route?.params?.category);
      } else if(route?.params?.category=== undefined || !route?.params?.category) {
        setCurrentCategory(categories[0]?.title);
      }
    }, [route?.params?.category,categories]),
  );
  // const {category}= route?.params || {};

  // useEffect(()=>{
  //   if(isFocused){
  //     if(category){
  //       setCurrentCategory(category)
  //     }else{
  //       setCurrentCategory(categories[0]?.title)
  //     }
  //   }
  // },[category,isFocused])

  // const getCartTotal= ()=>{
  //   const total= userCart.reduce((init,next)=> init+(Number(next.price)* Number(next.quantity)),0);
  //   return total;
  // }

  const getCategories= async()=>{
    const devideId= await getFromStorage('deviceId');
    const categories= await clientRequest('api/v1/public/categories','GET',{deviceid: devideId,devicename: 'Android'});
    if( categories?.data){
        return categories.data
    }
  };
  const getProducts= async()=>{
    const devideId= await getFromStorage('deviceId');
    const products= await clientRequest('api/v1/public/products','GET',{deviceid: devideId,devicename: 'Android'});
    if( products?.data){
        return products?.data
    }
  };

  const fetchPageData= async()=>{
    setLoading(true);
    const categoryData= getCategories();
    const productsData= getProducts();

    const [categories, products] = await Promise.all([categoryData,productsData]);

    setCategories(categories);
    setProductData(products);
    setLoading(false);
  }

  useEffect(()=>{
   fetchPageData();
  },[]);

  // console.log(userCart[userCart?.length-1]?.product?.title,'ucart')

  return (
    <View style={styles.container}>
      <CustomHeader route={route} navigation={navigation}/>
      {
        loading?
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator color={colors.red} size={'large'}/>
        </View>:
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
                  currentCategory === item?.title ? styles.activeItem : styles.listItem
                }
                onPress={() => handleClick(item?.title)}>
                <Text style={[globalStyles.text]}>{item?.title}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={{marginHorizontal: 10}}>
          {productData
            ?.filter((data, i) => data.productcategory?.title === currentCategory)
            ?.map((product, index) => (
              <ProductCard data={product} key={index} />
            ))}
        </View>
      </ScrollView>
      }
     { !loading && <View>
        {userCart?.length?(
          <View style={styles.cartSection}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Image
                source={{uri: `${BASE_URI}${userCart[userCart?.length - 1]?.product?.images[0]}`}}
                style={{width: 50, height: 50, resizeMode: 'cover',borderRadius:5}}
              />
              <View>
              <Text style={[globalStyles.text,{color:'black'}]}>{userCart[userCart?.length - 1]?.product?.title} {userCart.length>=2 ? <Text>{`+${userCart?.length-1} more`}</Text>:null}</Text>
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
      </View>}
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
