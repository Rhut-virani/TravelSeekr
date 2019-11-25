import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Service from "./Service";
import * as data from '../assets/testData.json';
import {setItem, multiGet} from "./DeviceStorage";


export default class Selections extends Component {
    constructor(){
        super();
        this.state = {
            itinerary: data.itinerary,
            currentFlight: {},
            currentHotel: {},
            currentCar: {},
            bookmarked: false,
            isCollapsed: [],
            flightData: data.flightData,
            hotelData: data.hotelData,
            carRentalData: data.carRentalData,
            visible : false,
        }
    }
    componentDidMount = () =>{
        let flightData, hotelData, carData; 
        setTimeout(() => {
            this.setState({
                isCollapsed : [false, true, true]
            })
            multiGet(["Flight","Hotel","Car"])
            .then((result)=>{
                flightData = JSON.parse(result[0][1]);
                hotelData = JSON.parse(result[1][1]);
                carData = JSON.parse(result[2][1]);
            })
            .then(()=>{
                this.setState({
                    currentFlight: flightData || data.flightData[0],
                    currentHotel: hotelData || data.hotelData[0],
                    currentCar: carData || data.carRentalData[0]
                })
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
    _currentSelection = (service ,item) =>{
        if(service === "Flight") {
            this.setState({currentFlight: item});
        }
        else if(service === "Car") {
            this.setState({currentCar: item})
        }
        else {this.setState({currentHotel: item})
        }
        setItem(service, JSON.stringify(item));
    }
    render() {
        const {itinerary, hotelData, carRentalData, flightData, currentCar, currentFlight, currentHotel} = this.state
        
        const persons = `${itinerary.numberOfPersons} Person${ itinerary.numberOfPersons === 1 ?'' : 's' }`;
        const rooms = `${itinerary.numberOfRooms} Room${ itinerary.numberOfRooms === 1 ?'' : 's' }`;
        const nights = `${itinerary.hotelNights} Night${ itinerary.hotelNights === 1 ?'' : 's' }`;
        const carDays = `${itinerary.numberOfDays} Day${ itinerary.numberOfDays === 1 ?'' : 's' }`;
        const flightRate = (( currentFlight.rate + currentFlight.returnRate ) * itinerary.numberOfPersons) || 0;
        const carRate = (currentCar.ratePerDay * itinerary.numberOfDays) || 0;
        const hotelRate = (currentHotel.ratePerNight * itinerary.numberOfRooms * itinerary.hotelNights) || 0;
         
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
                        isCollapsed={this.state.isCollapsed[0]}
                        icon = {0}
                        tripDetails1={itinerary.flightType}
                        tripDetails2={persons}
                        rate={flightRate}
                        tripData = {flightData}
                        currentItem = {currentFlight}
                        visible  = {this.state.visible}
                        _opensections = {this._opensections}
                        _popUp = {this._popUp}
                        _currentSelection = {this._currentSelection}
                        />
                    <Service 
                        isCollapsed={this.state.isCollapsed[1]}
                        icon = {1}
                        tripDetails1={nights}
                        tripDetails2={rooms}
                        rate={hotelRate}
                        currentItem = {currentHotel}
                        tripData={hotelData}
                        visible  = {this.state.popUp}
                        _opensections = {this._opensections}
                        _popUp = {this._popUp}
                        _currentSelection = {this._currentSelection}
                        />
                    <Service 
                        isCollapsed={this.state.isCollapsed[2]}
                        icon = {2}
                        tripDetails1={carDays}
                        tripDetails2={""}
                        rate={carRate}
                        currentItem = {currentCar}
                        tripData={carRentalData}
                        visible  = {this.state.popUp}                        
                        _currentSelection = {this._currentSelection}
                        _popUp = {this._popUp}
                        _opensections = {this._opensections}
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
                                {"     "}C$ {(carRate + hotelRate + flightRate) || 0 }
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
