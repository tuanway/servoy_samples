/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D1752885-443D-4B04-BDC1-BCF012537E9D"}
 */
var decryptoutput = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"6BA27F60-09A1-40C9-B3A7-BE2CBE2F2CF3"}
 */
var decryptinput = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1FF5DFB8-04CC-4A10-A4EC-690211F92992"}
 */
var encryptoutput = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"1319469E-6F84-4B8D-B356-BBC2320D8BC9"}
 */
var encryptinput = '';

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"C94E3732-9245-47D6-8DB3-ACA1314F79B4"}
 */
function onDataChange$encrypt(oldValue, newValue, event) {
	if (newValue == '' || newValue == ' ') {
		encryptoutput = '';
		return true;
	}
	try {
		encryptoutput = scopes.svyCrypto.encrypt(newValue);
	} catch (e) {
		plugins.dialogs.showInfoDialog('ERROR', e.toString())
	}
	return true
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {String} oldValue old value
 * @param {String} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"8028C098-5A55-4E9C-8D97-B5E6FB316A14"}
 */
function onDataChange$decrypt(oldValue, newValue, event) {	
	if (newValue == '' || newValue == ' ') {
		decryptoutput = '';
		return true;
	}
	try {
		decryptoutput = scopes.svyCrypto.decrypt(newValue);
	} catch (e) {
		plugins.dialogs.showInfoDialog('ERROR', e.toString())
		return false;
	}
	
	return true;
}
