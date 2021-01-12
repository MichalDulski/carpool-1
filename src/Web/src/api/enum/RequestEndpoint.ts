export enum RequestEndpoint {
	// GROUPS
	POST_ADD_GROUP,
	PUT_UPDATE_GROUP,
	GET_GROUP_BY_ID,
	GET_USER_GROUPS,
	DELETE_GROUP_BY_ID,
	GET_GROUP_USERS,
	LEAVE_GROUP,
	// INVITES
	GET_INVITES_BY_USER_ID,
	GET_ALL_INVITES,
	POST_INVITE,
	GET_INVITE_BY_ID,
	PUT_CHANGE_INVITE,
	DELETE_INVITE_BY_ID,
	// RIDES
	GET_RIDES_BY_USER_ID,
	GET_RIDES_BY_GROUP_ID,
	POST_RIDE,
	POST_RIDE_RECURRING,
	LEAVE_RIDE,
	DELETE_RIDE,
	DELETE_RIDE_RECURRING,
	DELETE_RIDE_PASSENGER,
	// RIDE REQS
	POST_ADD_RIDE_REQ,
	PUT_UPDATE_RIDE_REQ,
	GET_RIDE_REQS,
	// USERS
	REGISTER_USER,
	LOGIN_USER,
	REFRESH_TOKEN,
	AUTOCOMPLETE_USER,
	GET_USER_BY_APPUSERID,
	UPDATE_USER_DATA,
	DELETE_USER,
}
