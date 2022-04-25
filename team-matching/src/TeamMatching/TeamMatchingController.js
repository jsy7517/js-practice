import { $ } from '../lib/utils/dom.js';
import { getLocalStorage, setLocalStorage } from '../lib/utils/store.js';
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

	loadLatestMission() {
		const latestMission = getLocalStorage('latestMission') ?? null;
		if (!latestMission) return;

		const [course, mission] = latestMission.split('-');
		this.view.renderLatestMission(course, mission);
		this.handleSubmitMission({ course, mission });
	}

	bindEvent() {
		this.view.on('submitMission', (e) => this.handleSubmitMission(e.detail));
		this.view.on('matchTeam', (e) => this.handleMatchTeam(e.detail));
		this.view.on('rematchTeam', (e) => this.handleRematchTeam(e.detail));
	}

	handleSubmitMission({ course, mission }) {
		const crewList = this.model.getCourseCrewList(course);
		const teamMatchingResult = this.model.getTeamMatchingInfo(course, mission) ?? null;
		setLocalStorage('latestMission', `${course}-${mission}`);
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

	handleRematchTeam() {}
};

export default TeamMatchingController;
