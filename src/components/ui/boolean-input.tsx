import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface Props {
	defaultValue?: boolean;
	value?: boolean;
	onValueChange?: (value: boolean) => void;
}

const BooleanInput: React.FC<Props> = ({
	defaultValue,
	value,
	onValueChange,
}) => {
	return (
		<Select
			defaultValue={defaultValue ? String(defaultValue) : undefined}
			value={String(value)}
			onValueChange={(v) =>
				onValueChange && onValueChange(v.toLowerCase() === "true")
			}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Select an option" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{["true", "false"].map((item) => (
						<SelectItem
							className="capitalize"
							key={String(item)}
							value={String(item)}
						>
							{item}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

export default BooleanInput;
