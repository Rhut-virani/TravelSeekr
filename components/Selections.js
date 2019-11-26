import React, { Component } from "react";
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	TouchableOpacity
} from "react-native";
import * as data from "../assets/testData.json";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from "react-native-responsive-screen";
import Service from "./Service";
import { setItem, multiGet } from "./DeviceStorage";

export default class Selections extends Component {
	constructor() {
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
			visible: false,
			isLoading: true
		};
	}
	componentDidMount = () => {
		let flightData, hotelData, carData;
		multiGet(["Flight", "Hotel", "Car"])
			.then(result => {
				flightData = JSON.parse(result[0][1]);
				hotelData = JSON.parse(result[1][1]);
				carData = JSON.parse(result[2][1]);
			})
			.then(() => {
				this.setState({
					currentFlight: flightData || data.flightData[0],
					currentHotel: hotelData || data.hotelData[0],
					currentCar: carData || data.carRentalData[0],
					isLoading: false
				});
			})
			.then(() => {
				this.setState({
					isCollapsed: [false, true, true]
				});
			})
			.catch(error => {
				console.log(error);
			});
	};
	_bookmarkButton = () => {
		this.setState({
			bookmarked: !this.state.bookmarked
		});
	};
	_opensections = id => {
		const copy = Array.from(this.state.isCollapsed);
		const newArr = copy.map((e, i) => {
			return id === i ? (e = false) : (e = true);
		});
		this.setState({
			isCollapsed: newArr
		});
	};
	_popUp = value => {
		this.setState({
			visible: value
		});
	};
	_currentSelection = (service, item) => {
		if (service === "Flight") {
			this.setState({ currentFlight: item });
		} else if (service === "Car") {
			this.setState({ currentCar: item });
		} else {
			this.setState({ currentHotel: item });
		}
		setItem(service, JSON.stringify(item));
	};
	render() {
		const {
			itinerary,
			hotelData,
			carRentalData,
			flightData,
			currentCar,
			currentFlight,
			currentHotel
		} = this.state;

		const persons = `${itinerary[1].numberOfPersons} Person${
			itinerary.numberOfPersons === 1 ? "" : "s"
		}`;
		const rooms = `${itinerary[1].numberOfRooms} Room${
			itinerary[1].numberOfRooms === 1 ? "" : "s"
		}`;
		const nights = `${itinerary[1].hotelNights} Night${
			itinerary[1].hotelNights === 1 ? "" : "s"
		}`;
		const carDays = `${itinerary[1].numberOfDays} Day${
			itinerary[1].numberOfDays === 1 ? "" : "s"
		}`;
		const flightRate =
			(currentFlight.rate + currentFlight.returnRate) *
				itinerary[1].numberOfPersons || 0;
		const carRate = currentCar.ratePerDay * itinerary[1].numberOfDays || 0;
		const hotelRate =
			currentHotel.ratePerNight *
				itinerary[1].numberOfRooms *
				itinerary[1].hotelNights || 0;

		const tripDetails = [
			[itinerary[0].flightType, persons, flightData, flightRate, currentFlight],
			[nights, rooms, hotelData, hotelRate, currentHotel],
			[carDays, " ", carRentalData, carRate, currentCar]
		];

		let serviceJSX = [];
		serviceJSX = tripDetails.map((e, i) => {
			return (
				<Service
					key={i}
					isCollapsed={this.state.isCollapsed[i]}
					icon={i}
					tripDetails1={e[0]}
					tripDetails2={e[1]}
					tripData={e[2]}
					rate={e[3]}
					currentItem={e[4]}
					visible={this.state.visible}
					_currentSelection={this._currentSelection}
					_popUp={this._popUp}
					_opensections={this._opensections}
				/>
			);
		});
		if (this.state.isLoading) {
			return (
				<View style={styles.loadingwrapper}>
					<ActivityIndicator size="large" color="#sacbcb" />
				</View>
			);
		} else {
			return (
				<View style={styles.wrapper}>
					<View style={styles.itineraryHead}>
						<View style={styles.arrow}>
							<Ionicons name="md-arrow-back" size={20} color="white" />
						</View>

						<View style={styles.textWrapper}>
							<Text style={styles.mainText}>Calgary Tech Conference</Text>
							<Text style={styles.subText}>
								{itinerary[0].onwardsDate} . {itinerary[0].onwardsTime} /{" "}
								{itinerary[0].returnDate} . {itinerary[0].returnTime}
							</Text>
							<Text style={styles.subText}>
								{itinerary[0].departureCity} {"  "}
								<Ionicons name="md-swap" size={10} color="white" /> {"  "}
								{itinerary[0].destination}
							</Text>
						</View>

						<View
							style={[
								styles.bookmarkWrapper,
								{
									backgroundColor: this.state.bookmarked ? "#ffc670" : "#5acbcb"
								}
							]}
						>
							<TouchableOpacity
								activeOpacity={0.8}
								onPress={this._bookmarkButton}
								style={styles.bookmark}
							>
								<MaterialIcons name="bookmark-border" size={30} color="white" />
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.itinerarySections}>{serviceJSX}</View>

					<View style={styles.tripOverviewContainer}>
						<View
							style={{
								padding: "1%",
								flexDirection: "row",
								alignContent: "center"
							}}
						>
							<View style={[styles.overviewContainer, { flex: 5 }]}>
								<Text style={styles.totalText}>{"     "}Trip Overview</Text>
							</View>

							<View
								style={[
									styles.overviewContainer,
									{ flex: 3, justifyContent: "center" }
								]}
							>
								<Text style={styles.totalText}>
									{"     "}C$ {carRate + hotelRate + flightRate || 0}
								</Text>
							</View>
						</View>
					</View>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	loadingwrapper: {
		flex: 1,
		alignContent: "center",
		justifyContent: "center"
	},
	wrapper: {
		flex: 1,
		height: hp("100%"),
		backgroundColor: "#5acbcb",
		paddingBottom: "5%"
	},
	itineraryHead: {
		height: hp("20%"),
		flexDirection: "row",
		padding: "10%"
	},
	itinerarySections: {
		height: hp("80%"),
		borderTopLeftRadius: 25,
		backgroundColor: "#F0F3F8"
	},
	tripOverviewContainer: {
		position: "absolute",
		height: hp("6%"),
		bottom: 0,
		width: wp("100%"),
		borderTopLeftRadius: 25,
		backgroundColor: "white"
	},
	overviewContainer: {
		flexDirection: "row",
		alignItems: "center",
		alignContent: "center"
	},
	totalText: {
		fontSize: wp("4%"),
		fontWeight: "bold",
		color: "black"
	},
	arrow: {
		flex: 1
	},
	textWrapper: {
		flex: 6,
		alignContent: "flex-start"
	},
	bookmark: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	bookmarkWrapper: {
		borderRadius: wp("15%") / 2,
		height: wp("15%"),
		width: wp("15%"),
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5
	},
	mainText: {
		fontSize: wp("3.75%"),
		color: "white",
		fontWeight: "bold",
		padding: "2%"
	},
	subText: {
		fontSize: wp("3%"),
		color: "white",
		padding: "2%"
	}
});
