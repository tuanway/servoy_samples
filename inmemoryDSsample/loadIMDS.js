/**
 * @properties={typeid:24,uuid:"1906E892-529A-4F7D-A851-5AE91958A980"}
 */
function createIMPersons() {

	var q = datasources.db.sample_data.persons.createSelect();
	q.result.addPk().add(q.columns.city).add(q.columns.country).add(q.columns.name).add(q.columns.zip)

	databaseManager.createDataSourceByQuery('persons', q, -1);
}

/**
 * @properties={typeid:24,uuid:"801FAA80-8ADF-4236-ADB8-92D80619461E"}
 */
function createIMKingQueen() {
	//create in memory datasource from an empty dataset
	var ds = databaseManager.createEmptyDataSet(0, ['id', 'name', 'reign']);

	//get data from king query
	var q = datasources.db.sample_data.kings.createSelect();
	q.result.add(q.columns.name).add(q.columns.reign)

	var k = databaseManager.getDataSetByQuery(q, -1);
	for (var i = 1; i <= k.getMaxRowIndex(); i++) {
		var row = k.getRowAsArray(i);
		//add to our dataset
		ds.addRow([ds.getMaxRowIndex(),row[0],row[1]])
	}

	// get data from the queen query
	var q2 = datasources.db.sample_data.queens.createSelect();
	q2.result.add(q2.columns.name).add(q2.columns.ruled)

	k = databaseManager.getDataSetByQuery(q2, -1);
	for (i = 1; i <= k.getMaxRowIndex(); i++) {
		row = k.getRowAsArray(i);
		//add to our dataset
		ds.addRow([ds.getMaxRowIndex(),row[0],row[1]])
	}
		
	//finally create our in memory datasource.  (still have to include the types)
	ds.createDataSource('kingandqueen', [JSColumn.INTEGER, JSColumn.TEXT, JSColumn.TEXT]);

}
