# Creating a react native project

npx create-expo-app@latest
npx create-expo-app CoffeeApp

# Installing package.json dependencies

npm install

# Start the development server

npx expo start

# View web and refresh

w - start web view
r - refresh project

# Different ways to run react native project

npm run android
npm run ios
npm run web

# Remove example project initial files

npm run reset-project
rm -rf app-example

# Installing google font

npm i @expo-google-fonts/inter

# Installing react native async storage

npx expo install @react-native-async-storage/async-storage@latest

# Installing eas (expo application services) cli

npm install -g eas-cli

# Checking eas version

eas -v

# Logging into eas

eas login

# Checking currently logged in eas account

eas whoami

# Initializing an eas project

eas init

# Creating an eas build configuration file

eas build:configuration

# Creating our first build

eas build

# Checking app dependecies

npx expo install --check

# Creating an eas development build

eas build --profile development --platform android
