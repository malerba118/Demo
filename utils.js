export const timeout = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const range = (n) => [...Array(n).keys()];
 