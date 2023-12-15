import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getFromStorage} from '../utils/Helper';
import {clientRequest} from '../utils/ApiRequests';
import ProductCard from '../components/ProductCard';
import {globalStyles} from '../constants/globalStyles';
import RedLine from '../components/RedLine';
import colors from '../constants/colors';

const Offers = ({route, navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const {offerId} = route?.params;

  const getOfferProductsById = async id => {
    setLoading(true);
    const devideId = await getFromStorage('deviceId');
    const offerProducts = await clientRequest('api/v1/public/offers', 'GET', {
      deviceid: devideId,
      devicename: 'Android',
    });

    if (offerProducts?.data) {
      const filteredOffer = await offerProducts?.data?.find(
        (offer, i) => offer?._id === id,
      );
      setProducts(filteredOffer?.products);
    }
    setLoading(false);
  };

  useEffect(() => {
    getOfferProductsById(offerId);
  }, [offerId]);

  return (
    <View style={globalStyles.container}>
      <View>
        <RedLine text="Offers" />
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size={'large'} color={colors.red} />
        </View>
      ) : (
        <ScrollView>
          {products?.map((product, index) => (
            <ProductCard data={product} key={index}/>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Offers;

const styles = StyleSheet.create({});
