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
	formatDate(date) {
		let year = date.getFullYear();
		let month = date.getMonth()+1;
		let day = date.getDate();
		let hour = date.getHours();
		let minute = date.getMinutes();
		return year + '-' + (month>9 ? month : '0'+month) + '-' + (day>9 ? day : '0'+day) + ' ' + (hour>9 ? hour : '0'+hour) + ':' + (minute>9 ? minute : '0'+minute);
	}
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
		let _this = this;
		axios.get(`/transfer/list`)
			.then(res => {
				if (res.data.success) {
					let data = res.data.data;
					data.forEach(function(item){
						item.create_time = _this.formatDate(new Date(item.create_time));
					})
					this.setState({
						data:data
					})
				}
			});

	}
}

export default AdvertiserList;