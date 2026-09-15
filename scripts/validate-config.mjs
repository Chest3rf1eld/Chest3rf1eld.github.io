const isCi = process.env.CI === 'true';
const isProduction = process.env.NODE_ENV === 'production' || isCi;
const gaId = process.env.VITE_GA_MEASUREMENT_ID;

if (isProduction && !gaId) {
  throw new Error('VITE_GA_MEASUREMENT_ID is required for production builds. Set GA_MEASUREMENT_ID GitHub Secret and map it to VITE_GA_MEASUREMENT_ID.');
}

if (gaId && !/^G-[A-Z0-9]+$/.test(gaId)) {
  throw new Error('VITE_GA_MEASUREMENT_ID must look like G-XXXXXXXXXX.');
}
