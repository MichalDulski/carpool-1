import { Action } from "redux";

export enum LayoutActionTypes {
	Redirect = "LAYOUT_REDIRECT",
	Redirected = "LAYOUT_REDIRECTED",
	SetLoaderVisible = "LAYOUT_SET_LOADER_VISIBLE",
	ClearStore = "LAYOUT_CLEAR_STORE",
}

//#region LAYOUT
export interface ILayoutClearStoreAction extends Action<LayoutActionTypes.ClearStore> {
}

export interface IRedirectAction extends Action<LayoutActionTypes.Redirect> {
	to: string;
}

export interface IRedirectedAction extends Action<LayoutActionTypes.Redirected> { }

export interface ISetLoaderVisibleAction extends Action<LayoutActionTypes.SetLoaderVisible> {
	visible: boolean;
}
//#endregion

/** Type of login action */
export type LayoutAction =
	IRedirectAction |
	IRedirectedAction |
	ISetLoaderVisibleAction |
	ILayoutClearStoreAction;
