/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"F6EEFB65-F590-495E-8937-AEB2EA13C89E"}
 */
function onAction$upload(event) {
	plugins.file.showFileOpenDialog(1, null, true, null, streamCallback)
}

/**
 * Callback function after saving file to disk
 * @param {Array<plugins.file.JSFile>} fileArr
 * @properties={typeid:24,uuid:"6FBCC9E0-981F-4D7A-AF1B-42C764B0131D"}
 */
function streamCallback(fileArr) {
	for (var i = 0; i < fileArr.length; i++) {
		//after saving file from disk, get data bytes for storage in db
		var fileBytes = fileArr[i].getBytes();
		var fs = datasources.db.sample_data.files.getFoundSet();
		//save file into database table in data.
		fs.newRecord();
		fs.data = fileBytes;
		fs.name = fileArr[i].getName();
		databaseManager.saveData(fs);	
	}
	
}
