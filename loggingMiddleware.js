import fetch from "node-fetch";

export async function Log(stack, level, packageName, message) {
  try {
    const logData = { stack, level, package: packageName, message };

    const headers = { "Content-Type": "application/json" };
    if (process.env.LOGGING_AUTH) headers.Authorization = process.env.LOGGING_AUTH;

    const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers,
      body: JSON.stringify(logData)
    });

    const result = await response.json();
    console.log("✅ Log Response:", result);

    return result;
  } catch (err) {
    console.error("❌ Logging error:", err.message);
    return null;
  }
}

export function requestLogger(req, res, next) {
  Log("backend", "info", "route", `${req.method} ${req.url} accessed`);
  next();
}
