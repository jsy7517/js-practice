import { ERROR_MESSAGES } from '../lib/constants/errorMessages.js';
import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';

const TeamMatchingModel = class {
	#crewListInfo;
	#teamMatchingInfo;

	constructor() {
		this.updateData();
	}

	updateData() {
		this.#crewListInfo = getLocalStorage('crewListInfo') ?? [];
		this.#teamMatchingInfo = getLocalStorage('teamMatchingInfo') ?? {};
	}

	matchTeam({ course, mission, minimumMemberCountPerTeam }) {
		const courseCrewList = this.#crewListInfo[course];
		const crewCount = courseCrewList.length;

		if (crewCount < minimumMemberCountPerTeam) {
			throw new Error(ERROR_MESSAGES.TEAM_MATCHING.TOO_MANY_MEMBER_COUNT);
		}

		const teamMatchingResult = this.matchRandomTeam({ courseCrewList, crewCount, minimumMemberCountPerTeam });
		this.#teamMatchingInfo[`${course}-${mission}`] = teamMatchingResult;
		setLocalStorage('teamMatchingInfo', this.#teamMatchingInfo);
	}

	matchRandomTeam({ courseCrewList, crewCount, minimumMemberCountPerTeam }) {
		const teamCount = Math.floor(crewCount / minimumMemberCountPerTeam);
		if (teamCount === 1) return courseCrewList;

		const teamMemberCountList = Array.from({ length: teamCount }, () => minimumMemberCountPerTeam);
		let remainMemberCount = crewCount % minimumMemberCountPerTeam;
		if (remainMemberCount > 0) {
			let i = 0;
			while (remainMemberCount--) {
				teamMemberCountList[i++]++;
			}
		}

		const randomMemberIndices = MissionUtils.Random.shuffle(Array.from({ length: crewCount }, (_, i) => i));
		const randomCrewList = courseCrewList.map((_, i) => courseCrewList[randomMemberIndices[i]]);
		const teamMatchingResult = [];
		let start = 0;
		teamMemberCountList.forEach((teamMemberCount) => {
			teamMatchingResult.push(randomCrewList.slice(start, start + teamMemberCount));
			start += teamMemberCount;
		});

		return teamMatchingResult;
	}

	getCourseCrewList(course) {
		return this.#crewListInfo[course];
	}

	getTeamMatchingInfo(course, mission) {
		return this.#teamMatchingInfo[`${course}-${mission}`];
	}
};

export default TeamMatchingModel;
