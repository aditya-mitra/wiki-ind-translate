import {
	Anchor,
	Text,
	Header,
	Divider,
	Group,
	Button,
	useMantineColorScheme,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { clientRoutes } from "../utils/client-routes";

export function NavHeader() {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	return (
		<Header height={70} p="md">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "flex-start",
				}}
			>
				<Group>
					<Text
						component={Link}
						to={clientRoutes.home}
						align="center"
						variant="gradient"
						gradient={{ from: "indigo", to: "cyan", deg: 45 }}
						size="xl"
						weight={700}
						style={{ fontFamily: "Greycliff CF, sans-serif" }}
					>
						Wiki Indic Translations
					</Text>
					<Anchor component={Link} to={clientRoutes.createNew}>
						Create New
					</Anchor>
					<Anchor component={Link} to={clientRoutes.allProjects}>
						All Projects
					</Anchor>
				</Group>
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "flex-start",
					}}
				>
					<Button onClick={() => toggleColorScheme()}>
						Change to {colorScheme === "dark" ? "light" : "dark"}{" "}
						mode
					</Button>
				</div>
			</div>
		</Header>
	);
}
