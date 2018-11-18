import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Input, Select, Button, Radio, Table, Switch, DatePicker, Icon, message} from 'antd';
import axios from 'axios';

const Option = Select.Option;

class AdvertiserList extends Component {
	stateChange = (state,idx,id)=>{
		this.state.data[idx].state = state ? 1 : 0;
		this.setState({
			data:this.state.data
		})
		axios.get(`/change/campaign/${id}/${state ? 1 : 0}`)
			.then(res => {
				message.success('状态修改成功！');
			});
	};
	createCampaign = ()=>{
		message.error('您没有新建活动的权限！');
	};
	state = {
		columns: [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			render: text => <a href="javascript:;">{text}</a>,
		}, {
			title: '名称',
			dataIndex: 'cname',
			key: 'cname',
		}, {
			title: '所属广告项目',
			dataIndex: 'pname',
			key: 'pname',
		}, {
			title: '请求量',
			key: 'request',
			dataIndex: 'request'
		},{
			title: '曝光量',
			key: 'expose',
			dataIndex: 'expose'
		},{
			title: '点击',
			key: 'click',
			dataIndex: 'click'
		},{
			title: '点击率',
			key: 'clickRate',
			dataIndex: 'clickRate'
		},{
			title: 'eCPM',
			key: 'eCPM',
			dataIndex: 'eCPM'
		},{
			title: 'ACP',
			key: 'ACP',
			dataIndex: 'ACP'
		},{
			title: '消耗',
			key: 'resume',
			dataIndex: 'resume'
		},{
			title: '状态',
			key: 'state',
			dataIndex: 'state',
			render:(state,data,idx)=>{
				return (
					<div>
						<Switch checkedChildren="启用" unCheckedChildren="暂停" checked={state===0 ? false : true} onChange={(state)=>{this.stateChange(state,idx,data.id)}} style={{ marginRight:'10px',verticalAlign:'middle' }} />
						<Button style={{ float:'right' }}><NavLink to="/ad/campaign/detail">详情</NavLink></Button>
					</div>
				)
			}
		}],
		data:[]
	};

	render() {
		return (
			<div className="campaignList">
				<div className="search">
					<Select placeholder="选择广告项目" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">网赚_wym_0412_2</Option>
					</Select>
					<Input placeholder="查询广告活动" style={{flex: 10, marginRight: '6px'}}/>
					<Select placeholder="选择状态" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">上线</Option>
						<Option value="stop">暂停</Option>
					</Select>
					<DatePicker placeholder="开始日期" style={{width: '200px', marginRight: '6px'}} />
					<DatePicker placeholder="结束日期" style={{width: '200px', marginRight: '6px'}} />
					<Button style={{width: '65px'}} type="primary">查询</Button>
				</div>
				<div className="grid">
					<div style={{textAlign: 'right'}}>
						<Radio.Group value='unRegister'>
							<Radio.Button value="unRegister">未归档</Radio.Button>
							<Radio.Button value="register">已归档</Radio.Button>
						</Radio.Group>
					</div>
					<div className="createBtn">
						<Button>
							<Icon type="download"></Icon>下载数据
						</Button>
						<Button type="primary" onClick={this.createCampaign} ><Icon type="plus"></Icon>新建</Button>
					</div>
					<Table columns={this.state.columns} dataSource={this.state.data} />
				</div>
			</div>
		)
	}
	componentDidMount() {
		axios.get(`/campaign/list`)
			.then(res => {
				if (res.data.success) {
					let data = res.data.data;
					data.forEach(function(item){
						item.resume = item.resume.toFixed(2);
						if (item.click) {
							item.clickRate = (item.click/item.expose*100).toFixed(2) + '%';
							item.ACP = (item.resume/item.click).toFixed(2);
							item.eCPM = ((item.click/item.expose)*(item.resume/item.click)*1000).toFixed(2);
						}
					});
					this.setState({
						data:data
					})
				}
			});

	}
}

export default AdvertiserList;