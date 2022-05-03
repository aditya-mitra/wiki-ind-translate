import { Anchor, Text, Header, Divider, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { clientRoutes } from "../utils/client-routes";

export function NavHeader() {
	return (
		<Header height={70} p="md">
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
				<Divider orientation={"vertical"} />
				<Anchor component={Link} to={clientRoutes.createNew}>
					Create New
				</Anchor>
				<Divider orientation={"vertical"} />
				<Anchor component={Link} to={clientRoutes.allProjects}>
					All Projects
				</Anchor>
			</Group>
		</Header>
	);
}
