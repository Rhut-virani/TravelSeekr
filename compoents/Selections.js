import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as data from '../assets/testData.json';
import Service from "./Service";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Selections extends Component {
    constructor(){
        super();
        this.state = {
            itinerary: data.itinerary,
            flightRate: 650,
            hotelRate: 129,
            carRate: 129,
            bookmarked: false,
            isCollapsed: [],
            flightData: data.flightData,
            hotelData: data.hotelData,
            carRentalData: data.carRentalData,
            visible : false,
        }
    }
    componentDidMount = () =>{
        setTimeout(() => {
            this.setState({
                isCollapsed : [false, true, true]
            })
        }, 1);
    }
    _bookmarkButton = ()=>{
        this.setState({
            bookmarked: !this.state.bookmarked,
        })
    }
    _opensections = (id) =>{
        const copy = Array.from(this.state.isCollapsed);
        const newArr = copy.map((e,i)=>{
            return (id === i) ? e = false : e = true ;
        })
        this.setState({
            isCollapsed : newArr
        })
    }
    _popUp = (value) =>{
        this.setState({
            visible : value
        })
    }
    render() {
        const {itinerary, hotelData, carRentalData, flightData} = this.state
        return (
            <View style={styles.wrapper}>
                {/* itinerary head with details of dates and locations */}
                <View style={styles.itineraryHead}>
                    
                    <View style={styles.arrow}>
                        <Ionicons name="md-arrow-back" size={20} color="white" />
                    </View>
                    
                    <View style={styles.textWrapper}>
                        <Text style={styles.mainText}>Calgary Tech Conference</Text>
                        <Text style={styles.subText}>
                                {itinerary.onwardsDate} . {itinerary.onwardsTime}  /  {itinerary.returnDate} . {itinerary.returnTime}
                        </Text>
                        <Text style={styles.subText}>
                            {itinerary.departureCity} {"  "}
                            <Ionicons name="md-swap" size={10} color="white" /> {"  "}
                            {itinerary.destination}
                        </Text>
                    </View>
                    
                    <View style={[ 
                        styles.bookmarkWrapper,
                        {backgroundColor : this.state.bookmarked ? "#ffc670" :"#5acbcb"}]}
                    >
                        <TouchableOpacity 
                            activeOpacity = {0.8}
                            onPress={this._bookmarkButton} 
                            style={styles.bookmark}>
                                <MaterialIcons name="bookmark-border" size={30} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
                

                {/* section containing the individual flights hotel and car details  */}
                <View style={styles.itinerarySections}>
                    <Service
                        _opensections = {this._opensections}
                        isCollapsed={this.state.isCollapsed[0]}
                        icon = {0}
                        tripDetails1={itinerary.flightType}
                        tripDetails2={itinerary.numberOfPersons}
                        rate={342}
                        tripData = {flightData}
                        _popUp = {this._popUp}
                        visible  = {this.state.visible}
                        />
                    <Service 
                        _opensections = {this._opensections}
                        isCollapsed={this.state.isCollapsed[1]}
                        icon = {1}
                        tripDetails1={itinerary.hotelNights}
                        tripDetails2={itinerary.numberOfRooms}
                        rate={326}
                        tripData={hotelData}
                        _popUp = {this._popUp}
                        visible  = {this.state.popUp}
                        />
                    <Service 
                        _opensections = {this._opensections}
                        isCollapsed={this.state.isCollapsed[2]}
                        icon = {2}
                        tripDetails1={itinerary.numberOfDays}
                        tripDetails2={""}
                        rate={88}
                        tripData={carRentalData}
                        _popUp = {this._popUp}
                        visible  = {this.state.popUp}
                        />
                </View>

                {/* trip overview and total */}
                <View style={styles.tripOverviewContainer}>
                    <View style={{padding:"1%", flexDirection:"row", alignContent: "center"}}>
                        
                        <View style={[styles.overviewContainer, {flex:5}]}>
                                <Text style={styles.totalText}>
                                    {"     "}Trip Overview
                                </Text>
                        </View>
                        
                        {/* trip total */}
                        <View style={[styles.overviewContainer, {flex:3, justifyContent:"center"}]}>
                            <Text style={styles.totalText}>
                                {"     "}C$ 756
                            </Text>
                        </View>

                    </View>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        height: hp("100%"),
        backgroundColor: "#5acbcb",
        paddingBottom: "5%"
    },
    itineraryHead:{
        height: hp("20%"),
        flexDirection: "row",
        padding: "10%",
    },
    itinerarySections:{
        height: hp("80%"),
        borderTopLeftRadius : 25,
        backgroundColor: "#F0F3F8",
    },
    tripOverviewContainer:{
        position: "absolute",
        height: hp("6%"),
        bottom: 0,
        width: wp("100%"),
        borderTopLeftRadius : 25,
        backgroundColor: "white",
    },
    overviewContainer:{
        flexDirection:"row", 
        alignItems:"center",
        alignContent:"center", 
    },
    totalText:{
        fontSize:wp("4%"), 
        fontWeight:"bold", 
        color:"black"
    },
    arrow:{
        flex: 1,
    },
    textWrapper:{
        flex: 6,
        alignContent: "flex-start"
    },
    bookmark:{
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bookmarkWrapper:{
        borderRadius: wp("15%")/2,
        height: wp("15%"),
        width: wp("15%"),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    mainText:{
        fontSize: wp('3.75%'),
        color: "white",
        fontWeight: "bold",
        padding: "2%",
    },
    subText:{
        fontSize: wp('3%'),
        color: "white",
        padding: "2%",
    }
})
