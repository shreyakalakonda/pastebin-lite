export function getNowMs(headers?: Headers) {
  if (process.env.TEST_MODE === "1" && headers) {
    const testNow = headers.get("x-test-now-ms");
    if (testNow) {
      const parsed = Number(testNow);
      if (!Number.isNaN(parsed)) {
        return parsed;
      }
    }
  }

  return Date.now();
}
