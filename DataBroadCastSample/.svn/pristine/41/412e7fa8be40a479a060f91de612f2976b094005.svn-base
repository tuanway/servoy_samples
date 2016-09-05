/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"799277F2-AFF2-4FBD-A078-8A987F561231"}
 */
var hr = '<hr>';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"25B4E852-5357-4321-A324-67F2A2E0DE57"}
 */
var msg = '<u>pks being updated:</u> <br>';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"0F296DC7-E739-45E7-AC1C-C9B70184AF0D"}
 */
var h2_sub = ''

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"38C5D752-3E9F-4472-B714-CE80938708EF"}
 */
function onAction$clearData(event) {
	scopes.globals.clearData();
	application.exit();
}
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"A29D9475-3142-439F-B2CD-9593E65A8370"}
 */
function onAction$switchUser(event) {
	forms.startup.show();
	forms.startup.run();
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8A141139-9580-4625-B77C-A31192DC253B"}
 * @AllowToRunInFind
 */
function onShow(firstShow, event) {
	elements.h1_sub.text = 'Hi ' + scopes.globals.current_user +'. Make some updates <br> below for other users to see.'
	foundset.removeFoundSetFilterParam('user_name_filter');
	foundset.addFoundSetFilterParam('user_name', '=', scopes.globals.current_user, 'user_name_filter');
	foundset.loadAllRecords();
}
