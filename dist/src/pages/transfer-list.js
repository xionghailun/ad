import React, {Component} from 'react';
import {Input, Select, Button, Radio, Table, Switch} from 'antd';
import axios from 'axios';

const Option = Select.Option;

class AdvertiserList extends Component {
	state = {
		columns: [{
			title: '付款用户',
			dataIndex: 'client',
			key: 'client',
			render: text => <div><a href="javascript:;">{text}</a>广告代理</div>,
		}, {
			title: '收款用户',
			dataIndex: 'adver',
			key: 'adver',
			render: text => <div><a href="javascript:;">{text}</a>广告主(可操作)</div>,
		}, {
			title: '金额',
			dataIndex: 'amount',
			key: 'amount',
			render: text => <div>￥{text}</div>
		}, {
			title: '创建时间',
			key: 'create_time',
			dataIndex: 'create_time'
		}],
		data:[]
	};

	render() {
		return (
			<div className="transferList">
				<div className="grid">
					<Table columns={this.state.columns} dataSource={this.state.data} />
				</div>
			</div>
		)
	}

	componentDidMount() {
		axios.get(`/transfer/list`)
			.then(res => {
				if (res.data.success) {
					let data = res.data.data;
					data.forEach(function(item){
						item.create_time = new Date(item.create_time).toString();
					})
					this.setState({
						data:data
					})
				}
			});

	}
}

export default AdvertiserList;