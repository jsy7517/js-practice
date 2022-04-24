import { ERROR_MESSAGES } from '../../src/js/lib/constants/errorMessages';
import { LOTTO_GAME } from '../../src/js/lib/constants/lottoGame';

before(() => {
  cy.visit('http://127.0.0.1:5500/js-practice/toys/lotto/index.html');
});

describe('step 1', () => {
  it('처음 접속 시 구입 금액 입력창만 화면에 보여야 한다.', () => {
    cy.get('#input-purchase-price-section').should('be.visible');
    cy.get('#purchased-lotto-ticket-section').should('not.be.visible');
    cy.get('#input-winning-numbers-section').should('not.be.visible');
  });

  describe('로또 구입 금액 입력 테스트', () => {
    describe('잘못된 금액 입력에 대한 오류 테스트', () => {
      it(`${LOTTO_GAME.UNIT_PRICE}원으로 나누어 떨어지지 않는 금액 입력 시 사용자에게 오류임을 알린다.`, () => {
        cy.submitPurchasePrice(LOTTO_GAME.UNIT_PRICE + 1);
        cy.on('window.alert', (text) =>
          expect(text).to.be(
            ERROR_MESSAGES.LOTTO_PURCHASE.INVALID_PURCHASE_PRICE,
          ),
        );
      });
    });
    describe('정상적인 금액 입력 시 동작 테스트', () => {
      it(`${LOTTO_GAME.UNIT_PRICE}원으로 나눈 몫 만큼의 로또 아이콘을 표시해야 한다.`, () => {
        cy.submitPurchasePrice(LOTTO_GAME.UNIT_PRICE * 5);
        cy.get('#purchased-lotto-ticket-section').should('be.visible');
        cy.get('#purchased-lotto-ticket-list li').should('have.length', 5);
      });
      it('구입 금액 제출 버튼이 비활성화 되어야 한다.', () => {
        cy.get('#submit-price-btn').should('be.disabled');
      });
      it('당첨 번호 입력창이 보여야 한다.', () => {
        cy.get('#input-winning-numbers-section').should('be.visible');
      });
      it('번호 보기 토글 버튼 클릭 시 각 로또의 번호가 화면에 보여야 한다.', () => {
        cy.get('.lotto-numbers-toggle-button').check({ force: true });
        cy.get('.lotto-ticket-detail').should('be.visible');
      });
    });
  });
  describe('당첨 번호 입력 테스트', () => {
    describe('당첨 번호 입력에 대한 오류 테스트', () => {
      it('당첨 번호 중 중복된 번호가 입력되었을 시 사용자에게 오류임을 알린다.', () => {
        cy.inputWinningNumbers(1, 1, 2, 3, 4, 5);
        cy.inputBonusNumber(7);
        cy.get('#input-winning-numbers-form').submit();
        cy.on('window.alert', (text) => {
          expect(text).to.be(
            ERROR_MESSAGES.INPUT_WINNING_NUMBERS.DUPLICATED_WINNING_NUMBERS,
          );
        });
      });
    });
    describe('당첨 번호 정상 입력 시 동작 테스트', () => {
      it('정상적인 당첨 번호 입력 시 결과 모달 창이 출력되어야 한다.', () => {
        cy.inputWinningNumbers(1, 2, 3, 4, 5, 6);
        cy.inputBonusNumber(7);
        cy.get('#input-winning-numbers-form').submit();
        cy.get('#lotto-result-modal').should('be.visible');
      });
    });
  });

  describe('모달 창 닫기 동작 테스트', () => {
    it('모달 창 닫기 버튼(X) 클릭 시 모달 창이 닫혀야 한다.', () => {
      cy.get('#modal-close-btn').click();
      cy.get('#lotto-result-modal').should('not.be.visible');
    });
    it('모달 창 바깥 영역을 클릭 시 모달 창이 닫혀야 한다.', () => {
      cy.get('#input-winning-numbers-form').submit();
      cy.get('#lotto-result-modal').click(0, 0);
    });
  });

  describe('재시작 기능 동작 테스트', () => {
    it('재시작 버튼 클릭 시 구입 금액이 초기화되고, 구입 급액 입력 창만 화면에 보여야 한다.', () => {
      cy.get('#input-winning-numbers-form').submit();
      cy.get('#restart-btn').click();
      cy.get('#input-purchase-price').should('be.visible');
      cy.get('#input-purchase-price').should('be.empty');
    });
  });
});
