import React, {Component} from 'react';
import {Input, Select, Button, Radio, Table, Switch} from 'antd';
import axios from 'axios';

const Option = Select.Option;

class AdvertiserList extends Component {
	stateChange = (state)=>{
		this.setState({
			'data[0].state':state
		})
		axios.get(`http://localhost:3000/change/account/1106172863/${state ? 1 : 0}`)
			.then(res => {

			});
	};
	state = {
		columns: [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			render: text => <a href="javascript:;">{text}</a>,
		}, {
			title: '名称',
			dataIndex: 'name',
			key: 'name'
		}, {
			title: '总预算（剩余）',
			dataIndex: 'budget',
			key: 'budget',
			render:(budget,data)=>{
				return (
					<div>{budget}({(budget-data.resume).toFixed(2)})</div>
				)
			}
		}, {
			title: '总消耗',
			key: 'resume',
			dataIndex: 'resume'
		}, {
			title: '创建时间',
			key: 'ctime',
			dataIndex: 'ctime'
		}, {
			title: '状态',
			key: 'state',
			dataIndex: 'state',
			render:(state)=>{
				return (
					<div>
						<Switch checkedChildren="启用" unCheckedChildren="暂停" checked={state===0 ? false : true} onChange={this.stateChange} style={{ marginRight:'10px',verticalAlign:'middle' }}  />
						<div style={{ display:'inline-block',verticalAlign:'middle' }}>
							<span className="dot"></span>
							<span>审核成功</span>
						</div>
						<Button style={{ float:'right' }}>详情</Button>
					</div>
				)
			}
		}],
		data:[]
	};

	render() {
		return (
			<div className="advertiserList">
				<div className="search">
					<Input placeholder="查询广告主" style={{flex: 10, marginRight: '6px'}}/>
					<Select placeholder="选择状态" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">上线</Option>
						<Option value="stop">暂停</Option>
					</Select>
					<Button style={{width: '65px'}} type="primary">查询</Button>
				</div>
				<div className="grid">
					<div style={{textAlign: 'right'}}>
						<Radio.Group value='unRegister'>
							<Radio.Button value="unRegister">未归档</Radio.Button>
							<Radio.Button value="register">已归档</Radio.Button>
						</Radio.Group>
					</div>
					<Table columns={this.state.columns} dataSource={this.state.data} />
				</div>
			</div>
		)
	}
	componentDidMount() {
		let user = localStorage.getItem('user');
		axios.get(`http://localhost:3000/advertiser/list/${user}`)
			.then(res => {
				if (res.data.success) {
					let data = res.data.data;
					data.forEach(function(item){
						item.resume = item.resume.toFixed(2);
					});
					this.setState({
						data:data
					})
				}
			});

	}
}

export default AdvertiserList;