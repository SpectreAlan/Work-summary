### 项目图片
/android/app/src/main/res/ 目录下根据mipmap-为前缀文件夹存入相应dpi的png图片
### 配置APP名称、图标和系统权限
在 /android/app/src/main/AndroidManifest.xml目录下
```javascript
android:label="App名字"
android:icon="@mipmap/ic_launcher"  //此属性为APP图标用到的图片名称
```
###  APP注册
将keytool所在路径添加到系统环境变量,默认是在  C:\Program Files\Android\Android Studio\jre\bin  下面，然后将生成的key存储到e盘根目录
```javascript
keytool -genkey -v -keystore e:/key.jks -keyalg RSA -keysize 2048 -validity 100000 -alias key
```
回车以后会让你输入对应的信息，其中密匙一定要记住，接下来到项目目录的android文件夹下创建一个名为key.properties的文件，并打开贴入以下代码：
```javascript
storePassword=创建KEY时输入的密钥库密码
keyPassword=创建KEY时输入的密钥密码    
keyAlias=key
storeFile=e:/key.jks
```
### 配置key注册

打开/android/app/build.gradle文件，在 android { 这一行前面，加入代码：
```javascript
defkeystorePropertiesFile=rootProject.file("key.properties")
defkeystoreProperties=newProperties()
keystoreProperties.load(newFileInputStream(keystorePropertiesFile))
```javascript
把如下代码：
```
buildTypes {
   release {
       signingConfig signingConfigs.debug
   }
}
```
替换成：
```javascript
signingConfigs {
   release {
       keyAlias keystoreProperties['keyAlias']
       keyPassword keystoreProperties['keyPassword']
       storeFile file(keystoreProperties['storeFile'])
       storePassword keystoreProperties['storePassword']
   }
}

buildTypes {
   release {
       signingConfig signingConfigs.release
   }
}
```
到defaultConfig中，录入APPID和版本号：
```javascript
defaultConfig {
        // APPID
       applicationId "com.example.myflutter"
       // 可运行应用的最低版本的 Android 平台，由该平台的 API 级别标识符指定
       minSdkVersion 16
       // 指定运行应用的目标 API 级别。
       // 在某些情况下，这允许应用使用在目标 API 级别中定义的清单元素或行为，
       // 而不是仅限于使用那些针对最低 API 级别定义的元素或行为。
       targetSdkVersion 27
       //内部版本号
       versionCode 1
       //对外公布的版本号
       versionName "1.0"
       testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
   }
```
### 编译生成apk文件
在项目根目录终端中输入命令：
```bash
flutter build apk
```
### 安装到手机
```
flutter install .
```
