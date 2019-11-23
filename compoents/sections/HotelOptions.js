import React from 'react'
import { Text, View, StyleSheet, Image, ImageBackground } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

export default HotelOptions = (props) => {
    const {item, itemHeight,itemWidth, slideHeight, slideWidth, horizontalMargin} = props;
    return (

        <View style={{
                width: itemWidth,
                height: itemHeight,
                paddingHorizontal: horizontalMargin,
                padding: 10
                }}>
                
                <View style={[styles.cardsWrapper, {height: slideHeight,  width: slideWidth}]}>
                 
                   <ImageBackground 
                        source={{uri:item.url}}
                        style={{flex:1}}
                        imageStyle= {{ borderTopLeftRadius: 25, borderTopRightRadius: 25 }}
                        >
                        <LinearGradient 
                                colors={[ "transparent", "transparent", "#1f1f1f",]}
                                style={{height:"100%", flexDirection:"column-reverse"}}
                        >
                        <View style={{flex:1, justifyContent:'flex-end'}}>
                            <Text style={{ 
                                color: 'white', 
                                fontSize: wp("3%"), 
                                fontWeight: 'bold', 
                                paddingLeft:"5%", 
                                paddingBottom:"3%"}} 
                            >
                                    {item.rating}{"   "}{item.review}{"   "}{item.star} star hotel
                            </Text>
                        </View>
                        </LinearGradient>
                    </ImageBackground>
                    <View style={{flex:1,  padding:"2%"}}>
                        <View style={{flex:1, justifyContent:'space-between'}}>

                            <View style={{flex:1}}>
                                <Text style={{ color: '#000', fontSize: wp("4.5%"), fontWeight:"bold"}}>
                                    {"  "}{item.name}
                                </Text>
                            </View>

                            <View style={{flex:1, justifyContent:"flex-start"}}>
                                <Text style={{ color: '#ADADAD', fontSize: wp("3.5%"), fontWeight:"bold"}}>
                                    {"  "}{item.extra} {item.deal}
                                </Text>
                            </View>

                            <View style={{flex:1, justifyContent:"center", flexDirection:"row"}}>
                                
                                <Text style={{ flex:2, justifyContent:"flex-start", color: '#ADADAD', fontSize: wp("3%")}}>
                                    {"  "}{item.distance}
                                </Text>

                                <Text style={{ flex:1, justifyContent:"flex-end", color: '#000', fontSize: wp("3.5%"), fontWeight:"bold"}}>
                                    {"  "}C$ {item.ratePerNight} 
                                        <Text style={{ color: '#ADADAD', fontSize: wp("3%")}}>
                                            / night
                                        </Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
    )
}

const styles = StyleSheet.create({
    cardsWrapper: {
        flex: 1,
        backgroundColor: "white",
        borderRadius: 25,
        shadowColor: "grey",
        shadowOffset: { width: 2, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 25,  
        elevation: 10,
    }
})