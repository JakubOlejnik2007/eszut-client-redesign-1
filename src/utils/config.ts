const config = {
    backend: "http://localhost:5100"
}

export const msalConfig = {
    auth: {
        clientId: 'e4c482a1-9923-4462-bf05-b70d64942c19',
        authority: 'https://login.microsoftonline.com/84867874-5f7d-4b12-b070-d6cea5a3265e',
        redirectUri: 'http://localhost:5173',
    },
};

export default config;