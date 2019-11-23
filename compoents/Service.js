import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import BubbleOptions from "./ui/BubbleOptions";
import BookingBubbles from "./ui/BookingBubbles";
import OptionCards from './OptionCards';
import Dialog, { DialogContent } from 'react-native-popup-dialog';


export default function Service(props) {

    const icons = [
        <FontAwesome name="plane" size={wp("4.5%")} color="gray" iconStyle="marginRight:5"/>,
        <Ionicons name="ios-bed" size={wp("4.5%")} color="gray" iconStyle="marginRight:5"/>,
        <MaterialCommunityIcons name="car" size={wp("4.5%")} color="gray" iconStyle="marginRight:5"/>,
    ];
    const service = ["Flight", "Hotel", "Car"];
    const {icon, tripDetails1, tripDetails2, rate, isCollapsed, _opensections, tripData, visible, _popUp} = props;
    const bgColor = ["#5acbcb", "#F0F3F8", "#FFFFFF"];

    return (
        <View style={{backgroundColor:bgColor[icon]}}>
            <View style={[styles.serviceContainer, {backgroundColor: icon % 2 ? "#FFFFFF" : "#F0F3F8"}]}>

            {/* section that is touchable which opens the collapsed section */}
                <TouchableOpacity onPress={()=>{_opensections(icon)}}>
                    <View style={{padding:"1%", flexDirection:"row"}}>
                        
                    {/* Service Type Icon and heading  */}
                        <View style={{flex:5, flexDirection:"row"}}>
                            <View style={styles.iconStyle}>
                                {icons[icon]}
                            </View>
                            <View style={{flex:2, alignSelf:"center"}}>
                                <Text 
                                    style={{fontSize:isCollapsed ? wp("3.75%") : wp("4%") , 
                                    fontWeight:isCollapsed ? "normal" : "bold", 
                                    color: isCollapsed ? "grey" : "black"}}
                                >
                                    {service[icon]}
                                </Text>
                            </View>
                            <View style={{flex:4, alignSelf:"center"}}>
                                <Text style={{color:"grey", fontSize: wp("3.75%")}}>
                                    {tripDetails1}
                                    {(tripDetails2) ? ', ' : "" }
                                    {tripDetails2}
                                </Text>
                            </View>
                        </View>
                        
                    {/* total rate and options */}
                        <View style={{flex:3, flexDirection:"row",justifyContent:"flex-end"}}>
                            
                            <View style={{flex:3, alignSelf:"center", alignItems:"flex-end"}}>
                                <Text style= {{ 
                                        fontSize:isCollapsed ? wp("3.75%") : wp("4%") , 
                                        fontWeight:isCollapsed ? "normal" : "bold", 
                                        color: isCollapsed ? "grey" : "black" }} 
                                >
                                    C$ {rate}
                                </Text>
                            </View>
                            <Dialog
                                visible={visible || false}
                                onTouchOutside={()=>{_popUp(false)}}
                            >
                                <DialogContent>
                                    <Text style={{ padding: "5%" }}>
                                        {"Options"}
                                    </Text>
                                </DialogContent>
                            </Dialog>
                            <TouchableOpacity style={styles.iconStyle} onPress={()=>{_popUp(true)}}>
                                <Ionicons name="md-more" size={wp("5%")} color="lightgrey" /> 
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                
                {/* collapsed section which opens after a touch to the respective section*/}
                <Collapsible collapsed={isCollapsed}>

                    <BubbleOptions  icon = {icon} />

                    <OptionCards  icon = {icon} tripData = {tripData}/>

                    <BookingBubbles  icon = {icon} />

                </Collapsible>
            </View>
        </View>

    )
}


const styles = StyleSheet.create({
    serviceContainer:{
        borderTopLeftRadius : 25,
        paddingTop: "1%",
        paddingBottom: "1%",
    },
    iconStyle:{
        flex:1, 
        alignSelf:"center", 
        alignItems:"center"
    },
})