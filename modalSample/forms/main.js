
/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"613C69B2-8156-47F0-B0D3-0D49331C016D"}
 */
function onAction(event) {
	//show the popup window and set callback function to 'printsomething'
	forms.popup.show(printsomething);
}

/**
 * @properties={typeid:24,uuid:"C6A26B1D-B128-41A7-AC01-B18B4AFE53F8"}
 */
function printsomething(){
	application.output('The modal has been destroyed..')
}