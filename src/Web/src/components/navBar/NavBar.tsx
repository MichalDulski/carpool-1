import React, { Component } from "react";
import "./NavBar.scss";
import NavButton from "./navButton/NavButton";
import { ButtonColor } from "./navButton/enums/ButtonColor";
import { ButtonBackground } from "./navButton/enums/ButtonBackground";
import { ButtonIcon } from "./navButton/enums/ButtonIcon";
import { IReactI18nProps } from "../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import { mainRoutes } from "../layout/components/LayoutRouter";
import { ILogoutAction } from "../auth/store/Types";
import { connect } from "react-redux";
import { logout } from "../auth/store/Actions";
import { IAuthState } from "../auth/store/State";
import { ITokenInfo } from "../auth/interfaces/ITokenInfo";
import App from "../../App";
import { rideRoutes } from "../rides/RidesRouter";
import { Link } from "react-router-dom";

interface IStatePropsType {
	auth: IAuthState;
}

interface IStateFromProps {
	tokenInfo: ITokenInfo;
}

export const mapStateToProps: (state: IStatePropsType) => IStateFromProps = (state) => ({
	tokenInfo: state.auth.tokenInfo,
});

interface IDispatchPropsType {
	logout: () => ILogoutAction;
}

const mapDispatchToProps: IDispatchPropsType = {
	logout,
};

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

interface INavBarProps extends IReactI18nProps, DispatchProps, StateProps { }

interface INavBarState {
	logged: boolean;
	hamburgerActive: boolean;
}

class NavBar extends React.Component<INavBarProps, INavBarState> {
	private cssClasses = {
		navBarContainer: "navBarContainer",
		logoContainer: "logoContainer",
		navBarTabContainer: "navBarTabContainer",
		navBarTabButton: "navBarTabButton",
		navBarAccountContainer: "navBarAccountContainer",
		hamburgerMenuButtons: "hamburgerMenuButtons",
		hamburgerIcon: "hamburgerIcon",
		hamburgerToggle: "hamburgerToogle",
		change: "change",
		bar1: "bar1",
		bar2: "bar2",
	};

	private ids = {
		hamburgeIcon: "hamburgerIcon",
		container: "navBarContainer",
		hamburgerMenuButtons: "hamburgerMenuButtons",
	};

	private resources = {
		rides: "groups.ridesBtn",
		groups: "common.groups",
		requests: "rides.requestsBtn",
		login: "navBar.login",
		logout: "navBar.logout",
		register: "navBar.register",
		profile: "navBar.profile"
	};

	constructor(props: INavBarProps) {
		super(props);
		this.state = {
			logged: false,
			hamburgerActive: false,
		};
	}

	private handleHamburgerClick = () => {
		let elem = document.getElementById(this.cssClasses.hamburgerIcon);
		elem?.classList.toggle(this.cssClasses.change);
		let menu = document.getElementById(this.cssClasses.hamburgerMenuButtons);
		menu?.classList.toggle(this.cssClasses.hamburgerToggle);
	}

	private renderAccountContainer = () => {
		const { t } = this.props;
		// console.log("TOKEN INFO: ", this.props.tokenInfo);
		if (!this.props.tokenInfo?.token) { // unathorized
			return (
				<div className={this.cssClasses.navBarAccountContainer}>
					<NavButton
						color={ButtonColor.Gray}
						background={ButtonBackground.None}
						icon={ButtonIcon.User}
						to={`/${mainRoutes.login}`}
					>
						<span>
							{t(this.resources.login)}
						</span>
					</NavButton>

					<NavButton
						color={ButtonColor.White}
						background={ButtonBackground.Blue}
						to={`/${mainRoutes.register}`}
					>
						{t(this.resources.register)}
					</NavButton>
				</div>
			);
		} else {
			return (
				<div className={this.cssClasses.navBarAccountContainer}>
					<NavButton
						color={ButtonColor.Gray}
						background={ButtonBackground.None}
						icon={ButtonIcon.User}
						to={`/${mainRoutes.profile}`}
					>
						<span>
							{t(this.resources.profile)}
						</span>
					</NavButton>
					<NavButton
						color={ButtonColor.White}
						background={ButtonBackground.Blue}
						onClick={() => { this.props.logout(); }}
					>
						<span>
							{t(this.resources.logout)}
						</span>
					</NavButton>
				</div>
			);
		}
	}

	renderHamburgerButtons = () => {
		if (!this.props.tokenInfo?.token) { // unathorized
			return null;
		} else {
			const { t } = this.props;
			return (
				<div className={[this.cssClasses.hamburgerMenuButtons, this.cssClasses.hamburgerToggle].join(" ")} id={this.ids.hamburgerMenuButtons}>
					<NavButton
						color={ButtonColor.Gray}
						background={ButtonBackground.None}
						onClick={this.handleHamburgerClick.bind(this)}
						to={`/${mainRoutes.rides}`}
					>
						{t(this.resources.rides)}
					</NavButton>
					<NavButton
						color={ButtonColor.Gray}
						background={ButtonBackground.None}
						onClick={this.handleHamburgerClick.bind(this)}
						to={`/${mainRoutes.groups}`}
					>
						{t(this.resources.groups)}
					</NavButton>
					<NavButton
						color={ButtonColor.Gray}
						background={ButtonBackground.None}
						onClick={this.handleHamburgerClick.bind(this)}
						to={`/${mainRoutes.rides + rideRoutes.requests}`}
					>
						{t(this.resources.requests)}
					</NavButton>
				</div>
			);
		}
	}

	render = () => (
		<div id={this.ids.container} className={this.cssClasses.navBarContainer}>
			<div className={this.cssClasses.navBarTabContainer}>
				<Link to={App.rootRoute}>
					<div className={this.cssClasses.logoContainer}></div>
				</Link>
				{this.renderHamburgerButtons()}
			</div>

			{this.renderAccountContainer()}

			<div
				id={this.ids.hamburgeIcon}
				className={this.cssClasses.hamburgerIcon}
				onClick={this.handleHamburgerClick.bind(this)}
			>
				<div className={this.cssClasses.bar1}></div>
				<div className={this.cssClasses.bar2}></div>
			</div>
		</div>
	)
}
/* istanbul ignore next */
export default connect(mapStateToProps, mapDispatchToProps)(withTranslation()(NavBar));
