import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default BookingBubbles = (props) => {
    const {icon} = props;
    const options = [
        ["Booking.com"],
        ["Booking.com"],
        ["Rentalcars.com"],
    ]
    return (
        <View style={{flexDirection:"row", padding:(0, "2%")}}>
            <View style={{
                flex:2,
                backgroundColor:"#e1f3ef", 
                borderRadius:25, 
                alignSelf: 'center', 
                margin:"1%"}}
            >
                <Text style={{color:"#5acbcb", fontWeight:"bold",textAlign:"center", padding: "5%"}}>
                    Book with {options[icon]}
                </Text>
            </View>
            <View style={{
                flex:1,
                alignSelf: 'center',
                margin:"1%"}}
            >
                <Text style={{fontSize:wp("4%"),color:"#ADADAD", textAlign:"right"}}>Booked?</Text>
            </View>
            <View style={{
                flex:1, 
                alignSelf: 'center',
                alignItems:"center",  
                margin:"1%"}}>
                <TouchableOpacity >
                    <MaterialCommunityIcons 
                        name="checkbox-blank-circle-outline" 
                        size={wp("7%")} 
                        color=  "#5acbcb"/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

