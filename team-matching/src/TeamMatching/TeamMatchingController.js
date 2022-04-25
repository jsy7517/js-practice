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
		const teamMatchingResult = this.model.getTeamMatchingInfo(course, mission) ?? null;
		if (teamMatchingResult) {
			this.view.renderTeamMatchingResult({
				course,
				mission,
				teamMatchingResult
			});

			return;
		}

		this.view.renderTeamMatchingSection({
			course,
			mission,
			crewList
		});
		this.view.bindSubmitTeamMemberCountEvent();
	}

	handleMatchTeam({ course, mission, minimumMemberCountPerTeam }) {
		try {
			this.model.matchTeam({ course, mission, minimumMemberCountPerTeam });
		} catch (error) {
			alert(error.message);

			return;
		}

		this.view.renderTeamMatchingResult({
			course,
			mission,
			teamMatchingResult: this.model.getTeamMatchingInfo(course, mission)
		});
	}
};

export default TeamMatchingController;
