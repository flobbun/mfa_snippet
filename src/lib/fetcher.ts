import ENV_VARS from "app/environment";

const fetcher = async ({
    url,
    method = "post",
    body,
}: {
    url: string;
    method?: "post" | "get";
    body?: unknown;
}) => {
    try {
        const res = await fetch(ENV_VARS.API_URL + url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: method === "post" ? JSON.stringify(body) : undefined,
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return await res.json();
    } catch (error) {
        if (error) {
            console.error(error);
        }
    }
};

export default fetcher;
