import getLocatorHelper from '../helpers/getLocatorHelper.js';
import { expect } from '@playwright/test';

class LandingPage {
  constructor(locators, page) {
    this.locators = locators.landingPage;
    this.page = page;
    this.locatorHelper = new getLocatorHelper(this.page); 
  }

async AssertLandingPage() {
  console.log('Locator:', this.locators.heading);
  const heading = await this.locatorHelper.getLocator(this.locators.heading);
  await heading.waitFor({ state: 'visible' });
  await expect(heading).toBeVisible();
  }
}

export default LandingPage;
