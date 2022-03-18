import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // default puppeteer timeout

describe('List Editor', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 100,
      // // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('open enterModal, cancel enterModal', async () => {
    await page.goto(baseUrl);
    const openButton = await page.$('.adding-image');
    await openButton.click();
    await page.waitForSelector('.editor-enter-modal', { visible: true });
    const enterModal = await page.$('.editor-enter-modal');
    const canselButton = await enterModal.$('.modal-button-cancel');
    await canselButton.click();
    await page.waitForSelector('.editor-enter-modal', { visible: false });
  });

  test('Adding two product', async () => {
    await page.goto(baseUrl);
    const openButton = await page.$('.adding-image');
    await openButton.click();
    await page.waitForSelector('.editor-enter-modal', { visible: true });
    const enterModal = await page.$('.editor-enter-modal');
    const nameInput = await enterModal.$('.modal-name-input');
    const priceInput = await enterModal.$('.modal-price-input');
    const saveButton = await enterModal.$('.modal-button-save');
    await nameInput.type('Hummer');
    await priceInput.type('1200');
    await saveButton.click();
    await page.waitForSelector('.data-row', { visible: true });
    await page.waitForSelector('.editor-enter-modal', { visible: false });
    await openButton.click();
    await page.waitForSelector('.editor-enter-modal', { visible: true });
    await nameInput.type('Wood saw');
    await priceInput.type('550');
    await saveButton.click();
    await page.waitForSelector('.data-row', { visible: true });
    await page.waitForSelector('.editor-enter-modal', { visible: false });
  });

  test('Product name, product price update', async () => {
    await page.goto(baseUrl);
    const openButton = await page.$('.adding-image');
    await openButton.click();
    const enterModal = await page.$('.editor-enter-modal');
    const nameInput = await enterModal.$('.modal-name-input');
    const priceInput = await enterModal.$('.modal-price-input');
    const saveButton = await enterModal.$('.modal-button-save');
    await nameInput.type('Drill');
    await priceInput.type('6000');
    await saveButton.click();
    await openButton.click();
    await nameInput.type('Saw');
    await priceInput.type('7000');
    await saveButton.click();

    const table = await page.$('.editor-table');
    const products = await table.$$('.data-row');
    const product1 = await products[0];
    const apdateButton1 = await product1.$('.data-apdate-image');
    const product2 = await products[1];
    const apdateButton2 = await product2.$('.data-apdate-image');

    await apdateButton1.click();
    await nameInput.focus();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await nameInput.type('Electric drill');
    await priceInput.focus();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await priceInput.type('6500');
    await saveButton.click();

    await apdateButton2.click();
    await nameInput.focus();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await nameInput.type('Electric saw');
    await priceInput.focus();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await priceInput.type('6500');
    await saveButton.click();
  });

  test('Product name, product price not valid', async () => {
    await page.goto(baseUrl);
    const openButton = await page.$('.adding-image');
    await openButton.click();
    const enterModal = await page.$('.editor-enter-modal');
    const nameInput = await enterModal.$('.modal-name-input');
    const priceInput = await enterModal.$('.modal-price-input');
    const saveButton = await enterModal.$('.modal-button-save');
    await saveButton.click();

    await page.waitForSelector('.modal-price-span', { visible: true });
    await page.waitForSelector('.modal-price-span', { visible: true });

    await nameInput.type('Rock-drill');
    await priceInput.type('11200');
    await saveButton.click();

    await openButton.click();
    await nameInput.type('==  ==');
    await priceInput.type('++--++');
    await saveButton.click();

    await page.waitForSelector('.modal-price-span', { visible: true });
    await page.waitForSelector('.modal-price-span', { visible: true });

    await nameInput.focus();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await nameInput.type('Сhainsaw');
    await priceInput.focus();
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await page.keyboard.press('Backspace');
    await priceInput.type('15300');
    await saveButton.click();
  });

  test('Delete products', async () => {
    await page.goto(baseUrl);
    const openButton = await page.$('.adding-image');
    await openButton.click();
    const enterModal = await page.$('.editor-enter-modal');
    const nameInput = await enterModal.$('.modal-name-input');
    const priceInput = await enterModal.$('.modal-price-input');
    const saveButton = await enterModal.$('.modal-button-save');

    await nameInput.type('Electric jigsaw');
    await priceInput.type('7200');
    await saveButton.click();

    await openButton.click();
    await nameInput.type('Electric jack-plane');
    await priceInput.type('6700');
    await saveButton.click();

    const table = await page.$('.editor-table');
    const products = await table.$$('.data-row');
    const product1 = await products[0];
    const deleteButton1 = await product1.$('.data-delete-image');
    const product2 = await products[1];
    const deleteButton2 = await product2.$('.data-delete-image');
    await deleteButton1.click();
    const deleteModal = await page.$('.editor-delete-modal');
    const modalDeleteButton = await deleteModal.$('.delete-modal-button-delete');
    await modalDeleteButton.click();
    await deleteButton2.click();
    await modalDeleteButton.click();
  });
});
