/// <reference types="cypress" />
import "cypress-xpath"
import MainPageExample from "../pageObject/MainPageExample";

  let currentUrls;
  let storedTshirtName;
  let comparedThirtName;
  let storedTshirtPrice;
  let comparedTshirtPrice;
  let a;
  
  const typeTshirt = "T-shirt";
  const secondChoose = 2;

describe("HM Website Automation Tests", () => {
    beforeEach(() => {
      cy.viewport(1920, 1080);
      Cypress.on('uncaught:exception', (err, runnable) => {
        return false
      })
    });
  
    it("Test Case #1: User can visit H&M homepage", () => {
      MainPageExample.visit();
      MainPageExample.acceptCookie();
      cy.xpath(`//*[@class='iFlL']//..//*[@role='img']`).eq(1).should('be.visible');
      cy.xpath(`//h3[text()='The Holiday Preview']`).should('be.visible');
        const mainCategories = ["Women", "Men", "Divided", "Kids", "H&M HOME"];
        mainCategories.forEach((category) => {
        cy.xpath(`//ul[@class='MLEL']//a[text()='${category}']`).first().should("be.visible");
        });
    
        // cy.contains("Fall's first layers are here!").should("be.visible"); //not available on the page
        // cy.contains("Captivating contrasts").should("be.visible");
        cy.contains("Shop now").should("be.visible");
    });
  
    it("Test Case #2: User can search for a product", () => {
      MainPageExample.visit();
      MainPageExample.acceptCookie();
      MainPageExample.searchField(typeTshirt);
      cy.xpath('//a[@class="eErm"]')
        .eq(0)
        .should("be.visible")
        .contains("t-shirt")
        .click();
        for (let index = 1; index < 3; index++) {
          cy.xpath(`//div[@class='item-details']//a[contains(text(),'${typeTshirt}')]`).eq(index).should("be.visible");
        }
        cy.url().should('include', 'hm.com').then((url) => {
          currentUrls = url;
        })
    });
  
    it("Test Case #3: User can view a specific product", () => {
      cy.visit(currentUrls);
      MainPageExample.acceptCookie();
      cy.xpath("//div[@class='item-details']//a[contains(text(),'T-shirt')]").eq(secondChoose).invoke('text').then((text) =>{
        storedTshirtName = text;
      })
      cy.xpath("//*[@class='item-price']").eq(secondChoose).invoke('text').then((text) =>{
        storedTshirtPrice = text;
      })
      cy.xpath("//div[@class='item-details']//a[contains(text(),'T-shirt')]").eq(secondChoose).click();
      
      // Verify that product page is opened
      cy.xpath("//div[contains(@class,'ProductName-module')]").invoke('text').then((text) =>{
        comparedThirtName = text;
      });
      cy.xpath("//*[@id='product-price']").invoke('text').then((text) =>{
        comparedTshirtPrice = text;
      });
      expect(storedTshirtPrice).to.equal(comparedTshirtPrice);
      expect(storedTshirtName).to.equal(comparedThirtName);
      cy.xpath("//*[contains(text(),'Select size')]").eq(1).should("be.visible");
      cy.xpath("//button//..//*[contains(text(),'Add to bag')]").should("be.visible");
      cy.xpath(`//div[@class="product-detail-main-image-container"]`).should("be.visible");
        cy.url().should('include', 'hm.com').then((url) => {
          currentUrls = url;
        })
    });
  
    it("Test Case #4: User can select a product and add to cart", () => {
      cy.visit(currentUrls);
      MainPageExample.acceptCookie();
      const color = 'White';
      const size = 'XS';
      let price;
      let productName;
      cy.xpath("//*[@id='product-price']").invoke('text').then((text) =>{
        price = text;
      });
      cy.xpath("//div[contains(@class,'ProductName')]").invoke('text').then((text) =>{
        productName = text;
      });
      MainPageExample.selectColor(color); // Select color
      MainPageExample.selectSize(size);
      MainPageExample.clickBuyButton(); // add to bag
  
      //without run
      // cy.xpath(`//*[text()='Shopping bag (1)']`).eq(0).click();
      // cy.xpath(`//ul[contains(@class,'CartItemsList')]//..//*[contains(@aria-label,'Quantity')]`).should('have.length', 1);
      // cy.xpath(`//span[contains(@class,'BodyText')]//..//..//*[text()='${productName}']`).eq(0).should("be.visible");
      // cy.xpath(`//span[contains(@class,'BodyText')]//..//..//*[text()='${price}']`).eq(0).should("be.visible");
      // cy.xpath(`//span[contains(@class,'BodyText')]//..//..//*[text()='${color}']`).should("be.visible");
      // cy.xpath(`//span[contains(@class,'BodyText')]//..//..//*[text()='${size}']`).should("be.visible");
    });
  
    // it("Test Case #5: Checkout must be correctly calculated", () => {
      // let shipping;
      // let shippingPrice = '5.99';
      // cy.contains('Order value').next().should("contain", price);
      // cy.xpath('tr').invoke('text').then((text) =>{
      //   shipping = text;
      //   if(shipping.includes('5.99')){
      //     shipping= parseFloat(shipping) + parseFloat(shippingPrice);
      // };
      //   cy.xpath('tr').eq(2).next().should("contain", shipping);      
      //   });
      // });
    // after(() => {
    //   cy.log('All tests have finished. Closing the browser.');
    // });
  });