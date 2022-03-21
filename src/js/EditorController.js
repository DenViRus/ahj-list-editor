import Product from './Product.js';

export default class EditorController {
  constructor(container) {
    this.container = container;
    this.aim = null;
    this.dataRows = null;
    this.dataRow = null;
    this.dataRowName = null;
    this.dataRowPrice = null;
    this.product = null;
    this.index = null;
    this.productsArr = [];
  }

  getEditorData() {
    this.editorBox = this.container.querySelector('.editor-box');
    this.editorHeadingBox = this.editorBox.querySelector('.editor-heading-box');
    this.editorTableBox = this.editorBox.querySelector('.editor-table-box');
    this.editorTable = this.editorTableBox.querySelector('.editor-table');
    this.emptyRow = this.editorTableBox.querySelector('.empty-row');
    this.template = this.editorTableBox.querySelector('.data-row-template');
    this.templateRow = this.template.querySelector('.data-row');
    this.enterModalWraper = this.editorBox.querySelector('.editor-enter-modal-wraper');
    this.enterModal = this.enterModalWraper.querySelector('.editor-enter-modal');
    this.enterModalForm = this.enterModal.querySelector('.modal-enter-form');
    this.enterModalNameInput = this.enterModalForm.querySelector('.modal-name-input');
    this.enterModalNameSpan = this.enterModalForm.querySelector('.modal-name-span');
    this.enterModalPriceInput = this.enterModalForm.querySelector('.modal-price-input');
    this.enterModalPriceSpan = this.enterModalForm.querySelector('.modal-price-span');
    this.enterModalinputs = [...this.enterModalForm.querySelectorAll('.modal-input')];
    this.enterModalButtonSave = this.enterModalForm.querySelector('.modal-button-save');
    this.enterModalButtonCancel = this.enterModalForm.querySelector('.modal-button-cancel');
    this.deleteModalWraper = this.editorBox.querySelector('.editor-delete-modal-wraper');
    this.deleteModal = this.deleteModalWraper.querySelector('.editor-delete-modal');
    this.deleteModalButtonDelete = this.deleteModal.querySelector('.delete-modal-button-delete');
    this.deleteModalButtonCancel = this.deleteModal.querySelector('.delete-modal-button-cancel');
  }

  checkDataRows() {
    this.dataRows = this.editorTable.querySelectorAll('.data-row');
    if (this.dataRows.length === 0) {
      this.editorTable.append(this.emptyRow);
      this.emptyRow.classList.remove('hidden');
    } else {
      this.emptyRow.classList.add('hidden');
      this.editorTableBox.append(this.emptyRow);
    }
  }

  removeNameValidation() {
    this.enterModalNameInput.className = 'modal-input modal-name-input';
    this.enterModalNameSpan.className = 'modal-span modal-name-span hidden';
  }

  removePriceValidation() {
    this.enterModalPriceInput.className = 'modal-input modal-price-input';
    this.enterModalPriceSpan.className = 'modal-span modal-price-span hidden';
  }

  removeValidaiton() {
    this.removeNameValidation();
    this.removePriceValidation();
  }

  resetModal() {
    this.enterModalNameInput.value = '';
    this.enterModalPriceInput.value = '';
  }

  closeEnterModal() {
    this.resetModal();
    this.removeValidaiton();
    this.enterModalButtonSave.className = 'modal-button modal-button-save';
    this.enterModalWraper.classList.add('hidden');
  }

  validateNameInput() {
    this.removeNameValidation();
    if (/[а-яА-ЯёЁa-zA-Z0-9]+/g.test(this.enterModalNameInput.value)) {
      this.enterModalNameInput.classList.add('valid');
    } else if (this.enterModalNameInput.value === '') {
      this.enterModalNameInput.classList.add('noValid');
      this.enterModalNameSpan.textContent = 'Enter product name!';
      this.enterModalNameSpan.classList.remove('hidden');
    } else {
      this.enterModalNameInput.classList.add('noValid');
      this.enterModalNameSpan.textContent = 'Product name must include letters or numbers!';
      this.enterModalNameSpan.classList.remove('hidden');
    }
  }

  validatePriceInput() {
    this.removePriceValidation();
    if (this.enterModalPriceInput.value === '') {
      this.enterModalPriceInput.classList.add('noValid');
      this.enterModalPriceSpan.textContent = 'Enter product price!';
      this.enterModalPriceSpan.classList.remove('hidden');
    } else if (this.enterModalPriceInput.value <= 0) {
      this.enterModalPriceInput.classList.add('noValid');
      this.enterModalPriceSpan.textContent = 'Product price mast be greater than 0!';
      this.enterModalPriceSpan.classList.remove('hidden');
    } else if (this.enterModalPriceInput.value > 1000000000000) {
      this.enterModalPriceInput.classList.add('noValid');
      this.enterModalPriceSpan.textContent = 'Product price mast be less than 1000000000000!';
      this.enterModalPriceSpan.classList.remove('hidden');
    } else if (/[0-9]+/g.test(this.enterModalPriceInput.value)) {
      this.enterModalPriceInput.classList.add('valid');
    }
  }

