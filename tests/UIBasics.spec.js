const { test, expect } = require("@playwright/test");

test("First Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await page.locator("#username").fill("Srikanth");
  await page.locator("[type = 'password']").fill("123456");
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
});

test("Second Playwright test", async ({ browser, page }) => {
  //   const context = await browser.newContext();
  //   const page = await context.newPage();
  await page.goto("https://google.com/");
  console.log(await page.title());
  await expect(page).toHaveTitle("Google");
});
