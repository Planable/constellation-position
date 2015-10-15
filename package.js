Package.describe({
  name: 'constellation:position',
  version: '0.3.4',
  summary: 'Positioning plugin for Constellation',
  git: 'https://github.com/JackAdams/constellation-position.git',
  documentation: 'README.md',
  debugOnly: true
});

Package.onUse(function(api) {
  api.versionsFrom('1.1');

  api.use(['templating','blaze','tracker','underscore','reactive-dict'], 'client');
  api.use('constellation:console@1.2.3', 'client');

  api.addFiles('position-client.css','client');
  api.addFiles('position-client.html','client');
  api.addFiles('position-client.js','client');
  
  api.imply('constellation:console');
});

Package.onTest(function(api) {
  api.use('tinytest');
});
