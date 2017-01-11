cd "$(dirname $0)"
set -e

echo 'Cleaning previous build...'
rm hemmo.apk > /dev/null 2>&1 || true

(cd android &&
    ./gradlew clean &&

    echo 'Building...' &&
    ./gradlew assembleRelease
)

(cp android/app/build/outputs/apk/app-release.apk hemmo.apk &&
    echo -e '\nSuccess! You can find the built APK in "hemmo.apk"\n'
) ||
(echo -e '\nERROR!\nUnable to find generated app-release.apk! Most likely app signing failed, check keystore setup in README.md\n' &&
    exit 1
)
