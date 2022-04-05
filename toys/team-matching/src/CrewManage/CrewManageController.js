import { $ } from '../lib/utils/dom.js';
import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';
import CrewManageModel from './CrewManageModel.js';
import CrewManageView from './CrewManageView.js';

const CrewManageController = class {
	model;
	view;

	constructor() {
		this.model = new CrewManageModel();
		this.view = new CrewManageView($('#current-tab'));
		this.bindEvent();
	}

	renderCrewManageTab() {
		this.model.updateData();
		this.view.render(this.model.crewListInfo);
	}

	bindEvent() {
		this.view.on('selectCourse', (e) => this.handleSelectCourse(e.detail));
		this.view.on('submitNewCrew', (e) => this.handleSubmitNewCrew(e.detail));
		this.view.on('deleteCrew', (e) => this.handleDeleteCrew(e.detail));
	}

	loadLatestCourse() {
		const latestCourse = getLocalStorage('latestCourse') ?? '';
		if (!latestCourse) return;
		this.view.checkRadioBtn(latestCourse);
		this.view.renderCrewManageSection(latestCourse, this.model.getCourseCrewList(latestCourse));
	}

	handleSelectCourse({ course }) {
		const courseCrewList = this.model.getCourseCrewList(course);
		this.view.renderCrewManageSection(course, courseCrewList);
		setLocalStorage('latestCourse', course);
	}

	handleSubmitNewCrew({ course, newCrew }) {
		try {
			this.model.addNewCrew(course, newCrew);
		} catch (error) {
			alert(error.message);
			return;
		}

		this.view.renderCrewManageSection(course, this.model.getCourseCrewList(course));
	}

	handleDeleteCrew({ course, targetCrew }) {
		this.model.deleteCrew(course, targetCrew);
		this.view.renderCrewManageSection(course, this.model.getCourseCrewList(course));
	}
};

export default CrewManageController;
