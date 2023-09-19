class MainPageExample {
  visit() {
    cy.visit("https://www2.hm.com/en_us/index.html");
  }

  storedVisitUrl(currentUrls){
    cy.url().should('include', 'hm.com').then((url) => {
      currentUrls = url;
    });
  }

  acceptCookie(){
    cy.get("[id='onetrust-accept-btn-handler']").click();
  }

  clickButton() {
    cy.get('button').click();
  }

  fillForm(username, password) {
    cy.get('#username').type(username);
    cy.get('#password').type(password);
  }

  searchField(text = String){
    cy.xpath(`//input[@placeholder='Search products']`).eq(2).type(text);
  }

  selectColor(text = String){
    cy.xpath(`//*[@data-color='${text}']`).click();
  }

  selectSize(text = String){
    cy.xpath("//button[contains(@class,'trigger-button ')]//*[contains(text(),'Select size')]").click();
    cy.xpath(`//button[@class='option ']//..//*[text()='${text}']`).click({force: true});
  }

  clickBuyButton(){
    cy.xpath("//button[contains(@class,'button-buy')]").click();
  }
}

export default new MainPageExample();