const ENV_VARS = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
}

if (ENV_VARS.NODE_ENV === 'development' && typeof document === 'undefined') {
    Object.entries(ENV_VARS).forEach(([key, value]) => {
        if (!value) {
            console.error('\x1b[31m', `Environment variable ${key} is not defined`);
        }
    });
}

export default ENV_VARS as typeof ENV_VARS & {
    readonly [K in keyof typeof ENV_VARS]: string;
};