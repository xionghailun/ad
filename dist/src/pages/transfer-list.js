import React, {Component} from 'react';
import {Input, Select, Button, Radio, Table, Switch} from 'antd';

const Option = Select.Option;

class AdvertiserList extends Component {
	state = {
		columns: [{
			title: '付款用户',
			dataIndex: 'payUser',
			key: 'payUser',
			render: text => <div><a href="javascript:;">{text}</a>广告代理</div>,
		}, {
			title: '收款用户',
			dataIndex: 'user',
			key: 'user',
			render: text => <div><a href="javascript:;">{text}</a>广告主(可操作)</div>,
		}, {
			title: '金额',
			dataIndex: 'budget',
			key: 'budget',
		}, {
			title: '创建时间',
			key: 'createTime',
			dataIndex: 'createTime'
		}],
		data:[{
			key: '1',
			payUser:'武汉东道网络科技有限公司',
			user: '浙江宅神网络科技有限公司',
			budget:'￥5000.00',
			createTime:'2018-04-16',
		},{
			key: '2',
			payUser:'武汉东道网络科技有限公司',
			user: '浙江宅神网络科技有限公司',
			budget:'￥5000.00',
			createTime:'2018-04-16',
		}]
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
}

export default AdvertiserList;