function AnnyFactory($rootScope) {
  var factory = {};

  factory.init = function() {
    factory.newNetwork([2, 2, 1]);
  };

  factory.activate = function(inputs) {
    factory.network.activate(inputs);
    factory.emitChange();
  };

  factory.getRandomLayers = function() {
    var inputs = 2;
    var outputs = 1;
    var numHiddenLayers = _.random(1, 2);
    var hiddenLayers = [];

    _.times(numHiddenLayers, function() {
      hiddenLayers.push(_.random(2, 4));
    });

    return [].concat(inputs, hiddenLayers, outputs);
  };

  factory.train = function(trainingSet, callback, frequency) {
    factory.network.train(trainingSet, callback, frequency);

    var results = ['Predictions after training:'];

    _.each(trainingSet, function(sample) {
      var input = sample.input;
      var output = factory.network.activate(input);
      results.push('[' + input.toString() + '] == ' + output);
    });

    console.log(results.join('\n'));

    factory.emitChange();
  };

  factory.newNetwork = function(layers) {
    factory.network = new anny.Network(layers || factory.getRandomLayers());
    factory.emitChange();
  };

  factory.emitChange = function() {
    $rootScope.$broadcast('anny:changed');
    window.network = factory.network;
  };

  factory.init();

  return factory;
}

angular.module('anny')
  .factory('AnnyFactory', AnnyFactory);
