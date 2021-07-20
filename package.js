Package.describe({
  name: "planable:position",
  version: "0.4.11",
  summary: "Positioning plugin for Constellation",
  git: "https://github.com/Planable/constellation-position.git",
  documentation: "README.md",
  debugOnly: true,
});

Package.onUse(function (api) {
  api.versionsFrom("2.3");

  api.use(
    [
      "templating@1.4.1",
      "blaze@2.5.0",
      "tracker",
      "underscore",
      "reactive-dict",
    ],
    "client"
  );
  api.use("planable:console@1.4.9", "client");

  api.addFiles("position-client.css", "client");
  api.addFiles("position-client.html", "client");
  api.addFiles("position-client.js", "client");

  api.imply("planable:console");
});

Package.onTest(function(api) {
  api.use('tinytest');
});
