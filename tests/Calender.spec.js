const { test, expect } = require("@playwright/test");

test("Calendar test", async ({ page }) => {
  const monthNumber = "2";
  const date = "3";
  const yearNumber = "2029";
  const expectedList = [monthNumber, date, yearNumber];
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(yearNumber).click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(monthNumber) - 1)
    .click();
  await page
    .locator("//abbr[text()='" + date + "']")
    .first()
    .click();
  const inputs = await page.locator(".react-date-picker__inputGroup input");
  for (let index = 0; index < inputs.length; index++) {
    const value = await inputs[index].inputValue();
    expect(value).toBe(expectedList[index]);
  }
});
