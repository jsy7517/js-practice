import View from '../lib/core/View.js';
import { $, $$ } from '../lib/utils/dom.js';
import { validateMemberCount } from '../lib/utils/validation.js';

const TeamMatchingView = class extends View {
	static #template = `
  <section>
  <h3>팀 매칭을 관리할 코스, 미션을 선택하세요.</h3>
  <form id="select-form">
    <select id="course-select">
      <option value="frontend">프론트엔드</option>
      <option value="backend">백엔드</option>
    </select>
    <select id="mission-select">
      <option value="baseball">숫자야구게임</option>
      <option value="racingcar">자동차경주</option>
      <option value="lotto">로또</option>
      <option value="shopping-cart">장바구니</option>
      <option value="payments">결제</option>
      <option value="subway">지하철노선도</option>
      <option value="performance">성능개선</option>
      <option value="deploy">배포</option>
    </select>
    <button id="show-team-matcher-button" type="submit">확인</button>
  </form>
  </section>
  <section id="team-matching-section"></section>
  `;

	constructor($target) {
		super($target);
	}

	render() {
		this.$target.insertAdjacentHTML('afterbegin', TeamMatchingView.#template);
		$('#select-form').addEventListener('submit', (e) => this.onSubmitMission(e));
	}

	onSubmitMission(e) {
		e.preventDefault();
		const {
			target: [courseSelect, missionSelect]
		} = e;
		const course = courseSelect.value;
		const mission = missionSelect.value;
		this.emit('submitMission', { course, mission });
	}

	onSubmitTeamMemberCount(e) {
		e.preventDefault();
		const {
			target: [teamMemberCountInput]
		} = e;

		const { course, mission } = e.target.dataset;
		const minimumMemberCountPerTeam = teamMemberCountInput.valueAsNumber;
		try {
			validateMemberCount(minimumMemberCountPerTeam);
		} catch (error) {
			alert(error.message);
			return;
		}
		this.emit('matchTeam', { course, mission, minimumMemberCountPerTeam });
	}

	onClickRematchBtn(course, mission) {
		this.emit('rematchTeam', { course, mission });
	}

	renderLatestMission(course, mission) {
		$$('#course-select option').forEach((opt) => {
			opt.selected = opt.value === course ? true : false;
		});

		$$('#mission-select option').forEach((opt) => {
			opt.selected = opt.value === mission ? true : false;
		});
	}

	renderTeamMatchingSection({ course, mission, crewList }) {
		const template = `
      <h3>${this.createKoreanMissionString(course, mission)} 미션의 팀 매칭</h3>
      <div>
        <div>
          <p>아직 매칭된 팀이 없습니다. 팀을 매칭하겠습니까?</p>
          <form id="team-member-form" data-course=${course} data-mission=${mission}>
            <label>1팀당 인원 수</label>
            <input id="team-member-count-input" type="number" />
            <button id="match-team-button">팀 매칭</button>
          </form>
        </div>
        <h4>크루 목록</h4>
        ${this.createCrewListTemplate(crewList)}
      </div>
    `;

		$('#team-matching-section')?.replaceChildren();
		$('#team-matching-section')?.insertAdjacentHTML('afterbegin', template);
		$('#team-member-form').addEventListener('submit', (e) => this.onSubmitTeamMemberCount(e));
	}

	renderTeamMatchingResult({ course, mission, teamMatchingResult }) {
		const template = `
		<h3>${this.createKoreanMissionString(course, mission)} 팀 조회</h3>
		<p>팀이 매칭되었습니다.</p>
		<ul id="team-match-result">
			${teamMatchingResult
				.map(
					(teamMemberList) => `
				<li>${teamMemberList.join(', ')}</li>
			`
				)
				.join('')}
		</ul>
		<p>
			팀을 재매칭 하시겠습니까?
			<button id="rematch-team-button">재매칭</button>
		</p>
		`;

		$('#team-matching-section')?.replaceChildren();
		$('#team-matching-section')?.insertAdjacentHTML('afterbegin', template);
		$('#rematch-team-button').addEventListener('click', () => this.onClickRematchBtn(course, mission));
	}

	createKoreanMissionString(course, mission) {
		if (mission === 'shopping-cart') mission = 'shoppingCart';
		const courseMap = {
			frontend: '프론트엔드',
			backend: '백엔드'
		};
		const missionMap = {
			baseball: '숫자야구게임',
			racingcar: '자동차경주',
			lotto: '로또',
			shoppingCart: '장바구니',
			payments: '결제',
			subway: '지하철노선도',
			performance: '성능개선',
			deploy: '배포'
		};
		return `${courseMap[course]} ${missionMap[mission]}`;
	}

	createCrewListTemplate(crewList) {
		return `
      <ul>
      ${crewList
				.map(
					(crew) => `
        <li>${crew}</li>
      `
				)
				.join('')}
      </ul>
    `;
	}
};

export default TeamMatchingView;
