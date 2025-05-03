const { test, expect, request } = require("@playwright/test");
const loginData = {
  userEmail: "srikanthchilukuri01@gmail.com",
  userPassword: "Srikanth@2025",
};
const orderData = {
  orders: [{ country: "Cuba", productOrderedId: "67a8dde5c0d3e6622a297cc8" }],
};
let token;
let orderId;
test.beforeAll(async () => {
  const apiContext = await request.newContext({
    ignoreHTTPSErrors: true, // ⚠️ Only for test environments
  });

  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: loginData,
    }
  );

  const responseBody = await loginResponse.text();
  console.log("Login response body:", responseBody);

  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = JSON.parse(responseBody);
  token = loginResponseJson.token;
  console.log("Auth token:", token);

  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderData,
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  const orderResponseJson = await orderResponse.json();
  orderId = orderResponseJson.orders[0];
});

test("Order a product", async ({ page }) => {
  page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  const email = loginData.userEmail;
  const productName = "ZARA COAT 3";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("button[routerlink*='myorders']").click();
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderid = await rows.nth(i).locator("th").textContent();
    if (orderId.includes(rowOrderid)) {
      await rows.nth(i).locator("button[class='btn btn-primary']").click();
      break;
    }
  }
  const orderIdDetails = await page.locator(".col-text.-main").textContent();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

  await page.pause(2000);
});
