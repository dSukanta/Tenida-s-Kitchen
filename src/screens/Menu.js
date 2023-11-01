import { StyleSheet, Text, View, FlatList, TouchableOpacity,ScrollView } from 'react-native';
import React, { useState, useCallback } from 'react';
import { globalStyles } from '../constants/globalStyles';
import ProductCard from '../components/ProductCard';
import { useFocusEffect } from '@react-navigation/native';

const Menu = ({ route, navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const categories = [
    { category: 'Family Pack', image: require('../images/slider_image.jpg') },
    { category: 'All-In-1 Meals', image: require('../images/slider_image.jpg') },
    { category: 'Mini Meals', image: require('../images/slider_image.jpg') },
    { category: 'Chicken Starters', image: require('../images/slider_image.jpg') }
  ];
  const [currentCategory, setCurrentCategory] = useState('Family Pack');
  const [productData, setProductData] = useState([
    { id: 0, name: 'Family', category: 'Family Pack', image: require('../images/slider_image.jpg') },
    { id: 1, name: 'All-In-1 Meals', category: 'All-In-1 Meals', image: require('../images/slider_image.jpg') },
    { id: 2, name: 'Mini Meals', category: 'Mini Meals', image: require('../images/slider_image.jpg') },
    { id: 3, name: 'Chicken Starters', category: 'Chicken Starters', image: require('../images/slider_image.jpg') },
    { id:4, name: 'Family', category: 'Family Pack', image: require('../images/slider_image.jpg') },
  ]);

  const handleClick = (index, category) => {
    setCurrentIndex(index);
    setCurrentCategory(category);
  }

  useFocusEffect(
    useCallback(() => {
      if(route?.params?.index){
        setCurrentIndex(route?.params?.index);
        setCurrentCategory(categories[route?.params?.index]?.category);
      }else{
        setCurrentIndex(0);
        setCurrentCategory('Family Pack');
      }
    }, [route?.params?.index])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.listcontainer}>
        <FlatList
          horizontal
          data={categories}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()} 
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index} style={currentIndex === index ? styles.activeItem : styles.listItem} onPress={() => handleClick(index, item?.category)}>
              <Text style={[globalStyles.text]}>{item?.category}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={{marginHorizontal:10}}>
        {
          productData?.filter((data, i) => data.category === currentCategory)?.map((product, index) =>
          <ProductCard data={product} key={product?.id} />
          )
        }
      </View>
    </ScrollView>
  )
}

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  listcontainer: {
    marginHorizontal: 10,
  },
  listItem: {
    padding: 10,
    margin: 5,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
  },
  activeItem: {
    padding: 10,
    margin: 5,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
  },
});
