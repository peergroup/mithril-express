System.config({
  "paths": {
    "*": "*.js",
    "mithril-express/*": "javascripts/*.js",
    "npm:*": "jspm_packages/npm/*.js",
    "github:*": "jspm_packages/github/*.js"
  }
});

System.config({
  "map": {
    "lodash": "npm:lodash@3.2.0",
    "mithril": "npm:mithril@0.1.30",
    "vanilla-pubsub": "npm:vanilla-pubsub@1.0.2",
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.0"
    },
    "npm:lodash@3.2.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

