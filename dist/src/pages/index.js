import React, {Component} from 'react';
import { Layout,Menu, Icon } from 'antd';
import { Route,NavLink } from 'react-router-dom';
import  AdvertiserList from './advertiser-list';
import CampaignList from './campaign-list';
import ProjectList from './project-list';
import ReportAd from './report-ad';
import TransferList from './transfer-list';
import UnitList from './unit-list';
import ProjectDetail from './project-detail.js';
import CampaignDetail from './campaign-detail.js';
import UnitDetail from './unit-detail.js';
import Recharge from './recharge.js';
import 'antd/dist/antd.css';

const { Header, Footer, Sider, Content } = Layout;
const SubMenu = Menu.SubMenu;

function Logo(props) {
	if (props.collapsed === true) {
		return '惠'
	} else {
		return '惠易投'
	}
}
function Text(props) {
	if (props.collapsed === true) {
		return null;
	} else {
		return '广告主';
	}
}

class Index extends Component {
	constructor(props) {
		super(props);
		let isLogin = window.sessionStorage.getItem('sessionId');
		let openKey = '';
		if (props.location.pathname.indexOf('/ad/')>-1) {
			openKey = 'sub1';
		} else if (props.location.pathname.indexOf('/finance')>-1) {
			openKey = 'sub2';
		}
		this.state = {
			collapsed: false,
			isLogin:false,
			currentPath:props.location.pathname,
			openKey:openKey
		};
		this.loginOut = this.loginOut.bind(this);
		if (!isLogin) {
			props.history.push({ pathname:'/login' });
			return false;
		}
	}

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	};

	loginOut() {
		window.sessionStorage.removeItem('sessionId');
		this.props.history.push('/login');
	};

	render() {
		return (
			<Layout>
				{/*<Redirect to="/advertiser/list" />*/}
				<Sider trigger={null}
					   collapsible
					   collapsed={this.state.collapsed}>
					<div className="logo" onClick={this.toggle}><Logo collapsed={this.state.collapsed} /></div>
					<Menu theme="dark" mode="inline" defaultSelectedKeys={[this.state.currentPath]} defaultOpenKeys={[this.state.openKey]}>
						<Menu.Item key="/advertiser/list">
							<NavLink to="/advertiser/list"><Icon type="team" /><Text collapsed={this.state.collapsed} /></NavLink>
						</Menu.Item>
						<SubMenu
							key="sub1"
							title={<span><Icon type="appstore-o" /><span>投放管理</span></span>}
						>
							<Menu.Item key="/ad/project/list">
								<NavLink to="/ad/project/list">广告项目</NavLink>
							</Menu.Item>
							<Menu.Item key="/ad/campaign/list">
								<NavLink to="/ad/campaign/list">广告活动</NavLink>
							</Menu.Item>
							<Menu.Item key="/ad/unit/list">
								<NavLink to="/ad/unit/list">广告单元</NavLink>
							</Menu.Item>
						</SubMenu>
						<SubMenu
							key="sub2"
							title={<span><Icon type="wallet" /><span>财务管理</span></span>}
						>
							<Menu.Item key="/finance/transfer/list">
								<NavLink to="/finance/transfer/list">转账管理</NavLink>
							</Menu.Item>
						</SubMenu>
						{/*<SubMenu*/}
							{/*key="sub3"*/}
							{/*title={<span><Icon type="area-chart" /><span>报表统计</span></span>}*/}
						{/*>*/}
							{/*<Menu.Item key="/report/ad">*/}
								{/*<NavLink to="/report/ad">投放统计</NavLink>*/}
							{/*</Menu.Item>*/}
						{/*</SubMenu>*/}
					</Menu>
				</Sider>
				<Layout>
					<Header>
						<div className="header-item item-label">广告主</div>
						<a  onClick={this.loginOut} href="javascript:;" className="header-item logout" style={{ width:'64px' }}>
							<Icon type="logout" />
						</a>
						<div className="header-item comp"><Icon type="user" /><span style={{ marginLeft:'10px' }}>浙江宅神网络科技有限公司</span></div>
					</Header>
					<Content>
						<div id="content" >
							<Route path="/advertiser/list" component={AdvertiserList} />
							<Route path="/ad/project/list" component={ProjectList} />
							<Route path="/ad/campaign/list" component={CampaignList} />
							<Route path="/ad/unit/list" component={UnitList} />
							<Route path="/finance/transfer/list" component={TransferList} />
							<Route path="/report/ad" component={ReportAd} />
							<Route path="/ad/project/detail" component={ProjectDetail} />
							<Route path="/ad/campaign/detail" component={CampaignDetail} />
							<Route path="/ad/unit/detail" component={UnitDetail} />
							<Route path="/recharge" component={Recharge} />
						</div>
					</Content>
					<Footer>
						<strong>Copyright © 2018 书铭信息科技（上海）有限公司</strong>
					</Footer>
				</Layout>
			</Layout>
		)
	}
}

export default Index;