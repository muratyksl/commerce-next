import { test, expect } from "@playwright/test";

test.describe("Products", () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto("/login");
    await page.fill('input[placeholder*="Username"]', "user");
    await page.fill('input[placeholder*="Password"]', "user123");
    await page.click('button:has-text("Sign in")');
  });

  test("should display products list", async ({ page }) => {
    await page.goto("/products");

    // Verify products are displayed
    const products = page.locator(".group");
    await expect(products).toHaveCount(2); // Based on your mock data

    // Verify product details
    await expect(page.locator("text=Product 1")).toBeVisible();
    await expect(page.locator("text=$99.99")).toBeVisible();
  });

  test("should navigate to product details", async ({ page }) => {
    await page.goto("/products");

    // Click on first product
    await page.click("text=Product 1");

    // Verify URL
    await expect(page).toHaveURL(/\/products\/1/);

    // Verify product details are displayed
    await expect(page.locator("h1")).toHaveText("Product 1");
    await expect(page.locator("text=$99.99")).toBeVisible();
  });
});
