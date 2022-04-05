import View from '../lib/core/View.js';
import { $ } from '../lib/utils/dom.js';
import { validateCrewName } from '../lib/utils/validation.js';

const CrewManageView = class extends View {
	static #template = `
  <section>
  <h3>크루를 관리할 코스를 선택해주세요</h3>
  <div id="course-select-wrapper">
    <input id="frontend-course" type="radio" name="course" value="frontend" />
    <label for="frontend">프론트엔드</label>
    <input id="backend-course" type="radio" name="course" value="backend" />
    <label for="backend">백엔드</label>
  </div>
  </section>
  <section id="crew-manage-section"></section>
  `;

	constructor($target) {
		super($target);
	}

	render() {
		this.$target.insertAdjacentHTML('afterbegin', CrewManageView.#template);
		this.bindEvent();
	}

	bindEvent() {
		this.$target.addEventListener('click', (e) => this.onClickCourseSelectRadio(e));
		this.$target.addEventListener('submit', (e) => this.onSubmitNewCrew(e));
		this.$target.addEventListener('click', (e) => this.onClickDeleteCrewBtn(e));
	}

	onClickCourseSelectRadio({ target: { value } }) {
		const courses = ['frontend', 'backend'];
		if (courses.includes(value)) {
			this.emit('selectCourse', { course: value });
		}
	}

	checkRadioBtn(latestCourse) {
		$(`#${latestCourse}-course`).checked = true;
	}

	renderCrewManageSection(course, crewList) {
		const koreanCourse = course === 'frontend' ? '프론트엔드' : '백엔드';
		const template = `
    <h3>${koreanCourse} 크루 관리</h3>
    <form id="add-crew-form" data-course=${course}>
      <label>크루 이름</label>
      <input id="crew-name-input" type="text" />
      <button id="add-crew-button" type="submit">확인</button>
    </form>
  </section>
  <section>
    <h3>${koreanCourse} 크루 목록</h3>
    <table id="crew-table" border="1">
      ${this.createCrewTableTemplate(course, crewList)}
    </table>
    `;
		$('#crew-manage-section').replaceChildren();
		$('#crew-manage-section').insertAdjacentHTML('afterbegin', template);
	}

	createCrewTableTemplate(course, crewList) {
		return `
    <thead>
    <tr>
      <th></th>
      <th>크루</th>
      <th>관리</th>
    </tr>
    </thead>
    <tbody>
    ${crewList
			.map(
				(crew, idx) => `
      <tr>
        <td>${idx + 1}</td>
        <td>${crew}</td>
        <td>
          <button class="delete-crew-button" data-course=${course} data-crew-name=${crew}>삭제</button>
        </td>
      </tr>
    `
			)
			.join('')}
    `;
	}

	onSubmitNewCrew(e) {
		e.preventDefault();
		if (e.target.id !== 'add-crew-form') return;
		const {
			target: [crewNameInput]
		} = e;
		try {
			validateCrewName(crewNameInput.value);
		} catch (error) {
			alert(error.message);
			$('#add-crew-form').reset();
			return;
		}

		const { course } = e.target.dataset;
		const newCrew = crewNameInput.value;
		this.emit('submitNewCrew', { course, newCrew });
	}

	onClickDeleteCrewBtn(e) {
		if (e.target.className !== 'delete-crew-button') return;
		const { course, crewName } = e.target.dataset;
		if (window.confirm(`${crewName} 크루를 정말 삭제하시겠어요?`)) {
			this.emit('deleteCrew', { course, targetCrew: crewName });
		}
	}
};

export default CrewManageView;
