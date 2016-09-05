/**
 * Returns a random number between min (inclusive) and max (exclusive)
 * @param min
 * @param max
 *
 * @properties={typeid:24,uuid:"52EFF1B1-FB4B-40F2-AF68-9A72A4FE6463"}
 */
function getRandomArbitrary(min, max) {
	return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 *
 * @param min
 * @param max
 *
 * @properties={typeid:24,uuid:"094D9C3B-37BB-4B71-AF73-D45600F25C60"}
 */
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @properties={typeid:24,uuid:"CC5BCB9C-50D2-4BC6-BA46-89E6AEA20E84"}
 */
function generatePersonData() {
	var persons = datasources.db.sample_data.persons.getFoundSet();
	persons.loadAllRecords();
	persons.deleteAllRecords();
	if (persons.getSize() == 0) {
		//

		function Start() { }

		//generate some fake records;
		for (var i = 0; i < 20; i++) {
			persons.newRecord()
			var r = persons.getSelectedRecord();
			r.city = randomCity();
			r.country = randomCountry();
			r.name = randomName() + ' ' + randomName();
			r.zip = Number(Math.random() * 9999).toFixed(0);

		}
		databaseManager.saveData(persons);

	}
}

/**
 * @properties={typeid:24,uuid:"55923713-B5E7-4024-849F-54328DF9F29E"}
 */
function randomName() {
	//create syllables
	var firstNameSyllables = ['ja','bo','an','ca','la','li','pan','fin'];	

	//Creates a first name with 2-3 syllables
	var firstName = "";
	var numberOfSyllablesInFirstName = getRandomInt(2, 4);
	for (var i = 0; i < numberOfSyllablesInFirstName; i++) {
		firstName += firstNameSyllables[getRandomInt(0, firstNameSyllables.length - 1)];
	}
	var firstNameLetter = "";
	firstNameLetter = firstName.substr(0, 1);
	firstName = firstName.slice(1, firstName.length - 1);
	firstNameLetter = firstNameLetter.toUpperCase();
	firstName = firstNameLetter + firstName;
	return firstName;
}

/**
 * @properties={typeid:24,uuid:"43C726EB-884E-49FC-9644-46DF3262C5B8"}
 */
function randomCity() {
	var cities = ['Boston', 'Chicago', 'Minnesota', 'New York']
	return cities[getRandomInt(0, cities.length - 1)]
}

/**
 * @properties={typeid:24,uuid:"07F8F5CE-E8EC-40D6-99CA-7DDE17435763"}
 */
function randomCountry() {
	var country = ['USA', 'China', 'Germany', 'France', 'Netherlands']
	return country[getRandomInt(0, country.length - 1)]

}


/**
 * @properties={typeid:24,uuid:"74C8B4C2-A793-4D51-821D-2CD9D522F10B"}
 */
function generateTreeData(){
	var treeNodes = datasources.db.sample_data.tree_nodes.getFoundSet();
	treeNodes.loadAllRecords();
	treeNodes.deleteAllRecords();
	if (treeNodes.getSize() == 0) {
		treeNodes.newRecord();
		//create level 0
		var level0 = treeNodes.getSelectedRecord();
		level0.level_id = 0;
		level0.title_text = 'LEVEL-0'
		level0.display_text = 'You are on level 0'
		
		//create level 1
		treeNodes.newRecord();
		var level1 = treeNodes.getSelectedRecord();
		level1.level_id = level0.id;
		level1.title_text = 'LEVEL-1-A';
		level1.display_text = 'You are now nested into level 1'
			
		treeNodes.newRecord();
		level1 = treeNodes.getSelectedRecord();
		level1.level_id = level0.id;
		level1.title_text = 'LEVEL-1-B';
		level1.display_text = 'You are now nested into level 1'
		
		//create level 2
		treeNodes.newRecord();
		var level2 = treeNodes.getSelectedRecord();
		level2.level_id = level1.id;
		level2.title_text = 'LEVEL-2';
		level2.display_text = 'You are now nested into level 2'
		
		databaseManager.saveData(treeNodes);
	}
}