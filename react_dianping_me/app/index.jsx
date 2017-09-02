import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import RouterMap from './router/routerMap';
import './static/css/common.less';
import './static/css/font.css';

const store = configureStore();

render (
	<Provider store={store}>
		<RouterMap history={hashHistory} />
	</Provider>,
	document.getElementById('root')
);