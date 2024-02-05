import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
	faBars,
	faXmark,
	faCircle,
	faSearch,
	faLocationDot,
	faWheelchair,
	faPercent
} from "@fortawesome/free-solid-svg-icons";

library.add(fab, faBars, faXmark, faCircle, faSearch, faLocationDot, faWheelchair, faPercent);

import App from "./App.jsx";
import "./assets/styles/style.css";
import "./assets/styles/queries.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ToastContainer
			position="top-center"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={true}
			rtl={false}
			pauseOnFocusLoss={true}
			draggable={true}
			pauseOnHover={true}
			theme="light"
		/>
		<App />
	</React.StrictMode>
);
