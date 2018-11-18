import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Input, Button, Form, Icon, DatePicker,Select} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
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
	render() {
		return (
			<div className="campaignDetail">
				<div className="headerBar clear">
					<div className="floatLeft">
						<Button><Icon type="left"></Icon><NavLink to="/ad/campaign/list">返回列表</NavLink></Button>
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
							<Input placeholder="建议带上活动_物料信息等" disabled={!this.state.isEdit} />
						</FormItem>
						<FormItem
							label="点击动作"
							{...formItemLayout}
						>
							<Select defaultValue="lucy" disabled={!this.state.isEdit}>
								<Option value="jack">下载</Option>
								<Option value="lucy">跳转</Option>
								<Option value="disabled">微信小程序分享</Option>
								<Option value="Yiminghe">deepLink</Option>
							</Select>
						</FormItem>
						<FormItem
							label="点击链接"
							{...formItemLayout}
						>
							<Input placeholder="请填写您的广告的跳转地址或者落地页地址，开头格式为http://，示例：http://www.adxhi.com" value="http://47.105.115.5:8000/" disabled={!this.state.isEdit}  />
						</FormItem>
						<FormItem
							label="样式"
							{...formItemLayout}
						>
							<Select defaultValue="lucy" disabled={!this.state.isEdit}>
								<Option value="jack">信息流-三图</Option>
								<Option value="lucy">信息流-左图右文</Option>
								<Option value="disabled">大图</Option>
							</Select>
						</FormItem>
						<FormItem
							label="物料类型"
							{...formItemLayout}
						>
							<Select defaultValue="candy" disabled={!this.state.isEdit}>
								<Option value="jack">影视</Option>
								<Option value="lucy">社交</Option>
								<Option value="disabled">钟表配饰</Option>
								<Option value="john">母婴</Option>
								<Option value="lily">体育</Option>
								<Option value="candy">理财</Option>
							</Select>
						</FormItem>
						<FormItem
							label="标题"
							{...formItemLayout}
						>
							<Input value="姐妹花用手机玩赚，集体逆袭白富美，嗨爆朋友圈"  disabled={!this.state.isEdit} />
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default CampaignDetail;