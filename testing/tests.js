const { browser, element, by, By, $, $$, ExpectedConditions } = require('protractor');
const { Pom } = require('../poms/pom');

describe("seleniumbase.id demo tests", () => {
    beforeEach(() => {
        browser.waitForAngularEnabled(false);
        browser.get("https://seleniumbase.io/demo_page");
    });

    it("Text Input Field Accepts Input", async () => {
        const text = "Hello World";

        await Pom.enterTextInput(text);
        const containedText = await Pom.getTextInputValue();

        expect(containedText).toEqual(text);
    });

    it("Select Dropdown Can Select", async () => {
        const text = "Set to 50%";
        const metterValueExpected = "0.5";

        await Pom.selectByText(text);
        const selectedValue = await Pom.getSelectValue();
        const meterValue = await Pom.getMeterValue();

        expect(selectedValue).toEqual("50%");
        expect(meterValue).toEqual(metterValueExpected);
    });

    it("Button Color Changes On Click", async () => {
        let initialExpected = "green";
        let afterExpected = "purple";

        const initialStyle = await Pom.getButtonStyle();
        await Pom.clickButton();
        const afterClickStyle = await Pom.getButtonStyle();

        expect(initialStyle).toContain(initialExpected);
        expect(afterClickStyle).toContain(afterExpected);
    });

    it("Drag And Drop Test", async () => {

        await element(Pom.Checkbox).click();
        const locationBefore = await Pom.getDraggableLocation();
        await Pom.dragAndDrop();
        const locationAfter = await Pom.getDraggableLocation();

        expect(locationAfter.x).toBeGreaterThan(locationBefore.x);
        expect(locationAfter.y).toEqual(locationBefore.y);
    });
});