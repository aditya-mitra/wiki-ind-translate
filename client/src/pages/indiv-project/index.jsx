import { Button, Divider, Grid, Paper, Text, Textarea } from "@mantine/core";
import { useParams } from "react-router-dom";

export function IndivProject() {
	const translations = ["a", "b"];
	const { projectId } = useParams();
	console.log("project id =", projectId);

	return (
		<Grid columns={2}>
			{translations.map(() => (
				<>
					<Grid.Col>
						<Divider variant={"dashed"} />
					</Grid.Col>
					<Grid.Col span={1}>
						<Paper shadow="xs" radius="xs" p="xs">
							<Text>
								Use it to create cards, dropdowns, modals and
								other components that require background with
								shadow
							</Text>
						</Paper>
					</Grid.Col>
					<Grid.Col span={1}>
						<Textarea
							placeholder="Enter the translation here ..."
							radius="md"
							size="md"
							required
						/>
					</Grid.Col>
					<Grid.Col span={2}>
						<Button fullWidth variant="outline">
							Add Translation
						</Button>
					</Grid.Col>
				</>
			))}
			<Grid.Col>
				<Divider variant={"dashed"} />
			</Grid.Col>
		</Grid>
	);
}
