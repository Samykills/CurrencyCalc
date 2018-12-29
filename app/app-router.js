import React from "react";
import {
  Actions,
  Router,
  Scene,
  Modal,
  Drawer,
  Stack,
  Lightbox,
  Tabs
} from "react-native-router-flux";
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
      <Lightbox>
        <Modal hideNavBar>
          <Stack key="root">
            <Scene
              key="dashboard"
              component={Dashboard}
              navBar={DashboardNavbar}
              title="DashBoard"
              initial
            />
            <Scene
              back
              key="historyView"
              component={HistoryView}
              title="Recent History"
              navigationBarStyle={{
                backgroundColor: DefaultAppTheme.primary
                // marginTop: Platform.OS === "ios" ? -20 : 0
              }}
              navBarButtonColor={DefaultAppTheme.navBarButtonsColor}
            />
          </Stack>
        </Modal>
      </Lightbox>
    </Router>
  );
};

export default AppRouter;
