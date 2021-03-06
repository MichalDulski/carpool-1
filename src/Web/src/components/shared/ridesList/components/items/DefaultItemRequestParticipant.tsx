import React, { useState } from "react";
import { parseCoords } from "../../../../../helpers/UniversalHelper";
import { getGeocodingClient } from "../../../../map/MapBoxHelper";
import IRequestsItemProps from "../../interfaces/IRequestsItemProps";

const geocodingClient = getGeocodingClient();

const DefaultItemRequestParticipant = (props: IRequestsItemProps) => {

	const { t } = props;

	const cssClasses = {
		mainRow: "ridesList--mainRow",
		bottomRow: "ridesList--bottomRow",
		button: "ridesList--button",
		address: "ridesList--mainRow__address",
		icon: "ridesList--mainRow__icon",
		toLabel: "ridesList--mainRow__to",
		fromLabel: "ridesList--mainRow__from",
		driver: "ridesList--bottomRow__status",
	};

	const resources = {
		accepted: "requests.accepted",
		pending: "requests.pending",
		declined: "requests.declined",
		status: "requests.status",
		placeNameGetErrorLabel: "common.label.placeNameGetError",
	};

	const [loading, setLoading] = useState<boolean>(null);
	const [placeName, setPlaceName] = useState<string>(null);
	const [status, setStatus] = useState<string>(null);

	const getStatus = () => {
		if (props.request.isAccepted) {
			setStatus(t(resources.accepted));
		} else {
			if (props.request.isPending) {
				setStatus(t(resources.pending));
			} else {
				setStatus(t(resources.declined));
			}
		}
	};

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
				setPlaceName(result.place_name);
			} else {
				setPlaceName(props.t(resources.placeNameGetErrorLabel));
			}
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	const color = {
		color: props.color,
	};
	const borderColor = {
		borderColor: props.color,
	};

	if (!status) {
		getStatus();
	}

	if (!placeName && !loading && placeName !== undefined) {
		onGetName(parseCoords(props.request.ride.location));
	}
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
		<li key={props.request.rideRequestId}>
			<button
				className={cssClasses.button}
				onClick={() => props.setRequest(props.request)}
			>
				<div className={cssClasses.mainRow} style={borderColor}>
					<div className={cssClasses.icon} style={color}>
						{" "}
					</div>
					<div className={cssClasses.address}>
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
				<div className={cssClasses.bottomRow}>
					<div className={cssClasses.driver}>
						{t(resources.status) + status}
					</div>
				</div>
			</button>
		</li>
	);
};

export default (DefaultItemRequestParticipant);
