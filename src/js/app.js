import Editor from './Editor.js';
import EditorController from './EditorController.js';

const editorContainer = document.getElementById('mainContainer');
const editorParams = ['name', 'price', 'actions'];
const editor1 = new Editor(editorContainer, editorParams);
editor1.drawEditor();

const dataEditorContainer = document.getElementById('mainContainer');
const editorController1 = new EditorController(dataEditorContainer);
editorController1.getEditorData();
editorController1.checkDataRows();

editorController1.editorControl();
