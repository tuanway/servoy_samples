/**
 * Dataset For tree component
 * @type {JSDataSet}
 * @properties={typeid:35,uuid:"D41E3E96-06BA-4CFE-9882-99E4CE767266",variableType:-4}
 */
var rootDS = null;

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"7F3A9A10-EFA3-4757-AD2D-2D59853D23EB"}
 */
function onShow(firstShow, event) {
	var fs = datasources.db.sample_data.persons.getFoundSet();
	fs.loadAllRecords();

	rootDS = databaseManager.createEmptyDataSet(0, ['id', 'pid', 'treeColumn']);

	rootDS.addRow(['Countries', 1, 'Countries']);
	var chkCountry = { }
	for (var i = 1; i <= fs.getSize(); i++) {
		var rec = fs.getRecord(i);
		if (!chkCountry[rec.country]) {
			rootDS.addRow([rec.country, 'Countries', rec.country]);			
			chkCountry[rec.country] = 1;
		}
	}

	for (var j = 1; j <= fs.getSize(); j++) {
		rec = fs.getRecord(j);
		rootDS.addRow([rec.id, rec.country, rec.name]);
	}

	elements.dbtree.setDataSet(rootDS);
	elements.dbtree.refresh(true);

}


/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"9E364432-85A3-45E6-A245-7B2C1104012A"}
 */
function onAction$getInfo(event) {
	
	var pk = elements.dbtree.getSeletedNode()
	if (pk)
		plugins.dialogs.showInfoDialog('INFO', 'you selected ' + pk)
	else {
		plugins.dialogs.showInfoDialog('INFO', 'Select a tree item to see more info')
	}	
	
}

/**
 * Remove a selected item
 * @param {JSEvent} event the event that triggered the action
 * @private
 * @properties={typeid:24,uuid:"DEE513A7-1B1D-496B-B448-47A3DAC88D00"}
 */
function onAction$removeSelection(event) {
	//get id of selection
	var pk = elements.dbtree.getSeletedNode()
	if (pk) {
		var expanded = []
		var level = elements.dbtree.getNodeLevel(pk);
		if (level > 2) {
			//if this is a child of a country element - allow the removal
			for (var i = 1; i <= rootDS.getMaxRowIndex(); i++) {
				var row = rootDS.getRowAsArray(i);
				if (elements.dbtree.isNodeExpanded(row[0])) {
					expanded.push(row[0])
				}
				if (row[0] == pk) {
					rootDS.removeRow(i);					
					recreateUI(row[1],expanded);					
				}
			}
		}
		else {
			plugins.dialogs.showInfoDialog('INFO', 'Tree level selection too low to delete. Permission Denied.')
		}
	} 
	
}

/**
 * Recreate UI after removing an item
 * @properties={typeid:24,uuid:"FF0DAA71-7451-4A81-A30A-1C64362197E0"}
 */
function recreateUI(ns,exp) {
	//get component from form and store temporarily.
	var c = solutionModel.getForm(controller.getName()).getComponent('dbtree');
	//get form 
	var f = solutionModel.getForm(controller.getName());
	//remove current component
	f.removeComponent('dbtree');
	//add component back.  This resets the dataset connected to the component.
	f.newWebComponent(c.name,'servoyextra-treeview',c.x,c.y,c.width,c.height);
	//refresh form ui
	controller.recreateUI();
	
	//add data back to the component
	elements.dbtree.setDataSet(rootDS);
	elements.dbtree.refresh(false);
	
	//expand any previously expanded items
	for (var i = 0; i < exp.length; i++) {
		elements.dbtree.expandNode(exp[i]);
	}
	
	//select previous node if possible
	elements.dbtree.setSelectedNode(ns);
}

/**
 * @properties={typeid:24,uuid:"B4E5D15F-E154-48B5-8534-28B340E17F14"}
 */
function resetData(){
	//remove and reset component
	var c = solutionModel.getForm(controller.getName()).getComponent('dbtree');
	var f = solutionModel.getForm(controller.getName());
	f.removeComponent('dbtree');
	f.newWebComponent(c.name,'servoyextra-treeview',c.x,c.y,c.width,c.height);
	controller.recreateUI();
	//get all data from foundset and add back to component.
	onShow(null, null);
}