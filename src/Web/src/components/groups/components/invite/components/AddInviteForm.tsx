import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { useImmer } from "use-immer";
import { Key } from "../../../../../constants/Key";
import { each } from "../../../../../helpers/UniversalHelper";
import Button from "../../../../ui/button/Button";
import ButtonSmall from "../../../../ui/buttonSmall/ButtonSmall";
import { ButtonSmallBackground } from "../../../../ui/buttonSmall/enums/ButtonSmallBackground";
import { ButtonSmallColor } from "../../../../ui/buttonSmall/enums/ButtonSmallColor";
import { ButtonSmallIcon } from "../../../../ui/buttonSmall/enums/ButtonSmallIcon";
import AutocompleteWrapper from "../../../../ui/autocompleteWrapper/AutocompleteWrapper";
import { IInviteUser } from "../interfaces/IInviteUser";
import { UserAutocompleteRequest } from "../../../api/userAutocomplete/UserAutocompleteRequest";
import { IReactI18nProps } from "../../../../system/resources/IReactI18nProps";
import { ButtonColor } from "../../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../../ui/button/enums/ButtonBackground";

interface IAddInviteFormProps extends IReactI18nProps {
	addUserToInvite: (user: IInviteUser) => void;
	removeUser: (user: IInviteUser) => void;
	users: IInviteUser[];
	onConfirm: () => void;
	currentAppUserId: string;
	groupUserIds: string[];
}

interface IUserAutocompleteData {
	[email: string]: {
		firstName: string;
		lastName: string;
		appUserId: string;
	};
}

const resources = {
	addBtn: "addBtn",
	prevBtn: "prevBtn",
	createBtn: "groups.addGroupForm.createBtn",
	emailInput: "groups.addGroupForm.email",
	emailInputComment: "groups.addGroupForm.emailComment",
	nameInput: "groups.addGroupForm.name",
	surnameInput: "groups.addGroupForm.surname",
	basicInfo: "groups.addGroupForm.basicInfo2",
	confirm: "groups.addGroupForm.confirmBtn",
	listLabel: "groups.addGroupForm.listLabel"
};

const cssClasses = {
	container: "addGroupContainerSecond",
	inputs: "addGroupSecondSide__inputs",
	userList: "addGroupSecondSide__userList",
	userListItem: "addGroupSecondSide__userListItem",
	userListItemName: "addGroupSecondSide__userListItemName",
	buttonsGroup: "addGroupSecondSide__buttonsGroup",
};

const AddInviteForm: (props: IAddInviteFormProps) => JSX.Element = props => {
	const { t } = props;
	const [inputsValid, setInputsValid] = useImmer({
		email: true,
	});
	const [email, setEmail] = useState<string>(null);
	const [submitted, setSubmitted] = useState(false);
	const [emailsDict, setEmailsDict] = useState<IUserAutocompleteData>({});
	const [disabledBtn, setDisabledBtn] = useState<boolean>(true);

	const clearInputs = () => {
		setEmail(null);
	};

	const onAdd = () => {
		if (each(inputsValid, i => i)) {
			const dictData = emailsDict[email];
			if (email && dictData) {
				props.addUserToInvite({
					email,
					...dictData,
				});
				setInputsValid(draft => {
					draft.email = false;
				});
				clearInputs();
			}
			setSubmitted(false);
		} else {
			setSubmitted(false);
		}
	};

	useEffect(() => {
		if (props.users.length) {
			setDisabledBtn(false);
		}
	}, [props.users]);

	useEffect(() => {
		if (submitted) {
			onAdd();
		}
	}, [submitted, inputsValid]);

	const onEnter: (event: KeyboardEvent) => void = event => {
		if (event.key === Key.Enter) {
			setSubmitted(true);
		}
	};

	useEffect(() => {
		document.addEventListener("keypress", onEnter);
		return () => {
			document.removeEventListener("keypress", onEnter);
		};
	}, []);

	const autocompleteCallback: (value: string) => Promise<string[]> = async (value) => {
		const updatedDict: IUserAutocompleteData = {};
		const result: string[] = [];
		if (value && value.length > 0) {
			const request = new UserAutocompleteRequest({
				queries: {
					email: value,
				},
			});
			const response = await request.send();
			if (!response.isError) {
				console.log(Object.keys(emailsDict));
				response.result.forEach(u => {
					if (u.appUserId !== props.currentAppUserId && !props.groupUserIds.includes(u.appUserId) && !props.users.map(u => u.email).includes(u.email)) {
						result.push(u.email);
						updatedDict[u.email] = { ...u };
					}
				});
			}
		}
		setEmailsDict(updatedDict);
		return result;
	};

	const selectedOptionCallback = () => {
		setInputsValid(draft => {
			draft.email = true;
		});
	};

	const confirmButtonClick = () => {
		props.onConfirm();
	};

	const addButtonClick = () => {
		setSubmitted(true);
	};

	const onEmailInputChange: (newValue: string) => void = newValue => {
		setEmail(newValue);
	};

	const renderInputs = () => (
		<div className={cssClasses.inputs}>
			<span> {t(resources.basicInfo)}</span>
			<AutocompleteWrapper
				onChange={onEmailInputChange}
				wrapperStyle={{ width: "400px" }}
				placeholder={t(resources.emailInput)}
				onSelect={selectedOptionCallback}
				value={email}
				autocompleteCallback={autocompleteCallback}
			/>
			<div className={cssClasses.buttonsGroup}>
				<Button
					color={ButtonColor.White}
					background={ButtonBackground.Green}
					onClick={addButtonClick}>
					{t(resources.addBtn)}
				</Button>
				<Button
					disabled={disabledBtn}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}
					onClick={confirmButtonClick}>
					{t(resources.confirm)}
				</Button>
			</div>
		</div>
	);

	const renderUserList = () => {
		let colorList: string[] = ["#C39BD3", "#7FB3D5", "#48C9B0", "#F9E79F"];
		let colorIndex: number = 0;

		return (
			<ul className={cssClasses.userList}>
				<span>{t(resources.listLabel)}</span>
				{props.users.map((user, idx) => {
					++colorIndex;
					const color = {
						color: colorList[colorIndex % colorList.length]
					};
					return (
						<li key={idx}>
							<div className={cssClasses.userListItem} style={color}>
								<div className={cssClasses.userListItemName}>
									{`${user.firstName} ${user.lastName} (${user.email})`}
								</div>
								<ButtonSmall
									icon={ButtonSmallIcon.Close}
									onClick={() => props.removeUser(user)}
									color={ButtonSmallColor.Gray}
									background={ButtonSmallBackground.White}
								/>
							</div>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div className={cssClasses.container}>
			{renderInputs()}
			{renderUserList()}
		</div>
	);
};

export default withTranslation()(AddInviteForm);
