import { Loader } from "@mantine/core";

export function BarLoader() {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<Loader variant="bars" size={100} />;
		</div>
	);
}
