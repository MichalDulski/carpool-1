import { Action } from "redux";
import { IRideRequest } from "../../groups/interfaces/IRideRequest";

export enum GenericActionTypes {
	ApiError = "RIDES_STORE_API_ERROR"
}

/** Enum of ride requests actions */
export enum RideRequestsActionTypes {
	GetRideRequests = "RIDES_GET_REQUESTS",
	GetRideRequestsSuccess = "RIDES_GET_REQUESTS_SUCCESS",
	GetRideRequestsError = "RIDES_GET_REQUESTS_ERROR",
	AnswerRideRequest = "RIDES_ANSWER_REQUEST",
	AnswerRideRequestSuccess = "RIDES_ANSWER_REQUEST_SUCCESS",
	AnswerRideRequestError = "RIDES_ANSWER_REQUEST_ERROR",
}

//#region GENERIC
export interface IApiErrorAction extends Action<GenericActionTypes.ApiError> {
	errorMessage: string;
}
//#endregion

//#region RIDE REQUESTS
/** Action for getting ride reqs */
export interface IGetRideRequestsAction extends Action<RideRequestsActionTypes.GetRideRequests> {
	owner: boolean;
}

/** Action for getting ride reqs success */
export interface IGetRideRequestsSuccessAction extends Action<RideRequestsActionTypes.GetRideRequestsSuccess> {
	requests: IRideRequest[];
	owner: boolean;
}

/** Action for getting ride reqs error */
export interface IGetRideRequestsErrorAction extends Action<RideRequestsActionTypes.GetRideRequestsError> {
	requests: IRideRequest[];
}

/** Action for answering ride req */
export interface IAnswerRideRequestAction extends Action<RideRequestsActionTypes.AnswerRideRequest> {
	id: string;
	isAccepted: boolean;
	owned: boolean;
}

/** Action for answering ride req success */
export interface IAnswerRideRequestSuccessAction extends Action<RideRequestsActionTypes.AnswerRideRequestSuccess> {
}

/** Action for answering ride req error */
export interface IAnswerRideRequestErrorAction extends Action<RideRequestsActionTypes.AnswerRideRequestError> {
}
//#endregion

export type GenericAction =
	IApiErrorAction;

/** Type of ride req action */
export type RideRequestsAction =
	IGetRideRequestsAction
	| IGetRideRequestsSuccessAction
	| IGetRideRequestsErrorAction
	| IAnswerRideRequestAction
	| IAnswerRideRequestSuccessAction
	| IAnswerRideRequestErrorAction;
