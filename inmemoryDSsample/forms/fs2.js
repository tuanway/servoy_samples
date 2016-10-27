/**
 * Load a specific record within in memory ds
 * @param {Number} pk
 * @properties={typeid:24,uuid:"08F1D194-69C2-4902-9BDB-A10981E7FA8A"}
 * @AllowToRunInFind
 */
function loadRecord(pk) {
	foundset.loadRecords(pk)
	foundset.find()
	foundset['id'] = pk
	foundset.search();
}


/**
 * Get Col names from a foundset
 * @param {JSFoundSet} fs
 * @properties={typeid:24,uuid:"719686B9-64D0-4DD6-A40C-D77B8783304C"}
 */
function getCols(fs) {
	var cols = databaseManager.getTable(fs.getDataSource()).getColumnNames()
	/** @type {Array<String>} */
	var colNames = [];

	for (var i in cols) {
		var col = databaseManager.getTable(fs.getDataSource()).getColumn(cols[i])
		colNames.push(col.getSQLName())
	}
	return colNames;
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"732C85FA-E97A-4088-B535-3B80B3587A95"}
 */
function onAction$save(event) {
	//get all column names from table
	/** @type {Array<String>} */
	var colNames = getCols(datasources.db.sample_data.persons.getFoundSet())
	//get the selected record in the in memory datasource
	var rec = foundset.getSelectedRecord();
	
	//send record to actual datasource
	var fs = datasources.db.sample_data.persons.getFoundSet();
	fs.loadRecords(rec['id']);
	var urec = fs.getSelectedRecord();
	//update all columns with changes.
	for (var i = 0; i < colNames.length; i++) {
		urec[colNames[i]] = rec[colNames[i]]
	}

	databaseManager.saveData(urec)
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0644C212-9016-4EB4-BB6D-93D3B3C5C032"}
 */
function onShow(firstShow, event) {
	foundset.sort('id')
}
