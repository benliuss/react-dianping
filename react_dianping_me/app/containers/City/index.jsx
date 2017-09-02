import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as userInfoActions from '../../actions/userinfo';

import Header from '../../components/Header';
import CurrentCity from '../../components/CurrentCity';
import CityList from '../../components/CityList';
import {CITYNAME} from "../../config/localStoreKey";
import localStore from '../../util/localStore';


class City extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
	}

	render() {
		return (
			<div>
				<Header title="选择城市" />
                <CurrentCity cityName={this.props.userinfo.cityName} />
                <CityList changeFn={this.changeCity.bind(this)} />
			</div>
		);
	}

	changeCity(newCity) {
	    if (newCity == null) {
	        return;
        }
        const userinfo = this.props.userinfo;
	    // state--cityName:
        // 作为传递给组件的属性
	    userinfo.cityName = newCity;
	    // 作为参数传给actionCreator传到store
        this.props.userInfoActions.update(userinfo);
        // cookie
        localStore.setItem(CITYNAME, newCity);
        // 跳转
        hashHistory.push('/');

    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(City);