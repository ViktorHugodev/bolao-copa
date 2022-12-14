import { NativeBaseProvider, StatusBar } from "native-base";
import { Roboto_400Regular, Roboto_500Medium, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { Loading } from './src/components/Loading';
import { THEME } from './src/styles/THEME';
import { AuthContextProvider } from './src/context/AuthContext';
import { Routes } from './src/routes';
import { SignIn } from './src/screens/SignIn';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular, Roboto_700Bold, Roboto_500Medium
  })

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>


        <StatusBar
          barStyle='light-content'
          backgroundColor='transparent'
          translucent
        />
        {
          fontsLoaded ?
            <Routes />
            :
            <Loading />
        }
      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

