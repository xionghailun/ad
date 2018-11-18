import React, {Component} from 'react';
import { BrowserRouter,Route,Link,Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/login.js';
import Index from './pages/index.js';

// function Sso (props) {
// 	console.log(props);
// 	let isLogin = window.sessionStorage.getItem('sessionId');
// 	if (isLogin) {
// 		props.history.push({ path:"/advertiser/list"});
// 	} else {
// 		props.history.push({ path:'/login' });
// 	}
// 	return null;
// }

class App extends Component {

	render() {
		return (
			<BrowserRouter basename="/">
				<div className="App">
					<Switch>
						<Route path="/login" component={Login} />
						<Route path="/" component={Index} />
					</Switch>
					{/*<Route path="/" exact component={Sso} />*/}
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
