const { Actions } = require('../framework/actions');
const { browser, element, Sele, by, By, $, $$, ExpectedConditions } = require('protractor');

module.exports.Pom = class Pom {
    //elements
    static TextInput = by.css("#myTextInput");
    static TextAreaInput = by.css("*[name=textareaName]");
    static SelectDropdown = by.css("#mySelect");
    static MetterBar = by.css("#meterBar");
    static Button = by.css("#myButton");
    static DragAndDropSrc = by.css("#drop1");
    static DragAndDropTo = by.css("#drop2");
    static Draggable = by.css("#logo");
    static Checkbox = by.css("*[name='checkBoxName1']");

    static enterTextInput = (text) => Actions.sendKeys(this.TextInput, text);
    static getTextInputValue = () => Actions.getValue(this.TextInput);

    static selectByText = (text) => Actions.selectByText(this.SelectDropdown, text);
    static selectByValue = (val) => Actions.selectByValue(this.SelectDropdown, val);
    static selectByIndex = (index) => Actions.selectByIndex(this.SelectDropdown, index);
    static getSelectValue = () => Actions.getValue(this.SelectDropdown);
    static getMeterValue = () => Actions.getValue(this.MetterBar);

    static clickButton = () => Actions.click(this.Button);
    static getButtonStyle = () => Actions.getAttribute(this.Button, "style");

    static dragAndDrop = () => Actions.dragAndDrop(this.Draggable, this.DragAndDropTo);
    static getDraggableLocation = () => element(this.Draggable).getLocation();
}