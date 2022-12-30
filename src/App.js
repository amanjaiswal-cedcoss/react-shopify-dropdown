import React from "react";
import "@shopify/polaris/build/esm/styles.css";
import "./App.css";
import FetchDropdown from "./features/fetchdropdown/FetchDropdown";
import { AppProvider } from "@shopify/polaris";

function App() {
  return (
    <div className="App">
      <AppProvider>
        <FetchDropdown />
      </AppProvider>
    </div>
  );
}

export default App;
