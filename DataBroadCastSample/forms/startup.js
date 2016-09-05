/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"AA597330-9A5B-4474-A7F9-00B5DFF573C6"}
 */
var msg = '<h1> Databroadcast sample</h1> <p> Sample use case showing how data broadcast works when updating data. </p>'

/**
 * @AllowToRunInFind
 *
 * @properties={typeid:24,uuid:"DC59ED83-E38F-406E-9584-A316469E9BBA"}
 */
function run() {
	var username = plugins.dialogs.showInputDialog("Enter a username:", "Try entering 'default' to see messages for default user.");
	if (!username || username == '') {
		plugins.dialogs.showInfoDialog("Can't Execute", 'A username is required to start the solution.');
		return;
	}
	var users = datasources.db.sample_data.users.getFoundSet();

	//if default data doesn't exist - create it
	users.find();
	users.user_name = 'default';
	users.search();
	if (!users.getSelectedRecord()) {
		scopes.globals.clearData();
	}
	users.clear();

	// otherwise search for selected users
	users.find()
	users.user_name = username;
	users.search();

	//add user if they don't exist.
	if (!users.getSelectedRecord()) {
		users.newRecord()
		var usr = users.getSelectedRecord();
		usr.user_name = username;
		databaseManager.saveData(usr);
	}
	//generate sample data
	scopes.sample_data_generation.generatePersonData();

	scopes.globals.current_user = username;
	scopes.globals.current_user_id = users.user_id;
	forms.person.show();
	return;
}