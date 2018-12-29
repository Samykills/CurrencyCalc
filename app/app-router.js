import React from "react";
import { Router, Scene, Stack } from "react-native-router-flux";
import {
  DefaultAppTheme,
  WebViewComponent
} from "uRnFramework-basic-components";
import { width, totalSize } from "react-native-dimension";
import Dashboard from "./views/dashboard/dashboard";
import DashboardNavbar from "./views/dashboard/dashboardNavbar";
import DrawerContent from "./appDrawer/drawerContent";
import HistoryView from "./views/history/historyView";
const AppRouter = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene
          key="dashboard"
          component={Dashboard}
          navBar={DashboardNavbar}
          initial
        />

        <Scene
          back
          component={HistoryView}
          key="historyView"
          title="Recent History"
          navigationBarStyle={{
            backgroundColor: DefaultAppTheme.primary
            // marginTop: Platform.OS === "ios" ? -20 : 0
          }}
          navBarButtonColor={DefaultAppTheme.navBarButtonsColor}
        />
      </Stack>
    </Router>
  );
};

export default AppRouter;
