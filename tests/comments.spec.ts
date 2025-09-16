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
    await page.click('a[href="/products/1"]');

    // Wait for product details page to load
    await expect(page).toHaveURL(/\/products\/1/);
  });

  test("should add a new comment", async ({ page }) => {
    // Switch to comments tab first
    await page.click('button:has-text("Comments")');

    // Wait for the form to be visible
    await expect(page.locator("textarea")).toBeVisible();

    // Add rating - updated approach
    await page.locator('[data-testid="interactive-star-rating-5"]').click();

    // Verify the rating was set by checking the star's appearance
    await expect(
      page.locator('[data-testid="interactive-star-rating-5"] svg')
    ).toHaveClass(/text-yellow-400/);

    // Add a wait to ensure rating is set
    await page.waitForTimeout(100);

    // Fill in the comment
    await page.fill("textarea", "This is a test comment");

    // Submit the form
    await page.click('button:has-text("Submit")');

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
