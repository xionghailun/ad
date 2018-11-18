import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter,Route } from 'react-router-dom';
import  AdvertiserList from './pages/advertiser-list';
import { register } from './serviceWorker';

ReactDOM.render(
	<HashRouter>
		<Route path="/advertiser/list" component={AdvertiserList} />
	</HashRouter>, document.getElementById('content')
);
register();