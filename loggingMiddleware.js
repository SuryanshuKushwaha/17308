const _fetch = (function () {
  if (typeof globalThis.fetch === 'function') return globalThis.fetch;
  try {
    const nf = require('node-fetch');
    return nf;
  } catch (e) {
    return undefined;
  }
})();

async function Log(stack, level, packageName, message) {
  try {
    const logData = {
      stack,
      level,
      package: packageName,
      message
    };

    if (typeof _fetch !== 'function') {
      throw new Error("fetch is not available. Install 'node-fetch' or run on Node 18+ where fetch is global.");
    }

    const response = await _fetch('http://20.244.56.144/evaluation-service/logs', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(logData)
    });

    const result = await response.json();
    console.log("✅ Response:", result);

    return result;
  } catch (err) {
    console.error("❌ Logging error:", err.message);
    return null;
  }
}

module.exports = { Log };

if (require.main === module) {
  (async () => {
    await Log('backend', 'error', 'handler', 'received string, expected bool');
    await Log('backend', 'fatal', 'db', 'Critical database connection failure.');
  })();
}