  validateForm() {
    this.validateNameInput();
    this.validatePriceInput();
    const noValidInput = this.enterModalinputs.find((input) => input.classList.contains('noValid'));
    if (noValidInput) {
      noValidInput.focus();
      return false;
    }
    return true;
  }

  addProduct() {
    if (this.validateForm()) {
      this.dataRow = this.templateRow.cloneNode(true);
      this.dataRowName = this.dataRow.querySelector('.data-cell-name');
      this.dataRowPrice = this.dataRow.querySelector('.data-cell-price');
      this.dataRowName.textContent = this.enterModalNameInput.value.trim();
      this.dataRowPrice.textContent = parseFloat(this.enterModalPriceInput.value).toFixed(2);
      this.product = new Product(this.dataRowName.textContent, this.dataRowPrice.textContent);
      this.editorTable.append(this.dataRow);
      this.productsArr.push(this.product);

      this.closeEnterModal();
      this.checkDataRows();
    }
  }

  updateProduct() {
    if (this.validateForm()) {
      this.dataRowName.textContent = this.enterModalNameInput.value.trim();
      this.dataRowPrice.textContent = parseFloat(this.enterModalPriceInput.value).toFixed(2);
      this.product.name = this.dataRowName.textContent;
      this.product.price = parseFloat(this.dataRowPrice.textContent);
      this.closeEnterModal();
    }
  }

  editorControl() {
    const editorController1 = (event) => {
      this.aim = event.target;
      if (this.aim.classList.contains('adding-image')) {
        event.preventDefault();
        this.removeValidaiton();
        this.enterModalWraper.classList.remove('hidden');
        this.enterModalNameInput.focus();
        this.enterModalButtonSave.classList.add('nowAdd');
      }

      if (this.aim.classList.contains('nowAdd')) {
        event.preventDefault();
        this.addProduct();
      }

      if (this.aim.classList.contains('modal-button-cancel')) {
        event.preventDefault();
        this.closeEnterModal();
      }

      if (this.aim.classList.contains('data-apdate-image')) {
        event.preventDefault();
        this.removeValidaiton();
        this.enterModalWraper.classList.remove('hidden');
        this.enterModalButtonSave.classList.add('nowUpdate');
        this.dataRow = this.aim.closest('.data-row');
        this.dataRowName = this.dataRow.querySelector('.data-cell-name');
        this.dataRowPrice = this.dataRow.querySelector('.data-cell-price');
        this.index = this.productsArr.findIndex((product) => product.name === this.dataRowName.textContent && product.price === parseFloat(this.dataRowPrice.textContent));
        this.product = this.productsArr[this.index];
        this.enterModalNameInput.value = this.dataRowName.textContent;
        this.enterModalNameInput.focus();
        this.enterModalPriceInput.value = this.dataRowPrice.textContent;
      }

      if (this.aim.classList.contains('nowUpdate')) {
        event.preventDefault();
        this.updateProduct();
      }

      if (this.aim.classList.contains('data-delete-image')) {
        event.preventDefault();
        this.deleteModalWraper.classList.remove('hidden');
        this.dataRow = this.aim.closest('.data-row');
        this.dataRowName = this.dataRow.querySelector('.data-cell-name');
        this.dataRowPrice = this.dataRow.querySelector('.data-cell-price');
        this.index = this.productsArr.findIndex((product) => product.name === this.dataRowName.textContent && product.price === parseFloat(this.dataRowPrice.textContent));
      }

      if (this.aim.classList.contains('delete-modal-button-delete')) {
        event.preventDefault();
        this.dataRow.remove();
        this.productsArr.splice(this.index, 1);
        this.checkDataRows();
        this.deleteModalWraper.classList.add('hidden');
      }

      if (this.aim.classList.contains('delete-modal-button-cancel')) {
        event.preventDefault();
        this.deleteModalWraper.classList.add('hidden');
      }
    };

    const editorController2 = (event) => {
      this.aim = event.target;
      if (this.aim.classList.contains('modal-name-input')) {
        event.preventDefault();
        this.removeNameValidation();
      }

      if (this.aim.classList.contains('modal-price-input')) {
        event.preventDefault();
        this.removePriceValidation();
      }
    };

    const editorController3 = (event) => {
      this.aim = event.target;
      if (event.key === 'Enter') {
        event.preventDefault();
      }
    };

    this.editorBox.addEventListener('click', editorController1);
    this.editorBox.addEventListener('keyup', editorController2);
    this.editorBox.addEventListener('keydown', editorController3);
  }
}
