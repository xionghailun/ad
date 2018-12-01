import React, {Component} from 'react';
import { Button,Input,Form,message } from 'antd';
import axios from 'axios';
const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: { span: 28 },
		sm: { span: 4 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 16 },
	},
};

class Recharge extends Component {

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target[0])
		axios.post('/transfer/save',{
			client:e.target[0].value,
			adver:e.target[1].value,
			amount:parseFloat(e.target[2].value)
		})
			.then(function(res){
				if (res.data.success) {
					message.success('保存成功！')
				}
			})
	};
	render() {
		return (
			<div className="recharge">
				<Form onSubmit={this.handleSubmit}>
					<FormItem
						{...formItemLayout}
						label="付款方"
					>
						<Input name="client"/>
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="收款方"
					>
						<Input name="adver" value="湖北点滴网络科技有限公司" disabled />
					</FormItem>
					<FormItem
						{...formItemLayout}
						label="金额"
					>
						<Input name="amount"/>
					</FormItem>
					<FormItem >
						<Button type="primary" htmlType="submit">保存</Button>
					</FormItem>
				</Form>
			</div>
		)
	}
}
export default Recharge;