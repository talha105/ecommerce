import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import BasketIcon from "react-native-vector-icons/Fontisto";
import ProductItem from '../../components/productItem';
import Loader from '../../components/pageLoader';
import {useTheme} from "@react-navigation/native"

function Search ({navigation}){
    const {colors}=useTheme();

    const [loading,setLoading]=useState(true)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight: () => (
              <TouchableOpacity style={{paddingRight:responsiveWidth(3)}}>
                  <BasketIcon name="shopping-basket-add" size={20} color='white'/>
              </TouchableOpacity>
            )
            
          });
    },[navigation])

    useEffect(()=>{
        setLoading(false)
    },[])



    function renderProduct({item}){
        return(
            <ProductItem
            title="Niki Shoes"
            price="$300"
            oldPrice="$400"
            img={require('../../../assets/shoe.png')}
            call={()=>navigation.push('productDetail')}
            fav={false}
            />
        )
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <View style={{flex:1}}>
                <FlatList
                contentContainerStyle={{paddingBottom:10,alignItems:'center'}}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={[1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
                renderItem={renderProduct}
                keyExtractor={(item,i)=>i.toString()}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({

})

export default Search;
