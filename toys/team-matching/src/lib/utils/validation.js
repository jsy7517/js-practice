import { ERROR_MESSAGES } from '../constants/errorMessages.js';
import { CREW_MANAGE, TEAM_MATCHING } from '../constants/validation.js';

export const validateCrewName = (crewName) => {
	if (!crewName) {
		throw new Error(ERROR_MESSAGES.CREW_MANAGE.EMPTY_CREW_NAME);
	}

	if (crewName.length > CREW_MANAGE.MAX_CREW_NAME_LENGTH) {
		throw new Error(ERROR_MESSAGES.CREW_MANAGE.INVALID_CREW_NAME_LENGTH);
	}
};

export const validateMemberCount = (memberCount) => {
	if (memberCount < TEAM_MATCHING.MIN_MEMBER_COUNT) {
		throw new Error(ERROR_MESSAGES.TEAM_MATCHING.INVALID_MEMBER_COUNT);
	}
};
