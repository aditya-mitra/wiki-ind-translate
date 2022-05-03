import { Text } from "@mantine/core";
import { Link } from "react-router-dom";
import { clientRoutes } from "../utils/client-routes";

export function Heading() {
	return (
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
			Indigo cyan gradient
		</Text>
	);
}
