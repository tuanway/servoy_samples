/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"D1CFE568-EE9E-49AD-AC0D-3ACC831127A5"}
 */
var display_text = '';

/**
 * @properties={typeid:24,uuid:"3ba5493a-2e04-4e5d-af35-493fff1c7048"}
 */
function initTreeView() {
		scopes.sample_data_generation.generateTreeData()
		var fs = datasources.db.sample_data.tree_nodes.getFoundSet();		

		var ds = fs.getDataSource();
		
		//add datasource to dbtree
		elements.dbtree.addRoots(ds);
		
		//setup level relationship
		elements.dbtree.setNRelationName(ds, 'tree_nodes_to_tree_nodes$level_id');

		//set the name of dataprovider to use for text display on a node
		elements.dbtree.setTextDataprovider(ds, 'title_text');

		//set the method to call and dataprovider value to pass when node clicked
		elements.dbtree.setCallBackInfo(ds, node_selected,'id');
		
		//expand levels 1-3 of tree
		var pathAr = new Array(1, 2, 3);

		elements.dbtree.setExpandNode(pathAr, true);
		elements.dbtree.setSelectionPath(pathAr);
		
		refreshTreeView();
	}

/**
 * @AllowToRunInFind
 *
 *
 * @properties={typeid:24,uuid:"905DEE44-EAE1-4F64-8D9F-4971F3125E6E"}
 */
function node_selected(idx) {
	var fs = datasources.db.sample_data.tree_nodes.getFoundSet();
	//search for the row we have been passed in the dbtreeview
	fs.find()
	fs.id = idx;
	fs.search();
	display_text = fs.getSelectedRecord().display_text;
}

/**
 * Load root nodes
 * @properties={typeid:24,uuid:"04fa66e3-2a71-415d-b02e-8aa8b9d019fe"}
 * @AllowToRunInFind
 */
function refreshTreeView() {
	var fs = datasources.db.sample_data.tree_nodes.getFoundSet();
	fs.loadAllRecords();

	//search the root node(s)

	fs.find();
	fs.level_id = 0;
	fs.search();

	//set the root node(s) and set the name of dataprovider to use for text display on a node
	elements.dbtree.addRoots(fs);
}
