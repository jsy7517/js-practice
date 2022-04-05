import { $ } from './lib/utils/dom.js';
import CrewManageController from './CrewManage/CrewManageController.js';
import TeamMatchingController from './TeamMatching/TeamMatchingController.js';
import { getLocalStorage, setLocalStorage } from './lib/utils/store.js';

const App = class {
	$target;
	crewManageController;
	teamMatchingController;
	static #template = `
  <header>
    <h1>우테코 크루와 팀 매칭 관리 보드</h1>
    <nav id="select-tab">
      <ul>
        <li>
          <button id="crew-tab">크루 관리</button>
        </li>
        <li>
          <button id="team-tab">팀 매칭 관리</button>
        </li>
      </ul>
    </nav>
  </header>
  <main id="current-tab"></main>
  `;

	constructor($target) {
		this.$target = $target;
		this.$target.insertAdjacentHTML('afterbegin', App.#template);
		this.crewManageController = new CrewManageController();
		this.teamMatchingController = new TeamMatchingController();
		this.bindEvent();
		this.loadLatestTab();
	}

	bindEvent() {
		$('#select-tab').addEventListener('click', (e) => this.handleSelectTab(e));
	}

	handleSelectTab({ target: { id } }) {
		if (id === 'crew-tab') {
			this.showCrewTab();
		}

		if (id === 'team-tab') {
			this.showTeamTab();
		}
	}

	loadLatestTab() {
		const latestTab = getLocalStorage('latestTab') ?? '';
		if (!latestTab || latestTab === 'crewTab') {
			this.showCrewTab();
		}

		if (latestTab === 'teamTab') {
			this.showTeamTab();
		}
	}

	showCrewTab() {
		this.hideCurrentTab();
		this.crewManageController.renderCrewManageTab();
		this.crewManageController.loadLatestCourse();
		setLocalStorage('latestTab', 'crewTab');
	}

	showTeamTab() {
		this.hideCurrentTab();
		this.teamMatchingController.renderTeamMatchingTab();
		setLocalStorage('latestTab', 'teamTab');
	}

	hideCurrentTab() {
		$('#current-tab').replaceChildren();
	}
};

export default App;
