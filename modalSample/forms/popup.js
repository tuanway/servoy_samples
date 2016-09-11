/**
 * @type {Function}
 *
 * @properties={typeid:35,uuid:"88D1398D-CF5B-4D89-8C19-F9466CD9E3BB",variableType:-4}
 */
var callback = null;

/**
 * Show modal dialog
 * @param {Function} callbackFunction
 * @properties={typeid:24,uuid:"C63E38C1-2900-440C-BFE0-69D0779693BF"}
 */
function show(callbackFunction) {
	callback = callbackFunction;
	application.createWindow(controller.getName(), JSWindow.MODAL_DIALOG).setSize(500, 500);
	var win = application.getWindow(controller.getName());
	win.show(controller.getName());

}

/**
 * @properties={typeid:24,uuid:"954A9D62-54E3-4E70-B317-C1408263BC68"}
 */
function closeButton() {
	var win = application.getWindow(controller.getName());
	win.destroy();
}

/**
 * Event triggered when dialog closes
 * @properties={typeid:24,uuid:"AF2D9B35-70A2-44BC-8B6B-ADFE79AED740"}
 */
function onHide() {
	//run the callback function when form closes.
	callback();
}
