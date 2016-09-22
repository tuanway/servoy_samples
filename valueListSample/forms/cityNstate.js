/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AAA97F8D-CA44-4E9B-88FA-8B9617BF2267"}
 */
var display = '';

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"418DA015-476B-4344-BE88-BB37B8B3D5B6",variableType:8}
 */
var selectedState = null;

/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"5D3FFD5D-57C0-4AD7-982C-90C3D1C98EC1",variableType:8}
 */
var selectedCity = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"B93AA594-BA1E-4F77-978E-9CE10AC338DF"}
 */
function onShow(firstShow, event) {
	scopes.sample_data_generation.generateCityNStateData();
	generateCityVL();
	generateStateVL()
}

/**
 * Generate the cities Value List dynamically
 * @properties={typeid:24,uuid:"72A12F2D-781C-4D05-B5DD-670AE95DBDE9"}
 * @AllowToRunInFind
 */
function generateCityVL() {
	//generate a dataset for the city VL
	var cityFS = datasources.db.sample_data.city.getFoundSet();
	cityFS.loadAllRecords();
	if (selectedState) {
		cityFS.find();
		cityFS.state_id = selectedState
		cityFS.search()
	}
	var q = cityFS.getQuery();
	q.result.add(q.columns.name)
	var ds = databaseManager.createEmptyDataSet();
	var res = databaseManager.getDataSetByQuery(q, -1);
	for (var i = 1; i <= res.getMaxRowIndex(); i++) {
		var row = res.getRowAsArray(i);
		application.output(row)
		ds.addRow([row[1], row[0]])
	}

	application.setValueListItems('cityVL', ds, true)
}

/**
 * Generate the cities Value List dynamically
 * @properties={typeid:24,uuid:"0A451165-32A4-4307-9F98-09934069D875"}
 * @AllowToRunInFind
 */
function generateStateVL() {
	//generate a dataset for the state VL
	var stateFS = datasources.db.sample_data.states.getFoundSet();
	stateFS.loadAllRecords();

	var q = stateFS.getQuery();
	q.result.add(q.columns.name)
	var ds = databaseManager.createEmptyDataSet();
	var res = databaseManager.getDataSetByQuery(q, -1);
	for (var i = 1; i <= res.getMaxRowIndex(); i++) {
		var row = res.getRowAsArray(i);
		ds.addRow([row[1], row[0]])
	}

	application.setValueListItems('stateVL', ds, true)
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
 * @properties={typeid:24,uuid:"C39207BD-92D5-4C4B-80B9-BFFF09EC161E"}
 */
function onDataChange$state(oldValue, newValue, event) {
	selectedCity = null;
	display = '';
	generateCityVL();
	return true;
}

/**
 * Handle changed data, return false if the value should not be accepted. In NGClient you can return also a (i18n) string, instead of false, which will be shown as a tooltip.
 *
 * @param {Number} oldValue old value
 * @param {Number} newValue new value
 * @param {JSEvent} event the event that triggered the action
 *
 * @return {Boolean}
 *
 * @private
 *
 * @properties={typeid:24,uuid:"715E7576-6322-4D6A-A169-EF037D0495FF"}
 * @AllowToRunInFind
 */
function onDataChange$city(oldValue, newValue, event) {
	//if we selected a city
	if (newValue != '' && newValue) {
		//show some information:
		var cityFS = datasources.db.sample_data.city.getFoundSet();
		if (!cityFS.find()) throw 'find failed';
		cityFS.id = newValue
		cityFS.search();

		//if state not selected - select it.
		if (!selectedState) {
			selectedState = cityFS.getSelectedRecord().state_id;
			generateCityVL();
		}
		var msg = '<div class="htmlblock"> <h1>' + application.getValueListDisplayValue('cityVL', selectedCity) + '</h1>'
		msg += '<h5>(' + application.getValueListDisplayValue('stateVL', selectedState) + ')</h5>'
		msg += '<p> The population is ' + utils.numberFormat(cityFS.getSelectedRecord().population, '#,###') + '</p> </div>'
		display = msg;
	} else {
		display = '';
	}
	return true
}
