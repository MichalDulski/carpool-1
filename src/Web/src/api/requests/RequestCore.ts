import { getState } from "../../store/Index";
import { AppState } from "../../store/Reducers";
import { getRequestEndpoint, getRequestType, getUrl } from "../Helper";
import { IRequestProperties } from "../interfaces/IRequestProperties";
import ResponseCore from "../responses/ResponseCore";
import RequestBody from "./RequestBody";

export const tempCoords = {
	latitude: 0,
	longitude: 0,
};

export default abstract class RequestCore {
	//#region class fields
	requestProperties: IRequestProperties;
	requestBody?: RequestBody;

	private static headers: string[][] = [["Content-Type", "application/json"]];
	//#endregion

	abstract send(): Promise<any>;

	constructor(init: { properties: IRequestProperties }) {
		this.requestProperties = init.properties;
	}

	protected async fetch<R extends ResponseCore>(): Promise<R> {
		const method = getRequestType(this.requestProperties.method);
		const endpoint = getRequestEndpoint(
			this.requestProperties.endpoint,
			this.requestProperties.queries
		);
		const headers = [...RequestCore.headers];
		const state: AppState = getState();
		if (state.auth?.tokenInfo?.token) {
			headers.push(["Authorization", `Bearer ${state.auth.tokenInfo.token}`]);
		}
		const apiUrl: string = getUrl(this.requestProperties.endpoint);

		const url: string = `${apiUrl}${endpoint}`;
		const res = await fetch(url, {
			method,
			headers: new Headers(headers),
			body: this.requestBody ? JSON.stringify(this.requestBody) : null,
		});
		const json = await res.json();
		console.debug("RESPONSE: ", {
			url,
			json,
		});
		return json as R;
	}
}
