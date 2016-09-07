/**
 * @properties={typeid:24,uuid:"226D8A3B-78C1-4D5D-8A4B-69D44DCFFD71"}
 */
function callback(fileArr) {
		plugins.file.streamFilesToServer(fileArr)
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"AD5E43EB-35AE-42C0-92C2-9E37FEE3B81F"}
 */
function onAction$uploadFiles(event) {
	plugins.file.showFileOpenDialog(null, null, false, null, callback, 'Select some nice files');

	//	When handling big files please look at the admin page properties: "servoy.ng_web_client.tempfile.threshold" and "servoy.ng_web_client.temp.uploadir", so that big files are mapped to temp files and saved to a good temp dir
	//	so that in the callback method you can try to rename the temp generated file to something on the filesystem with a specific name. This way there is no need to stream anything again on the server side
	//	(or access the bytes which will load the big file completely in memory)
}

