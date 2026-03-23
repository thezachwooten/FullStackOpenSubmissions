import { test, expect } from '@playwright/test';

test.describe('Phonebook API Tests', () => {
    const baseUrl = 'http://localhost:3001/api/persons';
    let createdID;

    test('GET all persons returns 200 and a list', async ({ request }) => {
        // Get reqeust to base url
        const response = await request.get(baseUrl);
        // Expect a 200 response
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body)).toBe(true);
    });

    test('GET a person by id returns 200 and expected person', async ({ request }) => {
        const response = await request.get(`${baseUrl}/3`);
        expect(response.status()).toBe(200);
        const expectedBody = {
            "id": "3",
            "name": "Dan Abramov",
            "number": "12-43-234345"
        };
        const body = await response.json();
        expect(body).toEqual(expect.objectContaining(expectedBody));
    });

    test('POST a duplicate in exact casing returns 409 and error Duplicate name entered', async ({ request }) => {
        const dupeData = {
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
        };

        const response = await request.post(`${baseUrl}/`, {data: dupeData});
        expect(response.status()).toBe(409);

        const expectedError = "Duplicate name entered";
        const body = await response.json();
        const actualError = body.error;

        expect(actualError).toBe(expectedError);
    })

    test('POST a duplicate in lower casing returns 409 and error Duplicate name entered', async ({ request }) => {
        const dupeData = {
        "name": "ada lovelace", 
        "number": "39-44-5323523"
        };

        const response = await request.post(`${baseUrl}/`, {data: dupeData});
        expect(response.status()).toBe(409);

        const expectedError = "Duplicate name entered";
        const body = await response.json();
        const actualError = body.error;

        expect(actualError).toBe(expectedError);
    })

    test('POST a new person returns 201 and new person', async ({ request }) => {
        const newPerson = {
            "name": `John Wick ${Math.random()}`,
            "number": "789-789-1221"
        };

        const response = await request.post(`${baseUrl}/`, {data: newPerson});
        expect(response.status()).toBe(201);

        const body = await response.json();
        createdID = body.id;

        expect(body).toMatchObject(newPerson);
    });

    test('POST creates a new person and returns valid response', async ({ request }) => {
        const newPerson = {
            name: `John Wick ${Math.random()}`,
            number: "789-789-1221"
        };

        const response = await request.post(`${baseUrl}/`, { data: newPerson });

        // Status check
        expect(response.status()).toBe(201);

        const body = await response.json();

        // Validate ID
        expect(body).toHaveProperty('id');
        expect(typeof body.id).toBe('string');
        expect(body.id.length).toBeGreaterThan(0);

        // Validate returned data
        expect(body).toMatchObject(newPerson);
    });

    test('PUT a updated person returns 200 and updated person', async ({request}) => {
        const newName = `Tom Sawyer - ${Math.random()}`;
        // Define a new person
        const newPerson = {
            name: newName,
            number: '657-289-1111'
        }

        // post new person
        const postResponse = await request.post(`${baseUrl}/`, {data: newPerson});

        expect(postResponse.status()).toBe(201);

        const body = await postResponse.json();
        const ID = body.id;

        // put updated person
        const updatedNumber = `123-789-4565`;

        const putResponse = await request.put(`${baseUrl}/${ID}`, {data:
            {
                name: newName,
                number: updatedNumber
            }
        });

        expect(putResponse.status()).toBe(200);

        const expectedUpdatedPerson = {
            id: ID,
            name: newName,
            number: updatedNumber
        };

        const putBody = await putResponse.json();

        expect(putBody).toMatchObject(expectedUpdatedPerson);

    });

    test.afterEach(async ({ request }) => {
        if (createdID) {
            await request.delete(`${baseUrl}/${createdID}`);
        }
    });

});