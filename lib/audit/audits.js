const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");

const auditNames = [
  "tti"
  // "page-weight",
  // "fps"
  // "many-instances-fps",
  // "dom-size"
];

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher
    .launch({ chromeFlags: opts.chromeFlags })
    .then(chrome => {
      opts.port = chrome.port;
      return lighthouse(url, opts, config).then(results => {
        // use results.lhr for the JS-consumeable output
        // https://github.com/GoogleChrome/lighthouse/blob/master/types/lhr.d.ts
        // use results.report for the HTML/JSON/CSV output as a string
        // use results.artifacts for the trace/screenshots/other specific case you need (rarer)
        return chrome.kill().then(() => results.lhr);
      });
    });
}

const opts = {
  chromeFlags: ["--show-paint-rects"]
};

module.exports.runAudits = async function runAudits({ port, paths, audits }) {
  const validAudits = audits.filter(a => auditNames.includes(a));
  console.log("Starting lighthouse");

  const lighthouseConfig = {
    extends: "lighthouse:default",
    settings: {
      onlyAudits: [
        "first-meaningful-paint",
        "estimated-input-latency",
        "speed-index-metric",
        "first-interactive",
        "consistently-interactive"
      ]
    }
  };

  for (path of paths) {
    const results = await launchChromeAndRunLighthouse(
      `http://localhost:${port}/${path}`,
      opts,
      lighthouseConfig
    );
    console.log(results);
  }
};
