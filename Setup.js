import { chromium, firefox, webkit } from 'playwright';
import { promises as fs } from 'fs';
import path from 'path';

// Import your helper page classes
import LandingPage from './pages/landingPage.js';
import AboutPage from './pages/aboutPage.js';

class Setup {
  static browser = null;
  static page = null;
  static websiteUrl = '';
  static locators = [];

  /**
   * Launches a browser and returns a Playwright Page instance.
   * @param {'chromium' | 'firefox' | 'webkit'} browserName
   * @returns {Promise<import('@playwright/test').Page>}
   */
  static async LaunchBrowser(browserName = 'chromium') {
    let browserType;
    if (browserName === 'firefox') {
      browserType = firefox;
    } else if (browserName === 'webkit') {
      browserType = webkit;
    } else {
      browserType = chromium;
    }
    this.browser = await browserType.launch({ headless: false });
    this.page = await this.browser.newPage();
    return this.page;
  }

  /**
   * Loads locators from a JSON file.
   * @param {string} jsonFileName
   * @returns {Promise<Object>}
   */
  static async GetLocators(jsonFileName) {
    let locators = await this.GetLocatorsForClient(jsonFileName);
    if (locators) {
      return locators;
    }
    return [];
  }

  static async GetLocatorsForClient(jsonFileName) {
    const filePath = path.resolve(__dirname, jsonFileName);
    const data = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json;
  }

  /**
   * Closes the browser instance.
   */
  static async CloseBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }

  /**
   * Initializes all helper page objects.
   * @param {string} jsonFileName
   * @returns {Promise<{ page: import('@playwright/test').Page, helpers: Object }>}
   */
  static async InitHelperPages(jsonFileName) {
    const page = await this.LaunchBrowser();
    const locators = await this.GetLocators(jsonFileName);

    const helpers = {
      landingPage: new LandingPage(locators, page),
      aboutPage: new AboutPage(locators, page),
    };
 
    const websiteUrl = locators.websiteurls.url;

    return { page, helpers, websiteUrl };
  }
}

export default Setup;