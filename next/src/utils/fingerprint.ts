import FingerprintJS from "@fingerprintjs/fingerprintjs";

export default (async () => {
  if (process.browser && window !== undefined) {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    const visitorId = result.visitorId;
    return visitorId;
  }
})();
