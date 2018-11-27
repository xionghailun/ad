import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Input, Select, Button, Radio, Table, Switch, DatePicker, Icon, message} from 'antd';
import axios from 'axios';

const Option = Select.Option;

class AdvertiserList extends Component {
	stateChange = (state)=>{
		axios.get(`/change/project/1208684444/${state ? 1 : 0}`)
			.then(res => {

			});
	};
	createProject = ()=>{
		message.error('您没有新建项目的权限！');
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
			key: 'name',
		}, {
			title: '广告主',
			dataIndex: 'owner',
			key: 'owner',
		}, {
			title: '消耗',
			key: 'resume',
			dataIndex: 'resume'
		},{
			title: '状态',
			key: 'state',
			dataIndex: 'state',
			render:(state)=>{
				return (
					<div>
						{/*<Switch checkedChildren="启用" unCheckedChildren="暂停" checked={state===0 ? false : true} onChange={this.stateChange} style={{ marginRight:'10px',verticalAlign:'middle' }} />*/}
						<div style={{ display:'inline-block',verticalAlign:'middle' }}>
							<span className="dot"></span>
							<span>审核成功</span>
						</div>
						<Button style={{ float:'right' }}><NavLink to="/ad/project/detail">详情</NavLink></Button>
					</div>
				)
			}
		}],
		data:[]
	};

	render() {
		return (
			<div className="projectList">
				<div className="search">
					<Input placeholder="查询广告项目" style={{flex: 10, marginRight: '6px'}}/>
					<Select placeholder="选择状态" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">上线</Option>
						<Option value="stop">暂停</Option>
					</Select>
					<DatePicker placeholder="开始日期" style={{width: '200px', marginRight: '6px'}} />
					<DatePicker placeholder="结束日期" style={{width: '200px', marginRight: '6px'}} />
					<Button style={{width: '65px'}} type="primary">查询</Button>
				</div>
				<div className="grid">
					{/*<div style={{textAlign: 'right'}}>*/}
						{/*<Radio.Group value='unRegister'>*/}
							{/*<Radio.Button value="unRegister">未归档</Radio.Button>*/}
							{/*<Radio.Button value="register">已归档</Radio.Button>*/}
						{/*</Radio.Group>*/}
					{/*</div>*/}
					<Button type="primary" style={{ position:'absolute',right:45,top:35,zIndex:99 }} onClick={this.createProject} ><Icon type="plus"></Icon>新建</Button>
					<Table columns={this.state.columns} dataSource={this.state.data} />
				</div>
			</div>
		)
	}
	componentDidMount() {
		axios.get(`/project/list/1106172863`)
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