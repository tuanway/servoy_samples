/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"F2BB76FB-7E95-4AAD-B1BE-A1A18F7ACC1B"}
 */
var tableFilterVar = '';

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"FE64551E-3CBC-4B33-96DD-141DF5F9180D"}
 */
var filterVar = '';


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"5D210C62-4CC7-4A6A-9B8B-816C688F16F8"}
 * @AllowToRunInFind
 */
function onAction$filter(event) {
	/** @type {JSFoundSet<db:/sample_data/persons>} */	
	var fs = forms.FilterTable.getFS();
	//start find mode
	fs.find()
	//filter on the country column using a Wildcard	matching based on any character found in filterVar.
	// use # to allow for case sensitivity in the filter
	fs.country = '#%' + filterVar +'%'
	//finally search the foundset using find params listed above.
	fs.search();

}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6E183F46-EB83-4DE4-A4D9-251F546B3B24"}
 */
function onAction$reset(event) {
	/** @type {JSFoundSet<db:/sample_data/persons>} */	
	var fs = forms.FilterTable.getFS();
	//clears any current searches on a table
	fs.clear();
	//remove the table filter
	fs.removeFoundSetFilterParam('city_filter')
	//reload all records
	fs.loadAllRecords();
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6EC8A0EF-1658-47B1-8D46-4085E0ECACF8"}
 */
function onAction$createTableFilter(event) {
	/** @type {JSFoundSet<db:/sample_data/persons>} */	
	var fs = forms.FilterTable.getFS();
	//add a table filter on a foundset.  This will remain on the foundset even if it is reloaded.
	fs.addFoundSetFilterParam('city','#LIKE',tableFilterVar,'city_filter');
	//reload all records - and our filter goes into effect
	fs.loadAllRecords();
}
