// import { beforeEach, describe, it } from "node:test";

describe("My App test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174");
  });
  // it("navigates to home after submiting", () => {
  //   // cy.get("#name").type("John Doe");
  //   cy.get("#email").type("aizeek@gmail.com");
  //   cy.get("#password").type("123456");
  //   cy.get(".form-box").submit();
  //   cy.url({ timeout: 8000 }).should("include", "/home");
  // });
  it("state changes after clicked ", async () => {
    // Verify that the initial state is "login"
    cy.get(`[data-testid="login-register-button"]`).should(
      "have.text",
      "LOGIN"
    );
    cy.get('[data-testid="login-register-typography"]').should(
      "have.text",
      "Don't have an account? Sign Up Here."
    );
    cy.get(".toggle-register").click();

    // Check that the state is now "register"
    cy.get('button[type="submit"]').should("contain", "REGISTER");
    // cy.window().should("have.property", "pageType");
    // cy.window().its("pageType").should("equal", "login");
    // cy.window().its("isLogin").should("be.true");
  });
  describe("Form page", () => {
    it("uploads profile picture successfully", () => {
      cy.visit("/form");

      cy.get("[data-testid=pictureDropzone]").attachFile("profile.jpg");

      cy.get("[data-testid=picturePreview]");
    });
  });
});
