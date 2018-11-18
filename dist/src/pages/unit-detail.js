import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Input, Button, Form, Icon, DatePicker,Select, Upload, Modal} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};
const unitInfo = {
	'get_6':{
		name:'get_6',
		link:'http://47.105.115.5:8000/',
		style:'三图',
		type:'理财',
		title:'妻子在家用微信半个月居然提了辆车，丈夫感觉不对劲，真相遭曝光！',
		fileList:[{
			uid: '-1',
			name: 'xxx.png',
			status: 'done',
			url: '/static/images/1_1.jpg',
		},{
			uid: '0',
			name: 'xxx.png',
			status: 'done',
			url: '/static/images/1_2.jpg',
		},{
			uid: '1',
			name: 'xxx.png',
			status: 'done',
			url: '/static/images/1_3.jpg',
		}]
	},
	'get_62':{
		name:'get_62',
		link:'http://47.105.115.5:8000/',
		style:'三图',
		type:'理财',
		title:'姐妹花用手机玩赚，集体逆袭白富美，嗨爆朋友圈！',
		fileList:[{
			uid: '-1',
			name: 'xxx.png',
			status: 'done',
			url: '/static/images/2_1.jpg',
		},{
			uid: '0',
			name: 'xxx.png',
			status: 'done',
			url: '/static/images/2_2.jpg',
		},{
			uid: '1',
			name: 'xxx.png',
			status: 'done',
			url: '/static/images/2_3.jpg',
		}]
	}
}

class CampaignDetail extends Component {
	constructor(props) {
		super(props);
		console.log(props);
		this.state = {
			isEdit:false,
			info:unitInfo[props.location.state.name],
			previewVisible:false,
			previewImage:''
		}
		this.toggleState = this.toggleState.bind(this);
	}
	toggleState() {
		this.setState({
			isEdit:!this.state.isEdit
		})
	}
	handleCancel = () => this.setState({ previewVisible: false });

	handlePreview = (file) => {
		this.setState({
			previewImage: file.url,
			previewVisible: true,
		});
	};
	handlePreview() {

	}
	render() {
		return (
			<div className="campaignDetail">
				<div className="headerBar clear">
					<div className="floatLeft">
						<Button><Icon type="left"></Icon><NavLink to="/ad/unit/list">返回列表</NavLink></Button>
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
							<Input placeholder="建议带上活动_物料信息等" value={this.state.info.name} disabled={!this.state.isEdit} />
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
							<Input placeholder="请填写您的广告的跳转地址或者落地页地址，开头格式为http://，示例：http://www.adxhi.com" value={this.state.info.link} disabled={!this.state.isEdit}  />
						</FormItem>
						<FormItem
							label="样式"
							{...formItemLayout}
						>
							<Select value={this.state.info.style} disabled={!this.state.isEdit}>
								<Option value="三图">信息流-三图</Option>
								<Option value="左图右文">信息流-左图右文</Option>
								<Option value="大图">大图</Option>
							</Select>
						</FormItem>
						<FormItem
							label="物料类型"
							{...formItemLayout}
						>
							<Select value={this.state.info.type} disabled={!this.state.isEdit}>
								<Option value="影视">影视</Option>
								<Option value="社交">社交</Option>
								<Option value="钟表配饰">钟表配饰</Option>
								<Option value="母婴">母婴</Option>
								<Option value="体育">体育</Option>
								<Option value="理财">理财</Option>
							</Select>
						</FormItem>
						<FormItem
							label="标题"
							{...formItemLayout}
						>
							<Input value={this.state.info.title}  disabled={!this.state.isEdit} />
						</FormItem>
					</Form>
					<div className="clearfix" style={{ paddingLeft:'16.7%' }}>
						<Upload
							action="//jsonplaceholder.typicode.com/posts/"
							listType="picture-card"
							fileList={this.state.info.fileList}
							onPreview={this.handlePreview}
						>
						</Upload>
						<Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
							<img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
						</Modal>
					</div>
				</div>
			</div>
		)
	}
}

export default CampaignDetail;