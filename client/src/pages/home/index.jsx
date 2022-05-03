import {
	Container,
	createStyles,
	Group,
	Button,
	Title,
} from "@mantine/core";
import { Link } from "react-router-dom";
import { clientRoutes } from "../../utils/client-routes";

const BREAKPOINT = "@media (max-width: 960px)";

const useStyles = createStyles((theme) => ({
	inner: {
		position: "relative",
		paddingTop: 220,
		paddingBottom: 180,

		[BREAKPOINT]: {
			paddingBottom: 100,
			paddingTop: 90,
		},
	},

	controls: {
		marginTop: theme.spacing.xl * 1.5,

		[BREAKPOINT]: {
			marginTop: theme.spacing.xl,
		},
	},
}));

export function Home() {
	const { classes } = useStyles();

	return (
		<Container size={1100} className={classes.inner}>
			<Title>Wikipedia Indic Translations</Title>
			<Group className={classes.controls}>
				<Button
					component={Link}
					to={clientRoutes.createNew}
					size="xl"
					radius="md"
					variant="gradient"
				>
					Create New Project
				</Button>
				<Button
					component={Link}
					to={clientRoutes.allProjects}
					size="xl"
					radius="md"
					variant="gradient"
				>
					Show All Projects
				</Button>
			</Group>
		</Container>
	);
}
