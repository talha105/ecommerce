import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet,Image} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import LogoutIcon from "react-native-vector-icons/AntDesign";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import Loader from '../../components/pageLoader';
import {useTheme} from "@react-navigation/native";
import NotifyModel from '../../components/notifyModel';
import NotFoundIcon from "react-native-vector-icons/AntDesign";
import { justifyContent } from 'styled-system';

function Notification ({navigation}){
    const {colors}=useTheme();
    const [loading,setLoading]=useState(true)
    const [model,setModel]=useState(false)
    const [modelData,setModelData]=useState({})

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: props => <Text style={{textAlign:'center',color:'white',fontSize:responsiveFontSize(2.5),textTransform:'uppercase',fontFamily:'Montserrat-Bold'}}>{props.children}</Text>,
            headerRight: () => (
                <TouchableOpacity style={{paddingRight:responsiveWidth(5)}}>
                    <ProfileIcon name="user-circle" size={22} color='white'/>
                </TouchableOpacity>
            )
            
          });
    },[navigation])

    useEffect(()=>{
        setLoading(false)
    },[])



    function renderProduct({item}){
        return(
            <TouchableOpacity 
            onPress={()=>{
                setModelData({
                    title:"How are you !",
                    des:"Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available"
                })
                setModel(true)
            }}
            activeOpacity={0.7} style={{...styles.con,backgroundColor:colors.background}}>
                <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                    <LogoutIcon
                    name="notification"
                    size={30}
                    color={colors.card}
                    />
                </View>
                <View style={{justifyContent:'center',width:'50%'}}>
                    <Text style={{color:colors.card,fontFamily:'Montserrat-Medium'}}>How are you !</Text>
                    <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey'}}>Lorem ipsum is a placeholder text commonly used to  the visual form of a... </Text>
                </View>
                <View style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                <LogoutIcon
                    name="doubleright"
                    size={30}
                    color={"#c5c5c5"}
                    />
                </View>
            </TouchableOpacity>
        )
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <View style={{flex:1}}>
                <NotifyModel
                visible={model}
                closeModle={()=>setModel(false)}
                des={modelData.des}
                title={modelData.title}
                />
                {true?(
                    <FlatList
                    contentContainerStyle={{paddingBottom:responsiveFontSize(1),alignItems:'center',paddingHorizontal:responsiveFontSize(1)}}
                    showsVerticalScrollIndicator={false}
                    data={[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
                    renderItem={renderProduct}
                    keyExtractor={(item,i)=>i.toString()}
                    />
                ):(
                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                        <NotFoundIcon
                        name="search1"
                        size={responsiveFontSize(10)}
                        color="grey"
                        />
                        <Text style={{fontSize:responsiveFontSize(5),color:'grey',fontFamily:'Montserrat-Bold'}}>Not Found</Text>
                    </View>
                )}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    con:{
        width:'100%',
        flexDirection:'row',
        shadowColor: "#000",
        marginVertical:responsiveFontSize(1),
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        paddingVertical:responsiveFontSize(1.5),
        elevation: 5,
        borderRadius:7
    }
})

export default Notification;
