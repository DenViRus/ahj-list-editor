import plus from '../img/plus.png';
import cross from '../img/cross.png';
import pensil from '../img/pensil.png';

export default class Editor {
  constructor(container, params) {
    this.container = container;
    this.params = params;
    this.editorBox = null;
  }

  drawEditor() {
    this.editorBox = document.createElement('div');
    this.editorBox.className = 'editor-box';
    this.editorBox.setAttribute('id', 'editorBox');

    this.editorHeadingBox = document.createElement('div');
    this.editorHeadingBox.className = 'editor-heading-box';

    this.editorHeading = document.createElement('h2');
    this.editorHeading.className = 'editor-heading';
    this.editorHeading.textContent = 'products';

    this.editorAdding = document.createElement('div');
    this.editorAdding.className = 'editor-adding';

    this.addingImage = document.createElement('img');
    this.addingImage.className = 'adding-image';
    this.addingImage.setAttribute('id', 'addingImage');
    this.addingImage.setAttribute('src', plus);
    this.addingImage.setAttribute('alt', 'plus');

    this.editorTableBox = document.createElement('div');
    this.editorTableBox.className = 'editor-table-box';

    this.editorTable = document.createElement('table');
    this.editorTable.className = 'editor-table';

    this.headingRow = document.createElement('tr');
    this.headingRow.className = 'heading-row';

    for (let i = 0, len = this.params.length; i < len; i++) {
      const headingCell = document.createElement('th');
      headingCell.className = `heading-cell heading-cell-${this.params[i]}`;
      headingCell.textContent = this.params[i];
      this.headingRow.append(headingCell);
    }

    this.emptyRow = document.createElement('tr');
    this.emptyRow.className = 'empty-row hidden';

    this.emptyCell = document.createElement('td');
    this.emptyCell.className = 'empty-cell';
    this.emptyCell.setAttribute('colspan', '3');
    this.emptyCell.textContent = 'no one product listed';

    this.dataRowTemplate = document.createElement('template');
    this.dataRowTemplate.className = 'data-row-template';

    this.dataRow = document.createElement('tr');
    this.dataRow.className = 'data-row';

    this.dataCellName = document.createElement('td');
    this.dataCellName.className = 'data-cell data-cell-name';
    this.dataCellName.textContent = '';

    this.dataCellPrice = document.createElement('td');
    this.dataCellPrice.className = 'data-cell data-cell-price';
    this.dataCellPrice.textContent = '';

    this.dataCellAcitons = document.createElement('td');
    this.dataCellAcitons.className = 'data-cell data-cell-actions';

    this.dataActonBox = document.createElement('div');
    this.dataActonBox.className = 'data-aciton-box';

    this.dataApdate = document.createElement('div');
    this.dataApdate.className = 'data-apdate';

    this.dataDelete = document.createElement('div');
    this.dataDelete.className = 'data-delete';

    this.dataApdateImage = document.createElement('img');
    this.dataApdateImage.className = 'data-image data-apdate-image';
    this.dataApdateImage.setAttribute('src', pensil);
    this.dataApdateImage.setAttribute('alt', 'pensil');

    this.dataDeleteImage = document.createElement('img');
    this.dataDeleteImage.className = 'data-image data-delete-image';
    this.dataDeleteImage.setAttribute('src', cross);
    this.dataDeleteImage.setAttribute('alt', 'cross');

    this.editorModalWraper = document.createElement('div');
    this.editorModalWraper.className = 'editor-modal-wraper editor-enter-modal-wraper hidden';

    this.editorModal = document.createElement('div');
    this.editorModal.className = 'editor-modal editor-enter-modal';

    this.modalForm = document.createElement('form');
    this.modalForm.className = 'modal-form modal-enter-form';

    this.modalNameBox = document.createElement('div');
    this.modalNameBox.className = 'modal-box modal-name-box';

    this.modalNameLabel = document.createElement('label');
    this.modalNameLabel.className = 'modal-label modal-name-label';
    this.modalNameLabel.setAttribute('for', 'modalNameInput');
    this.modalNameLabel.textContent = 'product name';

    this.modalNameInput = document.createElement('input');
    this.modalNameInput.className = 'modal-input modal-name-input';
    this.modalNameInput.setAttribute('id', 'modalNameInput');
    this.modalNameInput.setAttribute('type', 'text');
    this.modalNameInput.setAttribute('autocomplete', 'off');
    this.modalNameInput.setAttribute('placeholder', 'enter product name');
    this.modalNameInput.setAttribute('maxLength', '30');

    this.modalNameSpan = document.createElement('span');
    this.modalNameSpan.className = 'modal-span modal-name-span hidden';
    this.modalNameSpan.textContent = 'Error!';

    this.modalPriceBox = document.createElement('div');
    this.modalPriceBox.className = 'modal-box modal-price-box';

    this.modalPriceLabel = document.createElement('label');
    this.modalPriceLabel.className = 'modal-label modal-price-label';
    this.modalPriceLabel.setAttribute('for', 'modalPriceInput');
    this.modalPriceLabel.textContent = 'product price';

    this.modalPriceInput = document.createElement('input');
    this.modalPriceInput.className = 'modal-input modal-price-input';
    this.modalPriceInput.setAttribute('id', 'modalPriceInput');
    this.modalPriceInput.setAttribute('type', 'number');
    this.modalPriceInput.setAttribute('autocomplete', 'off');
    this.modalPriceInput.setAttribute('placeholder', 'enter product price');

    this.modalPriceSpan = document.createElement('span');
    this.modalPriceSpan.className = 'modal-span modal-price-span hidden';
    this.modalPriceSpan.textContent = 'Error!';

    this.modalButtonBox = document.createElement('div');
    this.modalButtonBox.className = 'modal-button-box';

    this.modalButtonSave = document.createElement('button');
    this.modalButtonSave.className = 'modal-button modal-button-save';
    this.modalButtonSave.setAttribute('type', 'submit');
    this.modalButtonSave.setAttribute('id', 'modalButtonSave');
    this.modalButtonSave.textContent = 'save';

    this.modalButtonCancel = document.createElement('button');
    this.modalButtonCancel.className = 'modal-button modal-button-cancel';
    this.modalButtonCancel.setAttribute('type', 'reset');
    this.modalButtonCancel.setAttribute('id', 'modalButtonCancel');
    this.modalButtonCancel.textContent = 'cancel';

    this.editorDeleteModalWraper = document.createElement('div');
    this.editorDeleteModalWraper.className = 'editor-modal-wraper editor-delete-modal-wraper hidden';

    this.editorDeleteModal = document.createElement('div');
    this.editorDeleteModal.className = 'editor-modal editor-delete-modal';

    this.deleteModalTextBox = document.createElement('div');
    this.deleteModalTextBox.className = 'modal-box delete-modal-text-box';

    this.deleteModalText = document.createElement('p');
    this.deleteModalText.className = 'modal-text delete-modal-text';
    this.deleteModalText.textContent = 'Are you sure you want to delete this product?';

    this.deleteModalButtonBox = document.createElement('div');
    this.deleteModalButtonBox.className = 'modal-button-box delete-modal-button-box';

    this.deleteModalButtonDelete = document.createElement('button');
    this.deleteModalButtonDelete.className = 'modal-button delete-modal-button-delete';
    this.deleteModalButtonDelete.setAttribute('type', 'submit');
    this.deleteModalButtonDelete.setAttribute('id', 'deleteModalButtonDelete');
    this.deleteModalButtonDelete.textContent = 'delete';

    this.deleteModalButtonCancel = document.createElement('button');
    this.deleteModalButtonCancel.className = 'modal-button delete-modal-button-cancel';
    this.deleteModalButtonCancel.setAttribute('type', 'reset');
    this.deleteModalButtonCancel.setAttribute('id', 'deleteModalButtonCancel');
    this.deleteModalButtonCancel.textContent = 'cancel';

    this.editorAdding.append(this.addingImage);
    this.editorHeadingBox.append(this.editorHeading);
    this.editorHeadingBox.append(this.editorAdding);

    this.emptyRow.append(this.emptyCell);

    this.dataApdate.append(this.dataApdateImage);
    this.dataDelete.append(this.dataDeleteImage);

    this.dataActonBox.append(this.dataApdate);
    this.dataActonBox.append(this.dataDelete);

    this.dataCellAcitons.append(this.dataActonBox);

    this.dataRow.append(this.dataCellName);
    this.dataRow.append(this.dataCellPrice);
    this.dataRow.append(this.dataCellAcitons);

    this.dataRowTemplate.append(this.dataRow);

    this.editorTable.append(this.headingRow);

    this.editorTableBox.append(this.editorTable);
    this.editorTableBox.append(this.emptyRow);
    this.editorTableBox.append(this.dataRowTemplate);

    this.modalNameBox.append(this.modalNameLabel);
    this.modalNameBox.append(this.modalNameInput);
    this.modalNameBox.append(this.modalNameSpan);

    this.modalPriceBox.append(this.modalPriceLabel);
    this.modalPriceBox.append(this.modalPriceInput);
    this.modalPriceBox.append(this.modalPriceSpan);

    this.modalButtonBox.append(this.modalButtonSave);
    this.modalButtonBox.append(this.modalButtonCancel);

    this.modalForm.append(this.modalNameBox);
    this.modalForm.append(this.modalPriceBox);
    this.modalForm.append(this.modalButtonBox);

    this.editorModal.append(this.modalForm);
    this.editorModalWraper.append(this.editorModal);

    this.deleteModalTextBox.append(this.deleteModalText);

    this.deleteModalButtonBox.append(this.deleteModalButtonDelete);
    this.deleteModalButtonBox.append(this.deleteModalButtonCancel);

    this.editorDeleteModal.append(this.deleteModalTextBox);
    this.editorDeleteModal.append(this.deleteModalButtonBox);

    this.editorDeleteModalWraper.append(this.editorDeleteModal);

    this.editorBox.append(this.editorHeadingBox);
    this.editorBox.append(this.editorTableBox);
    this.editorBox.append(this.editorModalWraper);
    this.editorBox.append(this.editorDeleteModalWraper);

    this.container.append(this.editorBox);
  }
}
