import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider, AppShell, Footer } from "@mantine/core";

import { Home } from "./pages/home";
import { clientRoutes } from "./utils/client-routes";
import { AllProjects } from "./pages/all-projects";
import { NavHeader } from "./components/heading";
import { CreateNewProject } from "./pages/create-new";
import { IndivProject } from "./pages/indiv-project";
import { NotFound } from "./pages/not-found";

export function App() {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: "light",
				fontFamily: "Greycliff CF, sans-serif",
			}}
		>
			<BrowserRouter>
				<AppShell
					styles={(theme) => ({
						main: {
							background:
								theme.colorScheme === "dark"
									? theme.colors.dark[8]
									: theme.colors.gray[0],
						},
					})}
					fixed
					footer={
						<Footer height={60} p="md">
							Application footer
						</Footer>
					}
					header={<NavHeader />}
				>
					<Routes>
						<Route path={clientRoutes.home} element={<Home />} />
						<Route
							path={clientRoutes.allProjects}
							element={<AllProjects />}
						/>
						<Route
							path={clientRoutes.createNew}
							element={<CreateNewProject />}
						/>
						<Route
							path={clientRoutes.indivProject + "/:projectId"}
							element={<IndivProject />}
						/>
						<Route path="*" element={<NotFound />} />
					</Routes>
				</AppShell>
			</BrowserRouter>
		</MantineProvider>
	);
}
