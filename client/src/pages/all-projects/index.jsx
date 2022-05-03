import { Text, Paper, Stack, Button, Grid, Center } from "@mantine/core";
import { Link } from "react-router-dom";
import { clientRoutes } from "../../utils/client-routes";

export function AllProjects() {
	const projects = ["a", "b", "c"];

	return (
		<>
			<Stack
				sx={(theme) => ({
					backgroundColor:
						theme.colorScheme === "dark"
							? theme.colors.dark[8]
							: theme.colors.gray[0],
					height: 300,
				})}
			>
				{projects.map(() => (
					<Paper shadow="md" radius="md" p="md" withBorder>
						<Grid columns={8}>
							<Grid.Col span={3}>
								<Center>
									<Text weight={700}>Amazon</Text>
								</Center>
							</Grid.Col>
							<Grid.Col span={1}>
								<Center>
									<Text>
										<em>Bengali</em>
									</Text>
								</Center>
							</Grid.Col>
							<Grid.Col span={4}>
								<Center>
									<Button
										variant={"subtle"}
										component={Link}
										to={clientRoutes.indivProject + "/"}
									>
										Open Page
									</Button>
								</Center>
							</Grid.Col>
						</Grid>
					</Paper>
				))}
			</Stack>
		</>
	);
}
