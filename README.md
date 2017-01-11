PelaryHemmo app
===============

Mobile app for Pelastakaa Lapset RY `Hemmo` project.

Installing
----------

Setup according to the Pepperoni app kit
[setup instructions](https://github.com/futurice/pepperoni-app-kit/blob/master/docs/SETUP.md).

You can skip the Auth0 part.

Release build
-------------

**Android:**

- Follow [these steps](https://facebook.github.io/react-native/docs/signed-apk-android.html)
- Copy gradle.properties.example to ~/.gradle/gradle.properties and edit accordingly
- Either get the Hemmo release keystore from USB key in IT safe + pass from password safe, or generate a new one using:
```
keytool -genkey -v -keystore hemmo-release-key.keystore -alias hemmo-key-alias -keyalg RSA -keysize 2048 -validity 10000
```
- Place the keystore in PelaryHemmo/android/app/hemmo-release-key.keystore
- Run `npm run bundle:android` and signed `hemmo.apk` will be available in repo root

**iOS:**

Follow [these steps](https://facebook.github.io/react-native/docs/running-on-device-ios.html#building-your-app-for-production)
