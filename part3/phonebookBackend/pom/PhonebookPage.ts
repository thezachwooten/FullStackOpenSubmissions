import {expect, type Locator, type Page} from '@playwright/test';

export class PhonebookPage {
    // TYPING

    readonly page: Page;
    readonly phonebookHeader: Locator;
    readonly filterForm: Locator;
    readonly filterInput: Locator;
    readonly personForm: Locator;
    readonly personNameInput: Locator;
    readonly personNumberInput: Locator;
    readonly personSubmitButton: Locator;
    readonly numbersHeaders: Locator;
    readonly personsList: Locator;

    // CONSTRUCTOR 

    constructor(page: Page) {
        this.page = page;
        this.phonebookHeader = page.locator('h2', {hasText: 'Phonebook'});
        this.filterForm = page.locator('.searchFilter');
        this.filterInput = this.filterForm.locator('.searchFilterInput');
        this.personForm = page.locator('.personForm');
        this.personNameInput = this.personForm.locator('.personFormNameInput');
        this.personNumberInput = this.personForm.locator('.personFormNumberInput');
        this.personSubmitButton = this.personForm.locator('.personFormSubmitButton');
        this.numbersHeaders = page.locator('h2', {hasText: 'Numbers'});
        this.personsList = page.locator('.persons');

    }

    // HELPERS

    getPersonRow(name: string): Locator {
        return this.personsList.locator(`li:has-text("${name}")`);
    }
    
    getDeleteButtonForPerson(name: string): Locator {
        return this.getPersonRow(name).locator('button');
    }

    async addPerson(name: string, number: string): Promise<void> {
        await this.personNameInput.fill(name);
        await this.personNumberInput.fill(number);
        await this.personSubmitButton.click();
    }

    async getSuccessNotification() {
        return this.page.locator('.notification-success');
    }
}