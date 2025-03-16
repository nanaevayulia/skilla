export const today = new Date().toISOString().slice(0, 10);
export const threeDays = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
export const week = new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
export const month = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
export const year = new Date(Date.now() - 364 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
