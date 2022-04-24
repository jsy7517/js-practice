import { ERROR_MESSAGES } from '../lib/constants/errorMessages.js';
import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';

const TeamMatchingModel = class {
	#crewListInfo;
	#teamMatchingList;

	constructor() {
		this.updateData();
	}

	updateData() {
		this.#crewListInfo = getLocalStorage('crewListInfo') ?? [];
		this.#teamMatchingList = getLocalStorage('teamMatchingList') ?? [];
	}

	matchTeam(course, minimumTeamMemberCount) {
		const courseCrewList = this.#crewListInfo[course];
		const crewCount = courseCrewList.length;
		const eachTeamMemberCount = Math.floor(crewCount / minimumTeamMemberCount);
		let remainMemberCount = crewCount % minimumTeamMemberCount;

		if (crewCount < minimumTeamMemberCount || remainMemberCount > eachTeamMemberCount) {
			throw new Error(ERROR_MESSAGES.TEAM_MATCHING.TOO_MANY_MEMBER_COUNT);
		}

		const teamMemberCountList = Array.from({ length: eachTeamMemberCount }, () => eachTeamMemberCount);
		if (remainMemberCount !== 0) {
			let i = 0;
			while (remainMemberCount--) {
				teamMemberCountList[i++]++;
			}
		}
		const randomMemberIndices = MissionUtils.Random.shuffle(Array.from({ length: crewCount }, (_, i) => i));
		const randomCrewList = courseCrewList.map((_, i) => courseCrewList[randomMemberIndices[i]]);
		const teamMatchingList = [];
		let start = 0;
		teamMemberCountList.forEach((teamMemberCount) => {
			teamMatchingList.push(randomCrewList.slice(start, start + teamMemberCount));
			start += teamMemberCount;
		});
		this.#teamMatchingList = teamMatchingList;
		setLocalStorage('teamMatchingList', this.#teamMatchingList);
	}

	getCourseCrewList(course) {
		return this.#crewListInfo[course];
	}

	get teamMatchingList() {
		return this.#teamMatchingList;
	}
};

export default TeamMatchingModel;
