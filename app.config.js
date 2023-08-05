import 'dotenv/config';


export default
{
  "expo": {
    "name": "Sabor Universitario",
    "slug": "sabor-universitario",
    "owner": "alessandrozimple",
    "version": "1.0.2",
    "orientation": "portrait",
    "icon": "./assets/images/LogoApp.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/images/splashscreen.png",
      "resizeMode": "cover",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    android: {
      package: 'com.uteq.saboruniversitario', // Agrega aquí el identificador del paquete
      versionCode: 2,
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      measurementId: process.env.MEASUREMENT_ID,
      "eas": {
        "projectId": "09f13b09-cbf1-4c73-83a9-73ecd6231e39"
      }
    }
  }
}
