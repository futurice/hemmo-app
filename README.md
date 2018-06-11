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

- Get the hemmo **gradle.properties** and **keystore** files from the Spice Program Google Drive (**Chilicorn Fund/keys/hemmo**).
- Follow [these steps](https://facebook.github.io/react-native/docs/signed-apk-android.html)
- Copy gradle.properties.example to ~/.gradle/gradle.properties (or manually merge if it already exists)
- Place the keystore in PelaryHemmo/android/app/hemmo-release-key.keystore
- Run `npm run bundle:android` and signed `hemmo.apk` will be available in repo root

**iOS:**

- Use the Futurice Oy/Ltd iOS distribution certificates/key when building.
- If the certificate has expired, a new one can be generated using the key found in Confluence (under **Apple Developer**)!
- Follow [these steps](https://facebook.github.io/react-native/docs/running-on-device-ios.html#building-your-app-for-production)
