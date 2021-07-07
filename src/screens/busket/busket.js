import React, { useEffect, useState,useLayoutEffect } from 'react';
import { View ,Text,TouchableOpacity,FlatList,StyleSheet,Image} from 'react-native';
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
import DeleteIcon from "react-native-vector-icons/AntDesign";
import NotFoundIcon from "react-native-vector-icons/AntDesign";
import ProfileIcon from "react-native-vector-icons/FontAwesome5";
import Loader from '../../components/pageLoader';
import {useTheme} from "@react-navigation/native";
import DeleteModel from '../../components/deleteModel';
import * as actions from "../../store/action";
import Btn from '../../components/btn';
import {
    CircleIcon
  } from "native-base"
import {connect} from "react-redux"
import { CardField, useStripe ,StripeProvider} from '@stripe/stripe-react-native';

function Busket ({navigation,busket,deleteCardItem}){
    const {colors}=useTheme();
    const {createToken } = useStripe();
    const [loading,setLoading]=useState(true)
    const [model,setModel]=useState(false)
    const [modelData,setModelData]=useState({})
    const [delModel,setDelModel]=useState(false)
    const [currentId,setCurrentId]=useState("")
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


    function orderNow(){

    }

    function renderTotal(bus){
        var totalPrice=0;
        if(bus.length>0){
            bus.forEach(item=>{
                totalPrice=(parseFloat(item.price)*parseFloat(item.quantity))+totalPrice    
            })
        }
        return totalPrice
    }



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
                    <Image
                    style={{width:60,height:60}}
                    source={{uri:item.images}}
                    />
                </View>
                <View style={{justifyContent:'center',width:'50%'}}>
                    <Text style={{color:colors.card,fontFamily:'Montserrat-Medium',textTransform:'capitalize'}}>{item.title}</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                    <View>
                    <View style={{flexDirection:'row',alignItems:'center',marginVertical:responsiveFontSize(0.1)}}>
                        <CircleIcon color={item.color} size={responsiveFontSize(2)}/>  
                        <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey'}}> color </Text>  
                    </View> 
                    <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey',marginVertical:responsiveFontSize(0.1)}}> Size: {item.size} </Text>
                    </View>
                    <View style={{marginLeft:responsiveFontSize(1)}}>
                    <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey',marginVertical:responsiveFontSize(0.1)}}> Quantity: {item.quantity} </Text>
                    <Text style={{fontSize:responsiveFontSize(1.5),textAlign:'left',color:'grey',marginVertical:responsiveFontSize(0.1)}}> Price: {`$${(parseFloat(item.price)*parseFloat(item.quantity))}`} </Text>
                    </View>
                    </View>
                </View>
                <TouchableOpacity 
                onPress={()=>{
                    setCurrentId(item.id)
                    setDelModel(true)
                }}
                style={{justifyContent:'center',alignItems:'center',width:'25%'}}>
                <DeleteIcon
                    name="delete"
                    size={30}
                    color="#d91e1e"
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    if(loading){
        return <Loader/>
    }else{
        return(
            <View style={{flex:1}}>
                <DeleteModel
                visible={delModel}
                title="are you sure you want to delete this item?"
                closeModle={()=>setDelModel(false)}
                reDirect={()=>deleteCardItem(currentId)}
                />
                {busket.length>0?(
                    <>
                    <FlatList
                    contentContainerStyle={{paddingBottom:responsiveFontSize(1),alignItems:'center',paddingHorizontal:responsiveFontSize(1)}}
                    showsVerticalScrollIndicator={false}
                    data={busket}
                    renderItem={renderProduct}
                    keyExtractor={(item,i)=>i.toString()}
                    />
                    <View style={{width:'95%',marginLeft:'auto',marginRight:'auto',...styles.payment,backgroundColor:colors.background}}>
                        <Text style={{fontFamily:'Montserrat-Bold',textTransform:'uppercase',color:'grey'}}>Payment:</Text>
                            <StripeProvider publishableKey="pk_live_51IjNTMDTC6LK12UW7aqlq2KXrAWpcJNx7xjt3zV32xqylMdQmmQ4DLs1IvS0LJ1X5NHHPrKvq97cjCC73uZdHOt000aN6GTLZQ">
                                <CardField
                                postalCodeEnabled={false}
                                placeholder={{
                                    number: '4242 4242 4242 4242',
                                }}
                                
                                cardStyle={{
                                    backgroundColor: '#FFFFFF',
                                    textColor: '#000000',
                                }}
                                style={{
                                    width: '100%',
                                    height: 50,
                                    marginVertical: responsiveFontSize(1),
                                }}
                                onCardChange={(cardDetails) => {
                                    if(cardDetails.complete){
                                        createToken(cardDetails).then(res=>{
                                            console.log(cardDetails)
                                            
                                        })
                                    }
                                    
                                }}

                                />
                            </StripeProvider>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',borderTopWidth:0.75,borderColor:'grey',paddingVertical:responsiveFontSize(1)}}>
                            <Text style={{color:'grey'}}>Total:</Text>
                            <Text style={{color:'grey'}}>${renderTotal(busket)}</Text>
                        </View>
                    </View>
                    <View style={{padding:responsiveFontSize(1)}}>
                        <Btn
                        text="Order now"
                        color="green"
                        call={orderNow}
                        />
                    </View>
                    </>
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
    },
    payment:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding:responsiveFontSize(1.5),
        borderRadius:7
    }
})

function mapStateToProps({busket}){
    return {busket}
}

export default connect(mapStateToProps,actions)(Busket);
