const { browser, element, by, By, $, $$, ExpectedConditions } = require('protractor');
function getDragAndDropScript(element, target) {
    const script = `function simulateDragDrop(source, destination) {
        const sourceNode = document.querySelector(source);
        const destinationNode = document.querySelector(destination);
        var EVENT_TYPES = {
            DRAG_END: 'dragend',
            DRAG_START: 'dragstart',
            DROP: 'drop'
        }
    
        function createCustomEvent(type) {
            var event = new CustomEvent("CustomEvent")
            event.initCustomEvent(type, true, true, null)
            event.dataTransfer = {
                data: {
                },
                setData: function (type, val) {
                    this.data[type] = val
                },
                getData: function (type) {
                    return this.data[type]
                }
            }
            return event
        }
    
        function dispatchEvent(node, type, event) {
            if (node.dispatchEvent) {
                return node.dispatchEvent(event)
            }
            if (node.fireEvent) {
                return node.fireEvent("on" + type, event)
            }
        }
    
        var event = createCustomEvent(EVENT_TYPES.DRAG_START)
        dispatchEvent(sourceNode, EVENT_TYPES.DRAG_START, event)
    
        var dropEvent = createCustomEvent(EVENT_TYPES.DROP)
        dropEvent.dataTransfer = event.dataTransfer
        dispatchEvent(destinationNode, EVENT_TYPES.DROP, dropEvent)
    
        var dragEndEvent = createCustomEvent(EVENT_TYPES.DRAG_END)
        dragEndEvent.dataTransfer = event.dataTransfer
        dispatchEvent(sourceNode, EVENT_TYPES.DRAG_END, dragEndEvent)
    }; 
        simulateDragDrop("${element}", "${target}");`;
    return script;
};

module.exports.Actions = class Actions {

    static async clickSelectAndGetOptionElements(locator) {
        await element(locator).click();
        const elements = await element(locator)
            .getWebElement()
            .findElements(by.tagName('option'));
        return elements;
    }
    static async selectByIndex(locator, index) {
        const elements = await this.clickSelectAndGetOptionElements(locator);
        await elements[index].click();
    }
    static async selectByValue(locator, value) {
        const elements = await this.clickSelectAndGetOptionElements(locator);
        const elementsValues = await Promise.all(elements.map(e => e.getAttribute('value')));
        const indexOfValue = elementsValues.findIndex(e => e === value);
        return elements[indexOfValue].click();
    }
    static async selectByText(locator, text) {
        const elements = await this.clickSelectAndGetOptionElements(locator);
        const elementsTexts = await Promise.all(elements.map(e => e.getText()));
        const indexOfText = elementsTexts.findIndex(e => e === text);
        return elements[indexOfText].click();
    }
    static async getAttribute(locator, atribute) {
        return element(locator).getAttribute(atribute);
    }
    static async sendKeys(locator, text) {
        return element(locator).sendKeys(text);
    }
    static async getText(locator) {
        return element(locator).getText();
    }
    static async getValue(locator) {
        return this.getAttribute(locator, 'value');
    }
    static async click(locator) {
        return element(locator).click();
    }
    static async dragAndDrop(locatorTarget, locatorDrop) {
        return browser.executeScript(getDragAndDropScript(locatorTarget.value, locatorDrop.value));
    }
}