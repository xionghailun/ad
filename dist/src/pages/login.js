import React, {Component} from 'react';
import {Input,Button,Icon,Alert,message} from 'antd';
import axios from 'axios';

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName:'',
			pwd:''
		}
		this.userChange = this.userChange.bind(this);
		this.pwdChange = this.pwdChange.bind(this);
		this.login = this.login.bind(this);
	}
	userChange (e) {
		console.log(e.currentTarget.value);
		this.setState({
			userName:e.currentTarget.value
		})
	}
	pwdChange (e) {
		this.setState({
			pwd:e.currentTarget.value
		})
	}
	login () {
		if (!this.state.userName || !this.state.pwd) {
			message.error("用户名或密码不能为空！");
		}else{
			axios.post('http://localhost:3000/login',{
				username:this.state.userName,
				password:this.state.pwd
			}).then((res)=>{
				if (res.data.success) {
					let root = res.data.data.user;
					let id = res.data.data.id;
					window.sessionStorage.setItem("sessionId",id);
					window.sessionStorage.setItem("root",root);
					this.props.history.push('/advertiser/list');
				} else {
					message.error("用户名或密码错误！");
				}
			})

		}
	}
	render() {
		return (
			<div className="login">
				<div className="logo-part">
					<div className="logo"></div>
					<div className="logoTitle">AdxHi广告管理系统</div>
				</div>
				<div className="login-form">
					<div className="formTitle">登录</div>
					<div className="login-field">
						<Input placeholder="请输入用户名" prefix={<Icon type="user" style={{ color: '#fff' }} />} style={{height:'100%'}} onChange={this.userChange}/>
					</div>
					<div className="login-field">
						<Input placeholder="请输入密码" type="password" prefix={<Icon type="lock" style={{ color: '#fff' }} />} style={{height:'100%'}} onChange={this.pwdChange} />
					</div>
					<Button className="login-submit" onClick={this.login}>登录</Button>
				</div>
			</div>
		)
	}
}

export default Login;