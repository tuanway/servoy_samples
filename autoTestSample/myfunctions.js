/**
 * @properties={typeid:24,uuid:"F1A090BD-5811-44EC-AF70-0E0D83B631D5"}
 */
function test_thisShouldPass() {
 jsunit.assertEquals('This test should pass', true, 5 < 10);
}
 
/**
 * @properties={typeid:24,uuid:"72371516-AA50-4D9A-91E8-83C1C8A7FB3A"}
 */
function test_thisShouldFail() {
 jsunit.assertEquals('This test should fail', true, 10 < 5);
}