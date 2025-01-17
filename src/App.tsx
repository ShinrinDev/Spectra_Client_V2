import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import OnboardingBot from './pages/OnBoardingBot';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Resources from './pages/Resources';
import Emails from './pages/Email';
import Unauthorized from './pages/unauthorized';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  // Define routes that should bypass DefaultLayout
  const authRoutes = ['/auth/signin', '/auth/signup', '/onboarding','/unauthorized'];

  const isAuthRoute = authRoutes.includes(pathname);

  return loading ? (
    <Loader />
  ) : (
    <>
      {isAuthRoute ? (
        // Render without DefaultLayout
        <Routes>
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<OnboardingBot />} />
          <Route path="/unauthorized" element={<Unauthorized />}/>
        </Routes>
      ) : (
        // Render with DefaultLayout
        <DefaultLayout>
          <Routes>
            <Route
              index
              element={
                <>
                  <PageTitle title="Spectra Client | Analytics" />
                  <ECommerce />
                </>
              }
            />
            <Route
              path="/calendar"
              element={
                <>
                  <PageTitle title="Spectra Client | Calendar" />
                  <Calendar />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <PageTitle title="Spectra Client | Profile" />
                  <Profile />
                </>
              }
            />
           
            <Route
              path="/forms/form-elements"
              element={
                <>
                  <PageTitle title="Form Elements" />
                  <FormElements />
                </>
              }
            />
            <Route
              path="/forms/form-layout"
              element={
                <>
                  <PageTitle title="Form Layout" />
                  <FormLayout />
                </>
              }
            />
            <Route
              path="/tables"
              element={
                <>
                  <PageTitle title="Spectra Client | Tables" />
                  <Tables />
                </>
              }
            />
            <Route
              path="/resources"
              element={
                <>
                  <PageTitle title="Spectra Client | Resources" />
                  <Resources />
                </>
              }
            />

            <Route
              path="/emails"
              element={
                <>
                  <PageTitle title="Spectra Client | Interested Leads" />
                  <Emails />
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <PageTitle title="Spectra Client | Settings" />
                  <Settings />
                </>
              }
            />
            <Route
              path="/chart"
              element={
                <>
                  <PageTitle title="Basic Chart" />
                  <Chart />
                </>
              }
            />
            <Route
              path="/ui/alerts"
              element={
                <>
                  <PageTitle title="Alerts" />
                  <Alerts />
                </>
              }
            />
            <Route
              path="/ui/buttons"
              element={
                <>
                  <PageTitle title="Buttons" />
                  <Buttons />
                </>
              }
            />
          </Routes>
        </DefaultLayout>
      )}
    </>
  );
}

export default App;
