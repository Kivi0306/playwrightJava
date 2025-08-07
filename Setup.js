import { chromium, firefox, webkit } from 'playwright';

class Setup {
  static browser = null;
  static page = null;

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

  static async CloseBrowser() {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
    }
  }
}

export default Setup;