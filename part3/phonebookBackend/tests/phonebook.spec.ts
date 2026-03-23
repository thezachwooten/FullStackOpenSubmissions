import { test, expect } from '@playwright/test';
import { PhonebookPage } from '../pom/PhonebookPage'; // adjust the path if needed

test('Phonebook header is present', async ({ page }) => {
    // Navigate to your phonebook app
    await page.goto('http://localhost:5173/');

    // Create an instance of your page object
    const phonebook = new PhonebookPage(page);

    // Assert that the Phonebook header is visible
    await expect(phonebook.phonebookHeader).toBeVisible();
});

test('user can add a new person', async ({ page }) => {
    const phonebook = new PhonebookPage(page);
    await page.goto('http://localhost:5173/');

    // Optional: check the page loaded correctly
    await expect(phonebook.phonebookHeader).toBeVisible();
    await expect(phonebook.personForm).toBeVisible();

    const uniqueName = `Alice-${Math.random()}`;
    // Perform action
    await phonebook.addPerson(`${uniqueName}`, '123-456-7890');

    // Assert expected outcome
    const aliceRow = phonebook.getPersonRow(`${uniqueName}`);
    await expect(aliceRow).toBeVisible();

    const notification = await phonebook.getSuccessNotification();
    await expect(notification).toHaveText(new RegExp(uniqueName));
});