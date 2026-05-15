
# Transline App

apk download https://drive.google.com/file/d/16nbDfUQGFIrcXrtKuiR9qHo66OcXtoRk/view?usp=sharing

Что сделано : 
1) Вход в апп по номеру телефону и пароль

  Номер телефона - любое 10 значное число
  пароль в приложение: по этому условию
     -Минимальная длина: 8 символов 
     -Минимум 1 заглавная буква (A–Z) 
     -Минимум 1 строчная буква (a–z) 
     -Минимум 1 цифра (0–9) 
     -Минимум 1 специальный символ 
      (! @ # $ % ^ & * и т.п.)

3) Реализовал локализацию. Но покрыта не все приложение. Кнопка смены языка в главном экране, наверху справа

4) Реализовал возможность сохранения черновика формы регистрации.
При перезапуске:
Если есть незавершённый черновик — восстановить на шаге заполнения профиля.
Если нет, то экран Логина.
Черновик сохраняется, даже если полностью закрыть апп (сохранение в Asyncstorage).

5) Шаги регистрации выполнял по фигме. Некоторые моменты брал из ТЗ.

6) В экране Профиль можно редактирвоать профиль, и есть кнопка выход из аккаа


Но все равно кое какие моменты не успел, а именно
- иконку аппа
- удобство клавиатуры
- пин код
- возможны некоторые мелкие неточности на разных телефонах.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

