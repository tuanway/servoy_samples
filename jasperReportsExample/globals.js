
/**
 * Callback method for data broadcast.
 *
 * @param {String} dataSource table data source
 * @param {Number} action see SQL_ACTION_TYPES constants
 * @param {JSDataSet} pks affected primary keys
 * @param {Boolean} cached data was cached
 *
 * @properties={typeid:24,uuid:"48040F73-DCA0-4115-9270-921D10632398"}
 */
function onDataBroadcast(dataSource, action, pks, cached) {
	application.output('data changing....')
}
