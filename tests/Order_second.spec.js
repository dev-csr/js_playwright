const { test, expect } = require("@playwright/test");

test("Order a product", async ({ page }) => {
  const email = "anshika@gmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
  await page.getByRole("button", { name: "login" }).click();
  await page.locator("[value='Login']").click();
  await page.waitForLoadState("networkidle");
  await page.locator(".card-body b").first().waitFor();
  await products
    .filter({ hasText: productName })
    .getByRole("button", { name: "Add To Cart" })
    .click();

  await page
    .getByRole("listitem")
    .getByRole("button", { name: "  Cart" })
    .click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText(productName)).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("Select Country").pressSequentially("Ind");
  await page.getByRole("button", { name: "India" }).nth(1).click();
  await page.getByText("PLACE ORDER").click();
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();

  await page.pause(2000);
});
