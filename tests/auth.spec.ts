import { test, expect } from "@playwright/test";

test.describe("Authentication", () => {
  test("should login successfully with correct credentials", async ({
    page,
  }) => {
    await page.goto("/login");

    // Fill login form
    await page.fill('input[placeholder*="Username"]', "user");
    await page.fill('input[placeholder*="Password"]', "user123");
    await page.click('button:has-text("Sign in")');

    // Verify redirect to products page
    await expect(page).toHaveURL("/products");

    // Verify user is logged in
    await expect(page.locator("text=User")).toBeVisible();
  });

  test("should show error with incorrect credentials", async ({ page }) => {
    await page.goto("/login");

    // Fill login form with incorrect credentials but valid format
    await page.fill('input[placeholder*="Username"]', "wronguser");
    await page.fill('input[placeholder*="Password"]', "wrongpass123");
    await page.click('button:has-text("Sign in")');

    // Verify error message
    await expect(page.locator("text=Invalid credentials")).toBeVisible();
  });
});
