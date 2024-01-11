"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.unstable_settings = void 0;
var FontAwesome_1 = require("@expo/vector-icons/FontAwesome");
var native_1 = require("@react-navigation/native");
var expo_font_1 = require("expo-font");
var expo_router_1 = require("expo-router");
var react_1 = require("react");
var react_native_1 = require("react-native");
var native_stack_1 = require("@react-navigation/native-stack");
var async_storage_1 = require("@react-native-async-storage/async-storage"); // 异步存取的三方工具
var expo_router_2 = require("expo-router");
var eva = require("@eva-design/eva");
var react_native_root_siblings_1 = require("react-native-root-siblings");
var components_1 = require("@ui-kitten/components");
var eva_icons_1 = require("@ui-kitten/eva-icons");
var expo_router_3 = require("expo-router");
// Catch any errors thrown by the Layout component.
__createBinding(exports, expo_router_3, "ErrorBoundary");
exports.unstable_settings = {
    // Ensure that reloading on `/modal` keeps a back button present.
    initialRouteName: "/onBoardingScreen"
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
expo_router_1.SplashScreen.preventAutoHideAsync();
function RootLayout() {
    var _this = this;
    var _a = expo_font_1.useFonts(__assign({ SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf") }, FontAwesome_1["default"].font)), loaded = _a[0], error = _a[1];
    var TOKEN_KEY = "authToken";
    var chooseScreen = function () { return __awaiter(_this, void 0, void 0, function () {
        var token, firstTime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, async_storage_1["default"].getItem(TOKEN_KEY)];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, async_storage_1["default"].getItem("firstTime")];
                case 2:
                    firstTime = _a.sent();
                    if (!firstTime || firstTime === "true") {
                        expo_router_2.router.replace("/onBoardingScreen");
                    }
                    else {
                        if (token && token.length > 0) {
                            getUserInfo();
                        }
                        else {
                            expo_router_2.router.replace("/onBoardingScreen");
                        }
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var getUserInfo = function () {
        // customerInfo()
        //   .then((res) => {
        //     setRoot('Tab'); // 主页
        //   })
        //   .catch(() => {
        //     setRoot('LaunchScreen'); // 登录页
        //   })
        //   .finally(() => {
        //     setAppIsReady(true);
        //   });
    };
    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    react_1.useEffect(function () {
        if (error)
            throw error;
    }, [error]);
    react_1.useEffect(function () {
        if (loaded) {
            chooseScreen();
            expo_router_1.SplashScreen.hideAsync();
        }
    }, [loaded]);
    if (!loaded) {
        return null;
    }
    return react_1["default"].createElement(RootLayoutNav, null);
}
exports["default"] = RootLayout;
// const HomeScreen = () => {
//   return (
//     <Layout
//       style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
//     ></Layout>
//   );
// };
var StackNav = native_stack_1.createNativeStackNavigator();
function RootLayoutNav() {
    var colorScheme = react_native_1.useColorScheme();
    return (react_1["default"].createElement(native_1.ThemeProvider, { value: colorScheme === "dark" ? native_1.DarkTheme : native_1.DefaultTheme },
        react_1["default"].createElement(components_1.IconRegistry, { icons: eva_icons_1.EvaIconsPack }),
        react_1["default"].createElement(components_1.ApplicationProvider, __assign({}, eva, { theme: eva.light }),
            react_1["default"].createElement(react_native_root_siblings_1.RootSiblingParent, null,
                react_1["default"].createElement(expo_router_1.Stack, null,
                    react_1["default"].createElement(expo_router_1.Stack.Screen, { name: "onBoardingScreen", options: { headerShown: false } }),
                    react_1["default"].createElement(expo_router_1.Stack.Screen, { name: "login", options: { headerShown: false } }),
                    react_1["default"].createElement(expo_router_1.Stack.Screen, { name: "signUp", options: { headerShown: false } }),
                    react_1["default"].createElement(expo_router_1.Stack.Screen, { name: "(tabs)", options: { headerShown: false } }),
                    react_1["default"].createElement(expo_router_1.Stack.Screen, { name: "modal", options: { presentation: "modal" } }))))));
}
