/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"C497A9AF-6141-4164-946A-F68F787E02EC",variableType:-4}
 */
var notification = [ ];

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D40AFA0F-A7C2-4FC8-809C-65207608C105"}
 */
var current_user = '';

/**
 * @properties={typeid:35,uuid:"FB643139-0B7B-42A4-90C5-1D7B352D8BA8",variableType:-4}
 */
var current_user_id = null;

/**
 * @properties={typeid:35,uuid:"2EC3B20B-F78F-488E-BA49-598393F334F3",variableType:-4}
 */
var current_broadcast = false;

/**
 * Callback method for data broadcast.
 *
 * @param {String} dataSource table data source
 * @param {Number} action see SQL_ACTION_TYPES constants
 * @param {JSDataSet} pks affected primary keys
 * @param {Boolean} cached data was cached
 *
 * @properties={typeid:24,uuid:"B27D3D5E-992A-4B68-B088-A773E3242AEE"}
 * @AllowToRunInFind
 */
function onDataBroadcast(dataSource, action, pks, cached) {
	application.output('data being broadcasted..');
	if (dataSource.indexOf('customer') != -1 && !current_broadcast) {
		current_broadcast = true;
		var m = plugins.dialogs.showInfoDialog('INFO', 'Customer data has been updated...');
		if (m == 'OK') {
			current_broadcast = false;
		}
	}
}

/**
 * @properties={typeid:24,uuid:"97E4FCAD-12CF-4A2D-85DF-45D1CC628CD7"}
 */
function clearData() {
	//remove all data
	var notes = datasources.db.sample_data.notifications.getFoundSet();
	notes.loadAllRecords();
	notes.deleteAllRecords();
	var users = datasources.db.sample_data.users.getFoundSet();
	users.loadAllRecords();
	users.deleteAllRecords();

	//create default user
	users.newRecord();
	users.getSelectedRecord().user_name = 'default';
	databaseManager.saveData(users);

	plugins.dialogs.showInfoDialog("INFO", 'Notifications and user data restored to default.');
}

/**
 * Record pre-update trigger.
 * Validate the record to be updated.
 * When false is returned the record will not be updated in the database.
 * When an exception is thrown the record will also not be updated in the database but it will be added to databaseManager.getFailedRecords(),
 * the thrown exception can be retrieved via record.exception.getValue().
 *
 * @param {JSRecord<db:/sample_data/persons>} record record that will be updated
 *
 * @return {Boolean}
 *
 * @properties={typeid:24,uuid:"218ABBA1-7587-4CED-823B-50F95F2D0FE5"}
 */
function onRecordUpdate$persons(record) {
	// add notification record when customer data is updated.
	var changed = record.getChangedData();
	var userFs = datasources.db.sample_data.users.getFoundSet();
	userFs.loadAllRecords();
	//for every user we have aside from current - create a new notification record
	for (var i = 1; i <= userFs.getSize(); i++) {
		var ur = userFs.getRecord(i);
		//skip if current user matches
		if (ur.user_name != current_user) {
			application.output('add notification for "'+ ur.user_name +'" user.' , LOGGINGLEVEL.INFO);
			//create a notification record based on the updated data.
			for (var j = 1; j <= changed.getMaxRowIndex(); j++) {
				var row = changed.getRowAsArray(j);
				//use the relationship between user and customer to create a linked record.
				ur.user_to_notifications$user_id.newRecord();
				var nrec = ur.user_to_notifications$user_id.getSelectedRecord();
				nrec.col_name = row[0];
				nrec.old_value = row[1];
				nrec.new_value = row[2];
				nrec.pk = record.id;
				nrec.ds = record.getDataSource();
				nrec.created_by = scopes.globals.current_user_id;
				nrec.status = 'unread'; //default status is unread
				nrec.mod_dt = new Date();
				if (!databaseManager.saveData(nrec)) {
					application.output('failed to save', LOGGINGLEVEL.ERROR);
				}
			}
		}

	}
	return true;
}
