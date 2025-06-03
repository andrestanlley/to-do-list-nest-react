import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { Toaster } from "@/components/ui/sonner";
import updateTokenFromCookies from "./services/getTokenCookie";
import AppRouter from "./routes";
import { AppProvider } from "./context/AppContext";

updateTokenFromCookies();
createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppProvider>
			<Toaster />
			<AppRouter />
		</AppProvider>
	</StrictMode>
);
