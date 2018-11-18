import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import {Input, Button, Form, Icon} from 'antd';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: { span: 4 },
	wrapperCol: { span: 20 },
};

class ProjectDetail extends Component {
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
			<div className="projectDetail">
				<div className="headerBar clear">
					<div className="floatLeft">
						<Button><Icon type="left"></Icon><NavLink to="/ad/project/list">返回列表</NavLink></Button>
						<Button type="primary" style={{ marginLeft:10 }}><NavLink to="/ad/campaign/detail"><Icon type="plus"></Icon>新建广告活动</NavLink></Button>
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
							<Input placeholder="为您的广告项目取一个唯一的名称，格式如下：广告主名称_产品名称，10个字以内" disabled={!this.state.isEdit} />
						</FormItem>
						<FormItem
							label="合同编号"
							{...formItemLayout}
						>
							<Input placeholder="写一个唯一的合同编号信息，若没有签订合同，请根据需求填写下项目编号信息：投放日期_广告主名称缩写_该广告主投放的项目编号" disabled={!this.state.isEdit} />
						</FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

export default ProjectDetail;