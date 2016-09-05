angular.module('httpservicesHttpservices', ['servoy']).factory("httpservicesHttpservices", function($services, $http) {
		var scope = $services.getServiceScope('httpservicesHttpservices');
		return {
			http: function(url, method, callback, errorCallback) {
				return $http({
					method: method,
					url: url
				}).then(function(res) {
						return JSON.stringify(res);
					}, function(err) {
						return JSON.stringify(err);
					});
			}
		}
	}).run(function($rootScope, $services) {
})