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
	plugins.file.showFileOpenDialog(1, null, true, null, uploadCallBack)
}

/**
 * Callback for upload
 * @param {Array<plugins.file.JSFile>} fileArr
 * @properties={typeid:24,uuid:"A58F37C8-594F-4D76-9263-1C6E146FED44"}
 */
function uploadCallBack(fileArr) {
	plugins.file.streamFilesToServer(fileArr, streamCallback);
}

/**
 * Callback function after saving file to disk
 * @param {plugins.file.JSFile} i
 * @properties={typeid:24,uuid:"6FBCC9E0-981F-4D7A-AF1B-42C764B0131D"}
 */
function streamCallback(i) {
	//after saving file from disk, get data bytesfor storage in db
	var fileBytes = i.getBytes();
	var byteArr = []	
	for (var j = 0; j < fileBytes.length; j++) {
		byteArr.push(fileBytes[j]);
	}
	
	//convert byte array to string
	var blobStr = plugins.serialize.toJSON(byteArr);

	var fs = datasources.db.sample_data.files.getFoundSet();
	//save file into database table in data.
	fs.newRecord();
	fs.data = blobStr;
	fs.name = i.getName();
	databaseManager.saveData(fs);
	
}
