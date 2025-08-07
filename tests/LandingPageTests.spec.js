// @ts-check
import { test, expect } from '@playwright/test';
import Setup from '../Setup.js';

test('Open Entelect Landing Page', async () => {
  //Arrange 
  /** @type {import('@playwright/test').Page} */
  let page = await Setup.LaunchBrowser('chromium');
  //Act
  await page.goto('https://entelect.co.za/');
  //Assert
  await expect(page).toHaveTitle(/End-to-end technology services and solutions | Entelect/);
  await expect(page.getByText('We offer end-to-end technology services and solutions, collaborating with our customers to help them go from good to great.')).toBeVisible();
  await Setup.CloseBrowser();
});

test('Navigate to the our Story page', async () => {
  //Arrange
  /** @type {import('@playwright/test').Page} */
  let page = await Setup.LaunchBrowser('chromium');
  //Act
  await page.goto('https://entelect.co.za/');
  await page.locator('a').filter({ hasText: /^About Us$/ }).click();
  await page.getByRole('link', { name: ' Our Story' }).click();
  await page.getByRole('heading', { name: 'Our Story' }).click();
  //Assert
  await expect(page.getByRole('heading', { name: 'Our Story' })).toBeVisible();
  await page.waitForTimeout(2000); 
  await Setup.CloseBrowser();
});
