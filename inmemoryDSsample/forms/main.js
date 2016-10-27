
/**
 * Callback method when form is (re)loaded.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DA322D43-C553-49A0-8998-03D253B9840D"}
 */
function onLoad$createDataSources(event) {
	scopes.loadIMDS.createIMPersons();
	scopes.loadIMDS.createIMKingQueen();
	elements.tabs.removeAllTabs();
	elements.tabs.addTab(forms.ex1)
	elements.tabs.addTab(forms.ex2)
}
