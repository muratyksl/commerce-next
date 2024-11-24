import { test, expect } from "@playwright/test";

test.describe("Product Comments", () => {
  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto("/login");
    await page.fill('input[placeholder*="Username"]', "user");
    await page.fill('input[placeholder*="Password"]', "user123");
    await page.click('button:has-text("Sign in")');

    // Wait for navigation to complete
    await expect(page).toHaveURL("/products");

    // Navigate to first product
    await page.click("text=Product 1");

    // Wait for product details page to load
    await expect(page).toHaveURL(/\/products\/1/);
  });

  test("should add a new comment", async ({ page }) => {
    // Wait for the form to be visible
    await expect(page.locator("textarea")).toBeVisible();

    // Add rating
    await page.click(".group >> nth=4"); // Click the 5th star

    // Add comment text
    await page.fill("textarea", "This is a test comment");

    // Submit comment
    await page.click('button:has-text("Submit")');

    // Verify success message
    await expect(page.locator("text=Comment added successfully")).toBeVisible();

    // Verify new comment is displayed
    await expect(page.locator("text=This is a test comment")).toBeVisible();
  });

  test("should show validation errors", async ({ page }) => {
    // Switch to comments tab
    await page.click('button:has-text("Comments")');

    // Submit empty form
    await page.click('button:has-text("Submit")');

    // Verify validation errors
    await expect(page.locator("text=Please select a rating")).toBeVisible();
    await expect(
      page.locator("text=Comment must be at least 3 characters long")
    ).toBeVisible();
  });
});
