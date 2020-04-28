import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = '241051bf13976dd3ddf8b8d9f247255e';

export default class extends React.Component {
	state = {
		isLoading: true,
	};
	getWeather = async (latitude, longitude) => {
		const {
			data: {
				main: { temp },
				weather,
			},
		} = await axios.get(
			`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
		);
		this.setState({
			isLoading: false,
			condition: weather[0].main,
			temp,
		});
	};
	getLocation = async () => {
		try {
			await Location.requestPermissionsAsync();
			const location = await Location.getCurrentPositionAsync();
			const {
				coords: { latitude, longitude },
			} = location;
			console.log(location);
			console.log(latitude, longitude);
			this.getWeather(latitude, longitude);
		} catch (error) {
			console.error(error);
		}
	};
	componentDidMount() {
		this.getLocation();
	}
	render() {
		const { isLoading, temp, condition } = this.state;
		return isLoading ? (
			<Loading />
		) : (
			<Weather temp={Math.round(temp)} condition={condition} />
		);
	}
}
