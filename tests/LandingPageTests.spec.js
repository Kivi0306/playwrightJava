// @ts-check
import { test, expect } from '@playwright/test';
import Setup from '../Setup.js';

test('Open and assert landing Page', async () => {
  //Arrange
  const { page, helpers ,websiteUrl} = await Setup.InitHelperPages('Entelect.json');

  //Act
  await page.goto(websiteUrl);

  //Assert
  await helpers.landingPage.AssertLandingPageAsync(); 
  await Setup.CloseBrowser();
});

test('Navigate to the our Story page', async () => {
  //Arrange
  const { page, helpers ,websiteUrl} = await Setup.InitHelperPages('Entelect.json');
  await page.goto(websiteUrl);

  //Act
  await helpers.landingPage.ClickAboutUsAsync();
  await helpers.landingPage.ClickOurStoryButtonAsync();

  //Assert
  await helpers.aboutPage.AssertOurStoryHeading(); 
  await Setup.CloseBrowser();
});
