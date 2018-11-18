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
		axios.get(`/change/unit/${id}/${state ? 1 : 0}`)
			.then(res => {
				message.success('状态修改成功！');
			});
	};
	toDetail = (uname)=> {
		this.props.history.push({
			pathname:'/ad/unit/detail',
			state:{
				name:uname
			}
		})
	};
	state = {
		columns: [{
			title: 'ID',
			dataIndex: 'id',
			key: 'id',
			render: text => <a href="javascript:;">{text}</a>,
		}, {
			title: '名称',
			dataIndex: 'uname',
			key: 'uname',
		}, {
			title: '所属广告活动',
			dataIndex: 'cname',
			key: 'cname',
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
						<Button style={{ float:'right' }} onClick={()=>{this.toDetail(data.uname)}}>详情</Button>
					</div>
				)
			}
		}],
		data:[]
	};

	render() {
		return (
			<div className="unitList">
				<div className="search">
					<Select placeholder="选择广告项目" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">网赚_wym_0412_2</Option>
					</Select>
					<Select placeholder="选择广告活动" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">get_0613</Option>
					</Select>
					<Input placeholder="查询广告单元" style={{flex: 10, marginRight: '6px'}}/>
					<Select placeholder="选择状态" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">上线</Option>
						<Option value="stop">暂停</Option>
					</Select>
					<Select placeholder="选择渠道" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">惠头条</Option>
					</Select>
					<Select placeholder="选择广告位" style={{width: '200px', marginRight: '6px'}}>
						<Option value="online">惠头条签到信息流</Option>
						<Option value="stop">惠头条内容详情页信息流-推荐</Option>
						<Option value="stop">惠头条内容详情页信息流-banner下固定信息流</Option>
						<Option value="stop">banner 16:9惠头条内容详情页</Option>
						<Option value="stop">个人中心头部banner</Option>
						<Option value="stop">随机位置</Option>
					</Select>
					<DatePicker placeholder="开始日期" style={{width: '200px', marginRight: '6px', marginTop: '6px'}} />
					<DatePicker placeholder="结束日期" style={{width: '200px', marginRight: '6px', marginTop: '6px'}} />
					<Button style={{width: '65px', marginTop: '6px'}} type="primary">查询</Button>
				</div>
				<div className="grid">
					<div style={{ marginBottom:'55px' }}>
						<div style={{width:'50%',textAlign: 'left',float:'left'}}>
							<Radio.Group value='unRegister'>
								<Radio.Button value="unRegister">全部</Radio.Button>
								<Radio.Button value="register">未提交</Radio.Button>
								<Radio.Button value="register2">审核中</Radio.Button>
								<Radio.Button value="register3">审核成功</Radio.Button>
								<Radio.Button value="register4">审核失败</Radio.Button>
							</Radio.Group>
						</div>
						<div style={{width:'50%',textAlign: 'right',float:'right'}}>
							<Radio.Group value='unRegister'>
								<Radio.Button value="unRegister">未归档</Radio.Button>
								<Radio.Button value="register">已归档</Radio.Button>
							</Radio.Group>
						</div>
					</div>
					<div className="createBtn">
						<Button>
							<Icon type="download"></Icon>下载数据
						</Button>
						<Button type="primary"><Icon type="plus"></Icon>新建</Button>
					</div>
					<Table columns={this.state.columns} dataSource={this.state.data} />
				</div>
			</div>
		)
	}
	componentDidMount() {
		axios.get(`/unit/list`)
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