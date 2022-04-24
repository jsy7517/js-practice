import { ERROR_MESSAGES } from '../../src/js/lib/constants/errorMessages';
import { MAX_RESULT_VIDEO_COUNT } from '../../src/js/lib/constants/searchVideo';

/* eslint-disable no-undef */
before(() => {
  cy.visit('http://localhost:8080/');
});

describe('Youtube Classroom App Test', () => {
  describe('초기 접속 시', () => {
    it('시청 대기중인 영상 목록을 출력한다.', () => {
      cy.get('.saved-video-list-section').should('be.visible');
    });

    it('저장된 영상이 없는 경우, 이를 알려주는 텍스트를 화면에 출력한다.', () => {
      cy.get('.saved-video__empty').should('be.visible');
    });
  });

  describe('비디오 검색 모달창 기능 테스트', () => {
    beforeEach('검색 버튼 클릭 시 비디오 검색 모달창을 띄운다', () => {
      cy.get('#search-modal-button').click();
      cy.get('.search-modal').should('be.visible');
    });

    it('닫기 버튼 클릭 시 모달창을 닫는다.', () => {
      cy.get('#modal-close-btn').click();
      cy.get('.search-modal').should('not.be.visible');
    });

    it('모달창 바깥 영역 클릭 시 모달창을 닫는다.', () => {
      cy.get('.modal-container').click(10, 10);
      cy.get('.search-modal').should('not.be.visible');
    });
  });

  describe('비디오 검색 기능 테스트', () => {
    before(() => {
      cy.get('#search-modal-button').click();
    });

    it('검색어를 입력하지 않고 검색을 시도하면 이에 대한 알림을 사용자에게 보여준다.', () => {
      cy.get('#video-search-form').submit();
      cy.on('window.alert', (message) => {
        expect(message).to.be(ERROR_MESSAGES.NO_KEYWORD);
      });
    });

    it('검색 시 스켈레톤 UI를 먼저 사용자에게 보여준다.', () => {
      cy.get('#search-input-keyword').type('aespa');
      cy.get('#video-search-form').submit();
      cy.get('.skeleton-video-item').should(
        'have.length',
        MAX_RESULT_VIDEO_COUNT,
      );
    });

    it(`검색 결과 중 ${MAX_RESULT_VIDEO_COUNT}개의 비디오를 먼저 사용자에게 보여준다.`, () => {
      cy.get('.video-item').should('have.length', MAX_RESULT_VIDEO_COUNT);
    });

    it(`스크롤을 내리면 다음 ${MAX_RESULT_VIDEO_COUNT}개의 비디오를 사용자에게 보여준다.`, () => {
      cy.get('.video-list').scrollTo('bottom');
      cy.get('.video-item').should('have.length', MAX_RESULT_VIDEO_COUNT * 2);
    });
  });

  describe('비디오 저장 기능 테스트', () => {
    it('비디오 저장 버튼 클릭 시 비디오를 저장 후, 알림을 사용자에게 보여준다.', () => {
      // cy.saveVideos(8);
    });

    // it('모달 창을 닫으면 저장된 비디오 목록이 출력되어야 한다.', () => {});
  });
});
