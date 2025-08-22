import getLocatorHelper from '../helpers/getLocatorHelper.js';
import { expect } from '@playwright/test';

class AboutPage {
  constructor(locators, page) {
    this.locators = locators.aboutPage;
    this.page = page;
    this.locatorHelper = new getLocatorHelper(this.page); 
  }
/**
 * When creating action methods use the action associated to the locator such as click or fill.
 * When asserting elements or locators . Use assert to prefix the method name ,such as Assert/Expect Header to be visible.
 * Call get locator method to return back the locator object based on the locator type.
 * instead of using the waits in the methods , use playwright waitfor methods such as waitForVisible, waitForEnabled, etc.
 * The above methods allow for time out as well as waiting for the element to be in the correct state.
 * The time out set will work like a while loop for the desired locator.
 */
 async AssertOurStoryHeading() {
  const heading = await this.locatorHelper.getLocator(this.locators.OurStoryHeading);
  await heading.waitFor({ state: 'visible' ,setTimeout: 5000});
  await expect(heading).toBeVisible();
  }  
}

export default AboutPage;