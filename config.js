const config = {
    url: 'http://api.openweathermap.org/data/2.5/weather',
    appid: 'bcd93fb6abe3ef66ee4031ea91d7f6a4', // Change Api Key
    server: 'http://192.168.0.117:8080/weather-api-server/', // replace the host/port with IP and configured port
    firebaseConfig: {
        apiKey: "sample-key",
        authDomain: "sample-domain",
        databaseURL: "sample-url",
        projectId: "sample-id",
        storageBucket: "sample-bucket",
        messagingSenderId: "sample-id",
        appId: "sample-id"        
    }
};

export default config;
