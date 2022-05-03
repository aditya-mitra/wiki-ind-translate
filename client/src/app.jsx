import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider, AppShell, Header, Footer } from "@mantine/core";

import { Home } from "./pages/home";
import { clientRoutes } from "./utils/client-routes";
import { AllProjects } from "./pages/all-projects";
import { Heading } from "./components/heading";
import { CreateNewProject } from "./pages/create-new";

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
					header={
						<Header height={70} p="md">
							<Heading />
						</Header>
					}
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
					</Routes>
				</AppShell>
			</BrowserRouter>
		</MantineProvider>
	);
}
