import logo from './logo.svg';
import './App.css';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import HomePage from './pages/Home';
import UserPage from "./pages/User";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
	const fetchCsrf = () => {
		const instance = axios.create({
			timeout: 1000
		})
		// instance.get(`/api/csrf-token`).then(response => {
		// 	axios.defaults.headers.post['X-CSRF-Token'] = response.data.CsrfToken;
		// })
	}
	useEffect(() => {
		fetchCsrf()
	}, [])
	return (
		<Switch>
			<Route exact path={"/"} component={HomePage} />
			<Route exact path={"/:id"} component={UserPage} />
		</Switch>
	);
}

export default App;
