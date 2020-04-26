import React from 'react';
import Loading from './Loading';
import { API_KEY } from 'react-native-dotenv';

export default function App() {
	console.log(API_KEY);
	return <Loading />;
}
