const config = {
    url: 'http://api.openweathermap.org/data/2.5/weather',
    appid: 'bcd93fb6abe3ef66ee4031ea91d7f6a4', // Change Api Key
    server: 'http://192.168.0.117:8080/weather-api-server/', // replace the host/port with IP and configured port
    firebaseConfig: {
        apiKey: "AIzaSyC1AyXlnamQhGZC3E1aJ1lxL82NKkoV3CI",
        authDomain: "smart-weather-app.firebaseapp.com",
        databaseURL: "https://smart-weather-app.firebaseio.com",
        projectId: "smart-weather-app",
        storageBucket: "smart-weather-app.appspot.com",
        messagingSenderId: "816042327899",
        appId: "1:816042327899:web:728791e8dbcce8bd52e47e"        
    }
};

export default config;
