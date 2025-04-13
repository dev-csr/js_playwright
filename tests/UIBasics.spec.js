const { test, expect } = require("@playwright/test");

test("First Playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  const password = page.locator("[type = 'password']");
  const signInBtn = page.locator("#signInBtn");
  const cardtitle = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await userName.fill("Srikanth");
  await password.fill("123456");
  await signInBtn.click();
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("learning");
  await signInBtn.click();
  console.log(await cardtitle.first().textContent());
  console.log(await cardtitle.nth(1).textContent());
  const alltitles = await cardtitle.allTextContents();
  console.log(alltitles);
});

test("UI controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const password = page.locator("[type = 'password']");
  const documentlink = page.locator("a[href*='documents-request']");
  const signInBtn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").check();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  await expect(page.locator("#terms")).not.toBeChecked();
  await expect(documentlink).toHaveAttribute("class", "blinkingText");
});

test.only("Child window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentlink = page.locator("a[href*='documents-request']");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentlink.click(),
  ]);
  const text = await newPage.locator(".im-para.red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  console.log(text);
  await page.locator("#username").fill(domain);
  page.pause();
});
