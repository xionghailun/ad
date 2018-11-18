import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Input, Button, Form, Icon, DatePicker, message} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};

class CampaignDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isEdit:false
		}
		this.toggleState = this.toggleState.bind(this);
	}
	toggleState() {
		this.setState({
			isEdit:!this.state.isEdit
		})
	}
	createCampaign() {
		message.error('您没有新建广告单元的权限！');
	}
	render() {
		return (
			<div className="campaignDetail">
				<div className="headerBar clear">
					<div className="floatLeft">
						<Button><Icon type="left"></Icon><NavLink to="/ad/campaign/list">返回列表</NavLink></Button>
						<Button type="primary" style={{ marginLeft:10 }} onClick={this.createCampaign} ><Icon type="plus"></Icon>新建广告单元</Button>
					</div>
					<div className="floatRight">
						{this.state.isEdit ? <Button onClick={this.toggleState}><Icon type="save"></Icon>保存</Button>: <Button onClick={this.toggleState}><Icon type="edit"></Icon>编辑</Button>}
					</div>
				</div>
				<div className="grid">
					<Form layout="horizontal">
						<FormItem
							label="名称"
							{...formItemLayout}
						>
							<Input placeholder="建议：产品_定向条件_排期，示例：国美_上海_0809-0902" disabled={!this.state.isEdit} />
						</FormItem>
						<FormItem
							label="渠道"
							{...formItemLayout}
						>
							<Input value="惠头条" disabled />
						</FormItem>
						<FormItem
							label="广告位"
							{...formItemLayout}
						>
							<Input value="信息流前两位随机" disabled />
						</FormItem>
						<FormItem
							label="广告位实例"
							{...formItemLayout}
						>
							<img src="http://resource.adxhi.com/apollo/picture/20180314/f20cd71c67a54e03bfee1dac49686169/首页信息流前两位.png" style={{height:300,float:'left'}} />
						</FormItem>
						<FormItem
							label="合同编号"
							{...formItemLayout}
						>
							<Input placeholder="写一个唯一的合同编号信息，若没有签订合同，请根据需求填写下项目编号信息：投放日期_广告主名称缩写_该广告主投放的项目编号" disabled={!this.state.isEdit} />
						</FormItem>
						<FormItem
							label="开始时间"
							{...formItemLayout}
						>
							<DatePicker placeholder="选择开始日期" disabled={!this.state.isEdit} style={{ float:'left' }} />
						</FormItem>
						<FormItem
							label="结束时间"
							{...formItemLayout}
						>
							<DatePicker placeholder="选择结束日期" disabled={!this.state.isEdit} style={{ float:'left'}} />
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default CampaignDetail;