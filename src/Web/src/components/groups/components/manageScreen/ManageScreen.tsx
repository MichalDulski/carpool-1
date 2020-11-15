import React, { Component } from "react";
import produce from "immer";
import MapBox from "../../../map/map"
import { withTranslation } from "react-i18next";
import MediaQuery from "react-responsive";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import GroupsRouter from "../GroupsRouter";
import Button from "../../../ui/button/Button"
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import { ButtonIcon } from "../../../ui/button/enums/ButtonIcon"
import ButtonLink from "../../../ui/buttonLink/ButtonLink"
import { ButtonLinkColor } from "../../../ui/buttonLink/enums/ButtonLinkColor";
import { ButtonLinkBackground } from "../../../ui/buttonLink/enums/ButtonLinkBackground";
import { ButtonLinkIcon } from "../../../ui/buttonLink/enums/ButtonLinkIcon";
import { ButtonLinkStyle } from "../../../ui/buttonLink/enums/ButtonLinkStyle"
import { IGroupCallbacks } from "../../interfaces/IGroupCallbacks";
import GroupsList from "./components/GroupsList";
import InvitesList from "./components/InvitesList";
import { DRAFTABLE } from "immer/dist/internal";

enum Lists {
	Invites = "INVITES",
	Groups = "GROUPS",
}

interface IManageScreenProps extends IReactI18nProps, RouteComponentProps {
	callbacks: IGroupCallbacks;
}

interface IManageScreenState {
	selectedScreen: Lists;
}


class ManageScreen extends Component<IManageScreenProps, IManageScreenState> {
	private resources = {
		addGroupBtn: "groups.addGroupBtn",
		groupsBtn: "common.groups",
		invitesBtn: "groups.invitesBtn",
	};

	private cssClasses = {
		container: "groupsManagement",
		listContainer: "groupsManagementListContainer",
		buttonsContainer: "groupsManagementButtonsContainer",
		buttonsOutline: "groupsManagementButtonsContainer--outline",
		buttonActive: "groupsManagementButtonActive",
		mapBox: "groupsManagementMapBox",
	};

	private ids = {
		groupsBtn: "groupsBtn",
		invitesBtn: "invitesBtn",
	};

	constructor(props: IManageScreenProps) {
		super(props);
		this.state = {
			selectedScreen: Lists.Groups
		};
	}


	setCurrentList = (list: Lists) => {
		if (list != this.state.selectedScreen) {
			let groupsBtn = document.getElementById(this.ids.groupsBtn);
			groupsBtn?.classList.toggle(this.cssClasses.buttonActive);
			let invitesBtn = document.getElementById(this.ids.invitesBtn);
			invitesBtn?.classList.toggle(this.cssClasses.buttonActive);
		}
		this.setState(produce((draft: IManageScreenState) => {
			draft.selectedScreen = list;
		}));

	}

	renderInvitesList = () => (
		<InvitesList
			answerInviteCallback={this.props.callbacks.answerInvite}
			getInvitesCallback={this.props.callbacks.getInvites}
			getGroupsCallback={this.props.callbacks.getGroups}
		/>
	)

	renderGroupsList = () => (
		<GroupsList
			getGroupsCallback={this.props.callbacks.getGroups}
			setGroupChecked={this.props.callbacks.setGroupSelected}
		/>
	)

	renderGroups = () => {
		const { t } = this.props;
		const { url } = this.props.match;

		let list: JSX.Element;

		switch (this.state.selectedScreen) {
			case Lists.Invites:
				list = this.renderInvitesList();
				break;
			case Lists.Groups:
			default:
				list = this.renderGroupsList();
				break;
		}

		return (
			<div className={this.cssClasses.listContainer}>
				<div className={this.cssClasses.buttonsContainer}>
					<Button id={this.ids.groupsBtn} background={ButtonBackground.Gray} className={this.cssClasses.buttonActive} color={ButtonColor.Gray} onClick={() => this.setCurrentList(Lists.Groups)}>
						{t(this.resources.groupsBtn)}
					</Button>
					<Button id={this.ids.invitesBtn} background={ButtonBackground.Gray} color={ButtonColor.Gray} onClick={() => this.setCurrentList(Lists.Invites)}>
						{t(this.resources.invitesBtn)}
					</Button>
					<ButtonLink
						style={ButtonLinkStyle.Button}
						color={ButtonLinkColor.Gray}
						background={ButtonLinkBackground.Gray}
						to={`${url}${GroupsRouter.routes.addGroup}`}
					>
						{t(this.resources.addGroupBtn)}
					</ButtonLink>
				</div>
				<div className={this.cssClasses.buttonsOutline}></div>
				{list}
			</div>
		);
	}

	render() {
		return (
			<>
				<div className={this.cssClasses.container}>
					{this.renderGroups()}
					<MediaQuery query="(min-width: 900px)">
						<div className={this.cssClasses.mapBox}>
							<MapBox longitude={52.455688} latitude={16.859060} />
						</div>
					</MediaQuery>
				</div>
			</>
		);
	}
}

export default withTranslation()(withRouter(ManageScreen));