import React, { useEffect, useState } from "react";
import { initReactI18next } from "react-i18next";
import { IGroup } from "../../interfaces/IGroup";
import { IReactI18nProps } from "../../../system/resources/IReactI18nProps";
import { withTranslation } from "react-i18next";
import MapBoxRides from "../../../map/MapBoxRides";
import Button from "../../../ui/button/Button";
import { ButtonColor } from "../../../ui/button/enums/ButtonColor";
import { ButtonBackground } from "../../../ui/button/enums/ButtonBackground";
import { ButtonIcon } from "../../../ui/button/enums/ButtonIcon";
import MediaQuery from "react-responsive";
import Input from "../../../ui/input/Input";
import { InputIcon } from "../../../ui/input/enums/InputIcon";
import { InputType } from "../../../ui/input/enums/InputType";
import { IRide } from "components/groups/interfaces/IRide";
import DateFnsUtils from "@date-io/date-fns";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch, { SwitchClassKey, SwitchProps } from "@material-ui/core/Switch";
import { withStyles, Theme, createStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";
import "date-fns";
import {
	MuiPickersUtilsProvider,
	KeyboardTimePicker,
	KeyboardDatePicker,
} from "@material-ui/pickers";
import { useImmer } from "use-immer";
import { isValidDate } from "../../../../helpers/UniversalHelper";
import { ValidationType } from "../../../ui/input/enums/ValidationType";
import { address } from "faker";

interface IRideDays {
	all: boolean;
	monday: boolean;
	tuesday: boolean;
	wednesday: boolean;
	thursday: boolean;
	friday: boolean;
	saturday: boolean;
	sunday: boolean;
}

export interface IAddGroupProps extends IReactI18nProps {
	group: IGroup;
}

enum PanelType {
	Disposable = "DISPOSABLE",
	Cyclic = "CYCLIC",
}

const AddRideFormScreen: React.FunctionComponent<IAddGroupProps> = props => {
	const [inputsValid, setInputsValid] = useImmer({
		date: true,
		time: true,
		targetAddress: true,
		fromAddress: true,
		seatsNumber: true,
	});

	const resources = {
		disposableBtn: "rides.disposableBtn",
		cyclicBtn: "rides.cyclicBtn",
		addRideLabel: "rides.addRideLabel",
		fromOrTo: "rides.fromOrTo",
		from: "rides.from",
		to: "rides.to",
		seats: "rides.seats",
		date: "rides.date",
		invalidDate: "rides.invalidDate",
		time: "rides.time",
		invalidTime: "rides.invalidTime",
		addBtn: "rides.addBtn",
		monday: "common.monday",
		tuesday: "common.tuesday",
		wednesday: "common.wednesday",
		thursday: "common.thursday",
		friday: "common.friday",
		saturday: "common.saturday",
		sunday: "common.sunday",
		all: "common.all"
	};

	const cssClasses = {
		container: "ridesAddRideForm",
		listContainer: "ridesAddRideFormLeftContainer",
		buttonsContainer: "ridesAddRideFormButtonsContainer",
		buttonsOutline: "ridesAddRideFormButtonsContainer--outline",
		buttonActive: "ridesAddRideFormButtonActive",
		mapBox: "ridesAddRideFormMapBox",
		buttonsLabel: "ridesAddRideFormButtonsContainer--label",
		checkboxContainer: "ridesAddRideForm__checkboxContainer",
		checkboxLabel: "ridesAddRideForm__checkboxLabel",
		switchActive: "ridesAddRideForm__switchActive",
		datePicker: "ridesAddRideForm__datePicker",
		inputs: "ridesAddRideForm__inputs",
		input: "ridesAddRideForm__input",
		button: "ridesAddRideForm__button",
		daysContainer: "ridesAddRideForm__daysContainer",
		daysColumn: "ridesAddRideForm__daysContainer--column"
	};

	const ids = {
		disposableBtn: "disposableBtn",
		cyclicBtn: "cyclicBtn",
		to: "toId",
		from: "fromId"
	};

	const { t } = props;

	const [switchCssClass, setSwitchCssClass] = useState({ from: cssClasses.switchActive, to: null });
	const [selectedScreen, setSelectedScreen] = useState(PanelType.Disposable);

	const [startgroup, setStartGroup] = useState(false);

	const [fromAddressCoordinates, setFromAddressCoordinates] = useState([props.group.location.latitude, props.group.location.longitude]);
	const [toAddressCoordinates, setToAddressCoordinates] = useState([props.group.location.latitude, props.group.location.longitude]);

	const [userAddressName, setUserAddresName] = useState<string>(undefined);
	const [seats, setSeats] = useState<string>(undefined);

	const [selectedDate, setSelectedDate] = useState(new Date("2014-08-18T21:11:54"));
	const [days, setDays] = useState<IRideDays>({ all: false, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false, sunday: false });

	const [submitted, setSubmitted] = useState(false);

	const handleDateChange = (date: Date) => {
		setSelectedDate(date);
		console.log(date);
	};

	const ride: IRide = {
		id: "fdsfds",
		owner: {
			userId: "fdasfda",
			firstName: "Maciej",
			lastName: "Sobkowiak",
			vehicle: "Mazda"
		},
		ownerId: "fdsa",
		destination: {
			latitude: toAddressCoordinates[0],
			longitude: toAddressCoordinates[1]
		},
		startingLocation: {
			latitude: fromAddressCoordinates[0],
			longitude: fromAddressCoordinates[1]
		},
		date: "314212351",
		isUserParticipant: true,
		group: props.group,
		groupId: props.group.id
	};

	const setCurrentList = (list: PanelType) => {
		if (list !== selectedScreen) {
			let groupsBtn = document.getElementById(ids.disposableBtn);
			groupsBtn?.classList.toggle(cssClasses.buttonActive);
			let invitesBtn = document.getElementById(ids.cyclicBtn);
			invitesBtn?.classList.toggle(cssClasses.buttonActive);
		}
		setSelectedScreen(list);
	};

	const setUserCoordinates = (coords: [number, number]) => {
		if (!startgroup) {
			setFromAddressCoordinates([props.group.location.latitude, props.group.location.longitude]);
			setToAddressCoordinates(coords);
		} else {
			setFromAddressCoordinates(coords);
			setToAddressCoordinates([props.group.location.latitude, props.group.location.longitude]);
		}
	};

	const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const address1 = fromAddressCoordinates;
		const address2 = toAddressCoordinates;
		setFromAddressCoordinates(address2);
		setToAddressCoordinates(address1);
		setStartGroup(event.target.checked);
		if (event.target.checked) {
			setSwitchCssClass({ from: null, to: cssClasses.switchActive });
		} else {
			setSwitchCssClass({ from: cssClasses.switchActive, to: null });
		}
	};

	const handleDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.name === "all") {
			setDays({
				...days, monday: event.target.checked,
				tuesday: event.target.checked,
				wednesday: event.target.checked,
				thursday: event.target.checked,
				friday: event.target.checked,
				saturday: event.target.checked,
				sunday: event.target.checked,
				all: event.target.checked,
			});
		} else {
			setDays({ ...days, [event.target.name]: event.target.checked });
		}
	};

	const LocationSwitch = withStyles({
		switchBase: {
			color: "#6b98d1",
			"&$checked": {
				color: "#6b98d1",
			},
			"&$checked + $track": {
				backgroundColor: "#707070",
			},
			"& + $track": {
				backgroundColor: "#707070",
			}
		},
		checked: {},
		track: {},
	})(Switch);

	const DaysSwitch = withStyles({
		switchBase: {
			color: "#6b98d1",
			"&$checked": {
				color: "#6b98d1",
			},
			"&$checked + $track": {
				backgroundColor: "#4a90e8",
			},
			"& + $track": {
				backgroundColor: "#707070",
			}
		},
		checked: {},
		track: {},
	})(Switch);

	const renderDisposablePanel = () => {

		return (
			<div className={cssClasses.inputs}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardDatePicker
						className={cssClasses.datePicker}
						disableToolbar
						variant="inline"
						format="dd/MM/yyyy"
						margin="dense"
						id="date-picker-inlie"
						label={t(resources.date)}
						value={selectedDate}
						onChange={(date: Date, value?: string) => {
							handleDateChange(date);
							setInputsValid(draft => {
								draft.date = isValidDate(date);
							});
							console.log("DATE: ", isValidDate(date));
						}}
						invalidDateMessage={t(resources.invalidDate)}
						KeyboardButtonProps={{
							"aria-label": "change date",
						}}
					/>
					<KeyboardTimePicker
						margin="normal"
						id="time-picker"
						className={cssClasses.datePicker}
						label={t(resources.time)}
						value={selectedDate}
						onChange={(date: Date, value?: string) => {
							handleDateChange(date);
							setInputsValid(draft => {
								draft.time = isValidDate(date);
							});
							console.log("TIME: ", isValidDate(date));
						}}
						invalidDateMessage={t(resources.invalidTime)}
						KeyboardButtonProps={{
							"aria-label": "change time",
						}}
					/>
				</MuiPickersUtilsProvider>
				<div className={cssClasses.checkboxLabel}>
					{t(resources.fromOrTo)}
				</div>
				<div className={cssClasses.checkboxContainer}>
					<span className={switchCssClass.from} id={ids.from}> {t(resources.from)}</span>
					<FormControlLabel
						control={<LocationSwitch size="medium" checked={startgroup} onChange={handleSwitchChange} />}
						label=""
					/>
					<span className={switchCssClass.to} id={ids.to}> {t(resources.to)}</span>
				</div>
				{!startgroup &&
					<Input
						style={cssClasses.input}
						type={InputType.Address}
						changeHandler={newValue => setUserAddresName(newValue)}
						placeholder={"Adres " + t(resources.to) + " przejazdu"}
						value={(userAddressName)}
						icon={InputIcon.Location}
						addressCords={coords => setUserCoordinates(coords)}
						validation={{
							validate: submitted,
							type: ValidationType.Address,
							isValidCallback: (isValid) => {
								setInputsValid(draft => {
									draft.targetAddress = isValid;
								});
							},
						}}
					/>
				}
				{startgroup &&
					<Input
						style={cssClasses.input}
						type={InputType.Address}
						changeHandler={newValue => setUserAddresName(newValue)}
						placeholder={"Adres " + t(resources.from)}
						value={(userAddressName)}
						icon={InputIcon.Location}
						addressCords={coords => setUserCoordinates(coords)}
						validation={{
							validate: submitted,
							type: ValidationType.Address,
							isValidCallback: (isValid) => {
								setInputsValid(draft => {
									draft.fromAddress = isValid;
								});
							},
						}}
					/>
				}
				<Input
					style={cssClasses.input}
					type={InputType.Text}
					changeHandler={newValue => setSeats(newValue)}
					placeholder={t(resources.seats)}
					value={(seats)}
					icon={InputIcon.Seats}
					validation={{
						validate: submitted,
						type: ValidationType.Numeric,
						isValidCallback: (isValid) => {
							setInputsValid(draft => {
								draft.seatsNumber = isValid;
							});
						},
					}}
				/>
				<Button
					className={cssClasses.button}
					onClick={() => {
						setSubmitted(true);
					}}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}>
					{t(resources.addBtn)}
				</Button>

			</div>
		);
	};

	const renderCyclicPanel = () => {

		return (
			<div className={cssClasses.inputs}>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<KeyboardTimePicker
						margin="normal"
						id="time-picker"
						className={cssClasses.datePicker}
						label={t(resources.time)}
						value={selectedDate}
						onChange={handleDateChange}
						KeyboardButtonProps={{
							"aria-label": "change time",
						}}
					/>
				</MuiPickersUtilsProvider>
				<div className={cssClasses.daysContainer}>
					<div className={cssClasses.daysColumn}>
						<FormControlLabel
							control={<DaysSwitch size="medium" checked={days.all} onChange={handleDayChange} name="all" />}
							label={t(resources.all)}
						/>
						<FormControlLabel
							control={<DaysSwitch size="medium" checked={days.monday} onChange={handleDayChange} name="monday" />}
							label={t(resources.monday)}
						/>
						<FormControlLabel
							control={<DaysSwitch size="medium" checked={days.tuesday} onChange={handleDayChange} name="tuesday" />}
							label={t(resources.tuesday)}
						/>
						<FormControlLabel
							control={<DaysSwitch size="medium" checked={days.wednesday} onChange={handleDayChange} name="wednesday" />}
							label={t(resources.wednesday)}
						/>
					</div>
					<div className={cssClasses.daysColumn}>
						<FormControlLabel
							control={<DaysSwitch size="medium" checked={days.thursday} onChange={handleDayChange} name="thursday" />}
							label={t(resources.thursday)}
						/>
						<FormControlLabel
							control={<DaysSwitch size="medium" checked={days.friday} onChange={handleDayChange} name="friday" />}
							label={t(resources.friday)}
						/>
						<FormControlLabel
							control={<DaysSwitch size="medium" checked={days.saturday} onChange={handleDayChange} name="saturday" />}
							label={t(resources.saturday)}
						/>
						<FormControlLabel
							control={<DaysSwitch size="medium" checked={days.sunday} onChange={handleDayChange} name="sunday" />}
							label={t(resources.sunday)}
						/>
					</div>
				</div>
				<div className={cssClasses.checkboxLabel}>
					{t(resources.fromOrTo)}
				</div>
				<div className={cssClasses.checkboxContainer}>
					<span className={switchCssClass.from} id={ids.from}> {t(resources.from)}</span>
					<FormControlLabel
						control={<LocationSwitch size="medium" checked={startgroup} onChange={handleSwitchChange} />}
						label=""
					/>
					<span className={switchCssClass.to} id={ids.to}> {t(resources.to)}</span>
				</div>
				{!startgroup &&
					<Input
						style={cssClasses.input}
						type={InputType.Address}
						changeHandler={newValue => setUserAddresName(newValue)}
						placeholder={"Adres " + t(resources.to) + " przejazdu"}
						value={(userAddressName)}
						icon={InputIcon.Location}
						addressCords={coords => setUserCoordinates(coords)}
					/>
				}
				{startgroup &&
					<Input
						style={cssClasses.input}
						type={InputType.Address}
						changeHandler={newValue => setUserAddresName(newValue)}
						placeholder={"Adres " + t(resources.from)}
						value={(userAddressName)}
						icon={InputIcon.Location}
						addressCords={coords => setUserCoordinates(coords)}
					/>
				}
				<Input
					style={cssClasses.input}
					type={InputType.Text}
					changeHandler={newValue => setSeats(newValue)}
					placeholder={t(resources.seats)}
					value={(seats)}
					icon={InputIcon.Seats}
				/>
				<Button
					className={cssClasses.button}
					onClick={() => (null)}
					color={ButtonColor.White}
					background={ButtonBackground.Blue}>
					{t(resources.addBtn)}
				</Button>

			</div>
		);
	};

	const renderMap = () => {
		return (
			<MapBoxRides ride={ride} />
		);
	};

	const renderLeftPanel = () => {
		const { t } = props;

		let list: JSX.Element;

		switch (selectedScreen) {
			case PanelType.Disposable:
				list = renderDisposablePanel();
				break;
			case PanelType.Cyclic:
			default:
				list = renderCyclicPanel();
				break;
		}
		return (
			<div className={cssClasses.listContainer}>
				<div className={cssClasses.buttonsLabel}>
					{t(resources.addRideLabel)}
					<span> {props.group.name}</span>
				</div>
				<div className={cssClasses.buttonsContainer}>
					<Button id={ids.disposableBtn} background={ButtonBackground.Gray} className={cssClasses.buttonActive} color={ButtonColor.Gray} onClick={() => setCurrentList(PanelType.Disposable)}>
						{t(resources.disposableBtn)}
					</Button>
					<Button id={ids.cyclicBtn} background={ButtonBackground.Gray} color={ButtonColor.Gray} onClick={() => setCurrentList(PanelType.Cyclic)}>
						{t(resources.cyclicBtn)}
					</Button>
				</div>
				<div className={cssClasses.buttonsOutline}></div>
				{list}
			</div>
		);
	};

	return (
		<div className={cssClasses.container}>
			{renderLeftPanel()}
			<MediaQuery query="(min-width: 900px)">
				<div className={cssClasses.mapBox}>
					{renderMap()}
				</div>
			</MediaQuery>
		</div>
	);
};

export default withTranslation()(AddRideFormScreen);
