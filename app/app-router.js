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
const AppRouter = () => {
  return (
    <Router>
      <Lightbox>
        <Modal hideNavBar>
          <Stack key="root">
            <Drawer
              hideNavBar
              key="drawer"
              contentComponent={DrawerContent}
              drawerWidth={width(83.9)}
            >
              <Scene
                key="dashboard"
                component={Dashboard}
                navBar={DashboardNavbar}
                title="DashBoard"
                initial
              />
            </Drawer>
          </Stack>
        </Modal>
      </Lightbox>
    </Router>
  );
};

export default AppRouter;
