import { useIntegration } from '@tma.js/react-router-integration';
import {
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  initHapticFeedback,
  initNavigator, initSettingsButton, useLaunchParams,
  useMiniApp,
  usePopup,
  useThemeParams,
  useViewport
} from '@tma.js/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { type FC, useEffect, useMemo } from 'react';
import {
  Route,
  Router,
  Routes,
} from 'react-router-dom';

import { routes } from '@/navigation/routes.tsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import { showErrorDialog } from '@/common/Utils/Utils';

export const App: FC = () => {

  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  const popup = usePopup()
  const haptic = initHapticFeedback()

  const [settingsButton] = initSettingsButton()

  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries:{
          retry: false,
          refetchOnWindowFocus: false,
        },
        mutations: {
          onError: () => { 
            showErrorDialog(popup);
            haptic.notificationOccurred('error');
          }
        }
      }
    }
  );


  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  // Create new application navigator and attach it to the browser history, so it could modify
  // it and listen to its changes.
  const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
  const [location, reactNavigator] = useIntegration(navigator);

  // Don't forget to attach the navigator to allow it to control the BackButton state as well
  // as browser history.

  useEffect(() => {
    if (location.pathname != '/settings') settingsButton.show()
  }, [location])


  useEffect(() => {
    settingsButton.on('click', () => { settingsButton.hide(); reactNavigator.push('/settings')})
  }, [])

  useEffect(() => {
    navigator.attach();
    return () => navigator.detach();
  }, [navigator]);



  return (
    <QueryClientProvider client={queryClient}>
      <AppRoot
        appearance={miniApp.isDark ? 'dark' : 'light'}
        platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
      >
          <Router location={location} navigator={reactNavigator}>
            <Routes>
              {routes.map((route) => <Route key={route.path} {...route} />)}
              {/* <Route path='*' element={<Navigate to='/'/>}/> */}
            </Routes>
          </Router>
      </AppRoot>
    </QueryClientProvider>

  );
};
