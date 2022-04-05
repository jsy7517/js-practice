import { $ } from '../lib/utils/dom.js';
import TeamMatchingModel from './TeamMatchingModel.js';
import TeamMatchingView from './TeamMatchingView.js';

const TeamMatchingController = class {
	model;
	view;

	constructor() {
		this.model = new TeamMatchingModel();
		this.view = new TeamMatchingView($('#current-tab'));
		this.bindEvent();
	}

	renderTeamMatchingTab() {
		this.model.updateData();
		this.view.render();
	}

	bindEvent() {
		this.view.on('submitMission', (e) => this.handleSubmitMission(e.detail));
		this.view.on('matchTeam', (e) => this.handleMatchTeam(e.detail));
	}

	handleSubmitMission({ course, mission }) {
		const crewList = this.model.getCourseCrewList(course);
		this.view.renderTeamMatchingSection({
			course,
			mission,
			crewList
		});
		this.view.bindSubmitTeamMemberCountEvent();
	}

	handleMatchTeam({ course, memberCount }) {
		try {
			this.model.matchTeam(course, memberCount);
		} catch (error) {
			alert(error.message);
			return;
		}

		this.view.renderTeamMatchingList(this.model.teamMatchingList);
	}
};

export default TeamMatchingController;
