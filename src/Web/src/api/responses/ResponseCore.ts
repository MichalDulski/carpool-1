export default abstract class ResponseCore {
	version: string;
	status: number;
	message: string;
	isError: boolean;
	responseException?: Array<{
		code: string;
		description: string;
	}>;
	title: string;
}
