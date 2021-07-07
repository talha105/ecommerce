import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet,TextInput} from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import Loader from '../../components/pageLoader';
import ProductItem from '../../components/productItem';
import {useTheme} from "@react-navigation/native";
import SearchBar from '../../components/searchBar';
import * as actions from "../../store/action"
import {connect} from "react-redux"

function Home ({navigation,getBanners,banners}){
    const {colors}=useTheme();
    const [images,setImages]=useState([
        require('../../../assets/1.png'),
        require('../../../assets/2.png'),
        require('../../../assets/3.png')
    ])
    const [loading,setLoading]=useState(true)

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props =>(
                <View style={{width:'100%'}}>
                    <SearchBar/>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity style={{paddingRight:responsiveWidth(5)}}>
                    <ProfileIcon name="user-circle" size={22} color='white'/>
                </TouchableOpacity>
            )
            
          });
    },[navigation])

    useEffect(()=>{
        getBanners().then(()=>setLoading(false))
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
                <SliderBox
                inactiveDotColor="#ee6709"
                autoplay={true}
                circleLoop={true}
                sliderBoxHeight={responsiveHeight(30)}
                imageLoadingColor="#ee6709"
                images={banners.map((item)=>item.imgs_path)}
                />
                <View>
                    <View style={styles.latestLabel}>
                        <Text style={{color:'grey'}}>
                            Latest Products
                        </Text>
                    </View>
                </View>
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
    sliderCon:{
        height:responsiveHeight(30),
        backgroundColor:'green',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    latestLabel:{
        padding:responsiveFontSize(2),
        borderBottomWidth:0.5,
        borderColor:'#ee6709'
    }
})

function mapStateToProp({banners}){
    return {banners}
}

export default connect(mapStateToProp,actions)(Home);
