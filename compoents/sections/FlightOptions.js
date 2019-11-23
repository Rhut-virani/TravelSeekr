import React from 'react'
import { Text, View, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';


export default FlightOptions = (props) => {
    const {item, itemHeight,itemWidth, slideHeight, slideWidth, horizontalMargin} = props;
    return (
        
        <View style={{ width: itemWidth, height: itemHeight, paddingHorizontal: horizontalMargin }}>
       
            {/* onwards card   */}
               
                <View style={[styles.cardsWrapper, { height: slideHeight / 2, width: slideWidth}]}>
                    
                    <View style={styles.card}>
                        
                        <View style={styles.cardsContent}>
                            
                            <View style={styles.cardsSection1}>
                                <View style={{flex: 4}}>
                                    <Text>
                                        Departing . {item.detarutureDate}
                                    </Text>
                                </View>
                                <View style={styles.select}>
                                    <Text style={{textAlign:"right"}}>
                                        Shortest {" "}
                                    </Text>
                                </View>
                                <Ionicons name="ios-arrow-down" size={wp("4%")} color="gray"/>
                            </View>
                            
                            <View style={styles.cardsSecion2}>
                                <View style={{flex:1, padding:"1%"}}>
                                    <Image source={{uri:item.logo}} style={styles.fluidImage} />
                                </View >
                                <View style={{flex:3, padding:"1%", flexDirection:"row"}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontWeight:"bold"}}>{item.departureTime}</Text>
                                        <Text>{item.departureAirport}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Ionicons name="ios-arrow-round-forward" size={wp("10%")} color="#000"/>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontWeight:"bold"}}>{item.arrivalTime}</Text>
                                        <Text>{item.arrivalAirport}</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={styles.cardsSecion3}>
                                <View style={{flex:4}}>
                                    <Text style={{fontSize:wp("3%"), textAlign:"left"}}>
                                        {item.stops ? item.stops : "Non"} Stop . {item.duration} . {item.name}
                                    </Text>
                                </View>
                                <View  style={{flex:2}}>
                                    <Text style={{fontWeight:"bold", fontSize:wp("4%"), textAlign:"right"}}>
                                    C$ {item.rate}
                                    </Text>
                                </View>
                            </View>
                        
                        </View>
                    </View>
                </View>

        {/* return card */}

                <View style={[styles.cardsWrapper, {height: slideHeight / 2, width: slideWidth, marginTop: wp("3%")}]}>
                    <View style={styles.card}>
                        <View style={styles.cardsContent}>
                            
                            <View style={styles.cardsSection1}>
                                <View style={{flex: 4}}>
                                    <Text>
                                        Departing . {item.returnDetarutureDate}
                                    </Text>
                                </View>
                                <View style={styles.select}>
                                    <Text style={{textAlign:"right"}}>
                                        Shortest {" "}
                                    </Text>
                                </View>
                                <Ionicons name="ios-arrow-down" size={wp("4%")} color="gray"/>
                            </View>
                            
                            <View style={styles.cardsSecion2}>
                                <View style={{flex:1, padding:"1%"}}>
                                    <Image  
                                        source={{uri:item.returnLogo}}
                                        style={styles.fluidImage} />
                                </View >
                                <View style={{flex:3, padding:"1%", flexDirection:"row"}}>
                                    <View style={{flex:1}}>
                                        <Text style={{fontWeight:"bold"}}>{item.returnDepartureTime}</Text>
                                        <Text>{item.returnDepartureAirport}</Text>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Ionicons name="ios-arrow-round-forward" size={wp("10%")} color="#000"/>
                                    </View>
                                    <View style={{flex:1}}>
                                        <Text style={{fontWeight:"bold"}}>{item.returnArrivalTime}</Text>
                                        <Text>{item.returnArrivalAirport}</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <View style={styles.cardsSecion3}>
                                
                                <View style={{flex:4}}>
                                    <Text style={{fontSize:wp("3%"), textAlign:"left"}}>
                                        {item.returnStops ? item.returnStops : "Non" } Stop . {item.returnDuration} . {item.returnName}
                                    </Text>
                                </View>
                                
                                <View  style={{flex:2}}>
                                    
                                    <Text style={{fontWeight:"bold", fontSize:wp("4%"), textAlign:"right"}}>
                                        C$ {item.returnRate}
                                    </Text>

                                </View>

                            </View>
                        
                        </View>
                    </View>
                </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cardsWrapper:{
        flex: 1,
        backgroundColor: "white",
        borderRadius: 25,
        shadowColor: "grey",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 25,  
        elevation: 2,
    },
    card:{
        flex:1, 
        padding:"3%"
    },
    cardsContent:{
        flex:1, 
        padding:"2%"
    },
    cardsSection1:{
        flex:2, 
        flexDirection:"row", 
        borderBottomWidth: 0.5, 
        borderBottomColor:"#E3E3E3"
    },
    cardsSecion2:{
        flex:3, 
        flexDirection:"row", 
        justifyContent: "center"
    },
    cardsSecion3:{
        flex:2, 
        flexDirection:"row", 
        paddingBottom:"5%",  
        alignItems:"center"
    },
    select:{
        flex: 2, 
        flexDirection:"row", 
        justifyContent:"flex-end"
    },
    fluidImage:{
        flex: 1,
        alignSelf: 'stretch',
        resizeMode:"contain",
        width: "50%",
        height: "50%"
    }
})