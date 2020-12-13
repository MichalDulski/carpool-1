import React, { Component } from "react";
import NavBar from "../navBar/NavBar";
import Footer from "../footer/Footer";
import LayoutRouter from "./components/LayoutRouter";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { connect } from "react-redux";
import { DispatchProps, mapDispatchToProps, mapStateToProps, StateProps } from "./store/PropsTypes";
import LoaderSplash from "../ui/loaderSplash/LoaderSplash";

import "./Layout.scss";
import "react-toastify/dist/ReactToastify.css";

interface ILayoutProps extends RouteComponentProps, StateProps, DispatchProps { }

class Layout extends Component<ILayoutProps> {
	private cssClasses = {
		main: "main",
		mainFlex: "main--flex",
	};

	private mainPaths: string[] = ["/", ""];

	render: () => JSX.Element = () => {
		// current url
		const { pathname } = this.props.location;
		let redirectComponent: JSX.Element = null;
		if (this.props?.redirectTo) {
			redirectComponent = <Redirect to={this.props.redirectTo} />;
			this.props.redirected();
		}
		const mainHeight: number = document.querySelector(".main")?.clientHeight;
		const mainCssClasses: string[] = [this.cssClasses.main];
		// main page should have different height
		if (this.mainPaths.includes(pathname)) {
			mainCssClasses.push(this.cssClasses.mainFlex);
		}
		return (
			<React.Fragment>
				<NavBar />
				<ToastContainer />
				<main className={mainCssClasses.join(" ")}>
					<LoaderSplash
						active={this.props.loaderVisible}
						height={mainHeight}
					>
						<LayoutRouter />
					</LoaderSplash>
				</main>
				{redirectComponent}
				<Footer />
			</React.Fragment>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Layout));
