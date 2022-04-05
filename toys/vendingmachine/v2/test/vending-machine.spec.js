import { ERROR_BOUNDARIES, ERROR_MESSAGES } from '../src/lib/constants/validation.js';

describe('vending-machine-mission test', () => {
	beforeEach(() => {
		cy.restoreLocalStorage();
	});

	afterEach(() => {
		cy.saveLocalStorage();
	});
	describe('step 1', () => {
		describe('최초 접속 시', () => {
			beforeEach(() => {
				cy.visit(
					'http://127.0.0.1:5501/Woowa/vendingmachine/second/javascript-vendingmachine-precourse-main/index.html'
				);
			});

			it('기존에 저장된 데이터가 없다면 상품 관리 탭이 노출된다.', () => {
				cy.get('#current-menu').children('#product-add-section').should('be.visible');
			});
		});

		describe('상품 정보 입력 및 추가 기능 테스트', () => {
			describe('정상적인 상품 정보 입력 시', () => {
				it('새로운 상품을 추가한다.', () => {
					cy.addNewProduct('펩시', 1000, 15);
					cy.addNewProduct('환타', 2000, 20);
					cy.productList().should('have.length', 3);
				});
			});

			describe('잘못된 상품 정보 입력 시 오류 메시지를 출력한다.', () => {
				it(`상품의 가격이 ${ERROR_BOUNDARIES.PRODUCT_ADD.MINIMUM_PRICE}원 미만인 경우 오류 메시지를 출력한다.`, () => {
					cy.addNewProduct('코카콜라', 50, 20);
					cy.on('window:alert', (text) => {
						expect(text).to.contains(ERROR_MESSAGES.PRODUCT_ADD.PRICE_UNDER_ONE_HUNDRED);
					});
				});

				it('상품의 가격이 10으로 나누어 떨어지지 않는 경우 오류 메시지를 출력한다.', () => {
					cy.addNewProduct('삼다수', 555, 30);
					cy.on('window:alert', (text) => {
						expect(text).to.contains(ERROR_MESSAGES.PRODUCT_ADD.PRICE_CANNOT_DIVIDED_BY_TEN);
					});
				});
			});
		});

		describe('새로고침 시 데이터가 유지되어야 한다.', () => {
			beforeEach(() => {
				cy.visit(
					'http://127.0.0.1:5501/Woowa/vendingmachine/second/javascript-vendingmachine-precourse-main/index.html'
				);
			});
			it('상품 목록이 정상적으로 출력되어야 한다.', () => {
				cy.productList().should('have.length', 3);
			});
		});

		describe('탭 이동 시에도 데이터가 유지되어야 한다.', () => {
			it('탭 이동 시 상품 목록이 정상적으로 출력되어야 한다.', () => {
				cy.clickMenu('#vending-machine-manage-menu');
				cy.clickMenu('#product-add-menu');
				cy.productList().should('have.length', 3);
			});
		});
	});

	describe('step 2', () => {
		describe('잔돈 충전 기능 테스트', () => {
			it('잔돈 충전 탭으로 이동', () => {
				cy.clickMenu('#vending-machine-manage-menu');
			});
			describe('잔돈을 충전하지 않은 경우', () => {
				it('보유 금액이 0원인지 확인한다.', () => {
					cy.machineChargeAmount().should('have.text', '보유 금액 : 0원');
				});
			});
			describe('잔돈 충전 기능 테스트', () => {
				// describe('정상적인 충전 금액 입력 시', () => {
				// 	it('잔돈을 충전하고, 동전의 총합은 충전한 금액과 일치해야 한다.', () => {
				// 		cy.chargeMachine(1000);
				// 		cy.machineChargeAmount().should('have.text', `보유 금액 : 1000원`);
				// 	});
				// });
				describe('잘못된 충전 금액 입력 시 오류 메시지를 출력한다.', () => {
					it(`충전할 금액이 ${ERROR_BOUNDARIES.CHARGE.MINIMUM_CHARGE_AMOUNT} 보다 작은 경우 오류 메시지를 출력한다.`, () => {
						cy.chargeMachine(-100);
						cy.on('window:alert', (text) => {
							expect(text).to.contains(ERROR_MESSAGES.CHARGE.WRONG_CHARGE_AMOUNT);
						});
					});

					it(`충전할 금액이 10으로 나누어 떨어지지 않는 경우 오류 메시지를 출력한다.`, () => {
						cy.chargeMachine(555);
						cy.on('window:alert', (text) => {
							expect(text).to.contains(ERROR_MESSAGES.CHARGE.CHARGE_AMOUNT_CANNOT_DIVIDED_BY_TEN);
						});
					});
				});
			});
		});
	});

	describe('step 3', () => {
		describe('상품 구매 기능 테스트', () => {
			it('상품 구매 탭으로 이동', () => {
				cy.clickMenu('#product-purchase-menu');
			});

			it('상품 목록이 정상적으로 출력되어야 한다', () => {});
		});
	});
});
