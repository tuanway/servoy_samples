/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"0D4E08CE-315B-42C3-962A-019F7D7C1A4A"}
 */
function onAction$getFile(event) {
	//get data from currently selected record
	var r = foundset.getSelectedRecord();
	var d = plugins.serialize.fromJSON(r.data);
	
	//write file to disk
	plugins.file.writeFile(r.name,d)
}
