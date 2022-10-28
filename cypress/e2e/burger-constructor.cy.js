describe("service is available", function () {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
    cy.wait(5000);
  });

  it("should open and then close burger details modal", function () {
    cy.contains("Краторная булка N-200i").click();
    cy.get("[class^=modal-header_close-button-wrapper__]").click();
  });

  it("should drag and drop ingredients, login and place an order", function () {
    cy.get('img[alt*="Краторная булка N-200i"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_burger-constructor__]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get('img[alt*="Сыр с астероидной плесенью"]')
      .trigger("dragstart")
      .trigger("dragleave");
    cy.get("[class^=burger-constructor_burger-constructor__]")
      .trigger("dragenter")
      .trigger("dragover")
      .trigger("drop")
      .trigger("dragend");

    cy.get("button").contains("Оформить заказ").click();

    cy.get("div.input_type_email .input__icon-action").click().type("id.dmitry-vakin@yandex.ru");
    cy.get('input[type*="password"]').click().type("123321123");
    cy.get("button").contains("Войти").click();
    cy.wait(5000);

    cy.get("button").contains("Оформить заказ").click();

    cy.wait(20000);
    cy.get('[class^=modal-header_close-button-wrapper__]').click();
  });
});
