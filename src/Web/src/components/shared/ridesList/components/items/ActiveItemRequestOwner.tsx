import React, { useState, useEffect } from "react";
import { parseCoords } from "../../../../../helpers/UniversalHelper";
import { convertDate } from "../../../../../helpers/UniversalHelper";
import { getGeocodingClient } from "../../../../map/MapBoxHelper";
import ButtonSmall from "../../../../ui/buttonSmall/ButtonSmall";
import { ButtonSmallBackground } from "../../../../ui/buttonSmall/enums/ButtonSmallBackground";
import { ButtonSmallColor } from "../../../../ui/buttonSmall/enums/ButtonSmallColor";
import { ButtonSmallIcon } from "../../../../ui/buttonSmall/enums/ButtonSmallIcon";
import IRequestsItemProps from "../../interfaces/IRequestsItemProps";

const geocodingClient = getGeocodingClient();

interface IActiveItemRequestOwnerProps extends IRequestsItemProps {
	answerCallback: (requestId: string, accepted: boolean) => void;
}

const ActiveItemRequestOwner = (props: IActiveItemRequestOwnerProps) => {

	const { t } = props;

	const cssClasses = {
		mainRow: "ridesList--mainRow",
		address: "ridesList--mainRow__address",
		icon: "ridesList--mainRow__icon",
		toLabel: "ridesList--mainRow__to",
		fromLabel: "ridesList--mainRow__from",
		activeContainer: "ridesListActive",
		activeButtonContainer: "ridesListActive--button",
		activeBottomRow: "ridesListActive--bottomRow",
		activeJoinButton: "ridesListActive--joinButton",
		activeDriver: "ridesListActive--driver",
		activeDate: "ridesListActive--date",
		activeSeats: "ridesListActive--seats",
		activeCar: "ridesListActive--car",
		activeStatus: "ridesListActive--status",
		activeButtons: "ridesListActive--buttonsContainer",
		activePickUp: "ridesListActive--pickUp",
	};

	const resources = {
		requestFrom: "requests.requestFrom",
		placeNameGetErrorLabel: "common.label.placeNameGetError",
	};

	const [loading, setLoading] = useState(null);
	const [placeName, setPlaceName] = useState(null);
	const [pickUpName, setPickUpName] = useState(null);

	const onGetName = async (coords: [number, number]) => {
		try {
			setLoading(true);
			const response = await geocodingClient
				.reverseGeocode({
					query: coords,
					mode: "mapbox.places",
					countries: ["PL"],
					language: ["PL"],
				})
				.send();
			const result = response.body.features[0];
			if (result !== undefined && result.hasOwnProperty("place_name")) {
				return (result.place_name);
			} else {
				return (props.t(resources.placeNameGetErrorLabel));
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const onAccept = () => {
		props.answerCallback(props.request.rideRequestId, true);
	};

	const onDecline = () => {
		props.answerCallback(props.request.rideRequestId, false);
	};

	const color = {
		color: props.color
	};
	const borderColor = {
		borderColor: props.color
	};

	useEffect(() => {
		onGetName(parseCoords(props.request.ride.location)).then(value => setPlaceName(value));
		onGetName(parseCoords(props.request.requestingUser.location)).then(value => setPickUpName(value));
	}, []);

	let fromName: string;
	let toName: string;

	switch (props.request.ride.rideDirection) {
		case 0: {
			fromName = placeName;
			toName = props.request.ride.group.name;
			break;
		}
		case 1: {
			toName = placeName;
			fromName = props.request.ride.group.name;
			break;
		}
		default: {
			toName = "";
			fromName = "";
			break;
		}
	}

	return (
		<li className={cssClasses.activeContainer} key={props.request.rideRequestId}>
			<div className={cssClasses.activeButtonContainer} >
				<div className={cssClasses.mainRow} style={borderColor}>
					<div className={cssClasses.icon} style={color}>	</div>
					<div className={cssClasses.address} >
						<div className={cssClasses.fromLabel}>
							{!loading &&
								fromName
							}
						</div>
						<div className={cssClasses.toLabel}>
							{!loading &&
								toName
							}
						</div>
					</div>
				</div>
				<div className={cssClasses.activeBottomRow}>
					<div className={cssClasses.activeStatus}>
						{t(resources.requestFrom) + props.request.requestingUser.firstName + " " + props.request.requestingUser.lastName}
					</div>
					<div className={cssClasses.activePickUp}>
						Punkt odbioru: {pickUpName}
					</div>
					<div className={cssClasses.activeDate}>
						{convertDate(props.request.ride.date.toString())}
					</div>
					<div className={cssClasses.activeButtons}>
						<ButtonSmall
							background={ButtonSmallBackground.White}
							color={ButtonSmallColor.Green}
							icon={ButtonSmallIcon.Accept}
							onClick={onAccept}
						/>
						<ButtonSmall
							background={ButtonSmallBackground.White}
							color={ButtonSmallColor.Red}
							icon={ButtonSmallIcon.Close}
							onClick={onDecline}
						/>
					</div>
				</div>
			</div>
		</li>
	);
};

export default (ActiveItemRequestOwner);
