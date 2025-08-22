export default class getLocatorHelper {
  constructor(page) {
    this.page = page;
  }

  async getLocator(locator) {
    if (locator) {
      return await this.getLocatorType(locator);
    }
  }

  async getLocatorType(locatorName) {
    switch (locatorName.type) {
      case 'locator':
        return this.page.locator(locatorName.value);
      case 'locatortext':
        return this.page.locator(locatorName.value, { hasText: locatorName.attributetext });
      case 'class':
        return this.page.getByClass(locatorName.value);
      case 'text':
        return this.page.getByText(locatorName.value);
      case 'role':
        return this.page.getByRole(locatorName.subtype, { name: locatorName.value });
      case 'locatorfilter':
        return this.page.locator(locatorName.value).filter({ hasText: locatorName.attributetext });
      default:
        throw new Error(`Unknown locator type: ${locatorName.type}`);
    }
  }
}