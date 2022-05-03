import {
	Text,
	Paper,
	Stack,
	Button,
	Grid,
	Center,
	List,
	Badge,
	Group,
	createStyles,
} from "@mantine/core";
import useAxios from "axios-hooks";
import { Link } from "react-router-dom";

import { clientRoutes } from "../../utils/client-routes";
import { BarLoader } from "../../components/loader";
import { showErrorNotification } from "../../utils/show-notification";
import { languageSelections } from "../../utils/language-choices";

const useStyles = createStyles((theme) => ({
	centerItem: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
}));

export function AllProjects() {
	const { classes } = useStyles();
	const [{ data: projects, loading, error }] = useAxios("/projects");

	if (loading || error) {
		if (error) {
			showErrorNotification(error);
		}
		return <BarLoader />;
	}

	return (
		<Stack
			sx={(theme) => ({
				backgroundColor:
					theme.colorScheme === "dark"
						? theme.colors.dark[8]
						: theme.colors.gray[0],
				height: 300,
			})}
		>
			{Array.isArray(projects) &&
				projects.map(({ id, wiki_title, target_lang }) => (
					<Paper shadow="md" radius="md" p="md" withBorder key={id}>
						<Grid columns={8}>
							<Grid.Col span={3} className={classes.centerItem}>
								<Text weight={700} size={"xl"}>
									{wiki_title}
								</Text>
							</Grid.Col>
							<Grid.Col span={1} className={classes.centerItem}>
								<Badge
									size={"lg"}
									fullWidth
									leftSection={
										<Text>
											{languageSelections[target_lang]}
										</Text>
									}
								>
									{target_lang}
								</Badge>
							</Grid.Col>
							<Grid.Col span={4} className={classes.centerItem}>
								<Button
									variant={"subtle"}
									component={Link}
									to={clientRoutes.indivProject + "/" + id}
									size={"lg"}
								>
									Open Page
								</Button>
							</Grid.Col>
						</Grid>
					</Paper>
				))}
		</Stack>
	);
}
