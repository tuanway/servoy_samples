/**
 * Preview Report
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"F8D5CCC4-0271-45A2-BB46-E49567215533"}
 */
function onAction$report(event) {
	//get all possible reports within jasper ws directory
	var result = plugins.jasperPluginRMI.getReports('NONCOMPILED');
	// grab first report
	var report = result[0]
	//get foundset from a contacts table form
	var fs = forms.contacts_table.getFs()
	
	plugins.jasperPluginRMI.runReport(fs,report,null,plugins.jasperPluginRMI.OUTPUT_FORMAT.VIEW,{total:fs.getSize().toString()})
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"DC5DA62D-5D55-4FA0-A762-796774F0CCB2"}
 */
function onAction$save(event) {
	databaseManager.saveData();
}
