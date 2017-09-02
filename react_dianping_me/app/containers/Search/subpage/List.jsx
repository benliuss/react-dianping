import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {getSearchData} from "../../../fetch/search/search";
import {connect} from 'react-redux';

import ListComponent from '../../../components/List';
import LoadMore from '../../../components/LoadMore';


const initialState = {
    data: [],
    hasMore: false,
    isLoadingMore: false,
    page: 0
};
class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initialState;
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length
                        ? <ListComponent data={this.state.data} />
                        : ''
                }
                {
                    this.state.hasMore
                        ? <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)} />
                        : ''
                }
            </div>
        );
    }

    componentDidMount() {
        this.loadFirstPageData();
    }

    loadFirstPageData() {
        const cityName = this.props.userinfo.cityName;
        const category = this.props.category;
        const keyword = this.props.keyword || '';
        const result = getSearchData(0, cityName, category, keyword);
        this.resultHandle(result);
    }

    loadMoreData() {
        this.setState({
            isLoadingMore: true,
        });
        const cityName = this.props.userinfo.cityName;
        const page = this.state.page;
        const category = this.props.category;
        const keyword = this.props.keyword || '';
        const result = getSearchData(page, cityName, category, keyword);
        this.resultHandle(result);
        this.setState({
            isLoadingMore: false
        });
    }

    resultHandle(result) {
        const page = this.state.page;
        this.setState({
            page: page + 1
        });
        result.then(res => {
            return res.json();
        }).then(json => {
            const hasMore = json.hasMore;
            const data = json.data;
            this.setState({
                hasMore: hasMore,
                data: this.state.data.concat(data)
            });
        }).catch(ex => {
            if (__DEV__) {
                console.error('首页“猜你喜欢”获取数据报错,', ex.message);
            }
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const keyword = this.props.keyword;
        const category = this.props.category;
        if (keyword === prevProps.keyword && category === prevProps.category) {
            return;
        }
        this.setState(initialState);
        this.loadFirstPageData();
    }
}


function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    };
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchList);