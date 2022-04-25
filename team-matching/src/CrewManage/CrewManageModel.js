import { ERROR_MESSAGES } from '../lib/constants/errorMessages.js';
import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';

const CrewManageModel = class {
	#crewListInfo;

	constructor() {
		this.updateData();
	}

	updateData() {
		this.#crewListInfo = getLocalStorage('crewListInfo') ?? {
			frontend: ['준'],
			backend: ['포비']
		};
	}

	addNewCrew(course, newCrew) {
		const crewList = this.#crewListInfo[course];
		console.log(newCrew);
		if (crewList.includes(newCrew)) {
			throw new Error(ERROR_MESSAGES.CREW_MANAGE.DUPLICATED_CREW_NAME);
		}
		this.#crewListInfo[course] = [...crewList, newCrew];
		setLocalStorage('crewListInfo', this.#crewListInfo);
	}

	deleteCrew(course, targetCrew) {
		const newCrewList = this.#crewListInfo[course].filter((crew) => crew !== targetCrew);
		this.#crewListInfo[course] = newCrewList;
		setLocalStorage('crewListInfo', this.#crewListInfo);
	}

	getCourseCrewList(course) {
		return this.#crewListInfo[course];
	}

	get crewListInfo() {
		return this.#crewListInfo;
	}
};

export default CrewManageModel;
