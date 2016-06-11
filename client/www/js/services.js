angular.module('starter.services', [])

.service('webq', function($q, $http, $log) {

    this.getRankData = function() {
        var deferred = $q.defer();

        $http.get('', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .success(function(data) {
                $log.debug(data);
                defer.resolve(data);
            })
            .error(function(err) {
                // keep at the login page
                $log.error(err);
                defer.reject(err);
            });
        return deferred.promise;

    }

});
