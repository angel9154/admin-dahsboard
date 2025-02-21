import { GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { GraphQLClient } from "@refinedev/nestjs-query";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import { Authenticated } from "@refinedev/core";
import { dataProvider, liveProvider, authProvider } from "./providers";
import { Home, ForgotPassword, Login, Register,  } from "./pages"
import  Layout  from "./components/layout"
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Route, Routes, Outlet } from "react-router";
import { resources } from "./config/resources";



const API_URL = "https://api.nestjs-query.refine.dev/graphql";
const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";

const gqlClient = new GraphQLClient(API_URL);
const wsClient = createClient({ url: WS_URL });

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
       
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "GjTjMk-Or1H1u-oKy8Ab",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  
                  
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route
                  element={
                  <Authenticated
                  key="authenticated-layout"
                  fallback={<CatchAllNavigate to="/login" />}
                  >
                    
                      
                     <Layout>
                          <Outlet />
                     </Layout>
                      </Authenticated> 
                      }>
                      <Route index element={<Home />} />
                    </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
