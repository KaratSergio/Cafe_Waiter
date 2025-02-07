export const logger = (message: string) => {
    console.log(`\x1b[36m[${new Date().toISOString()}] ${message}\x1b[0m`);
};