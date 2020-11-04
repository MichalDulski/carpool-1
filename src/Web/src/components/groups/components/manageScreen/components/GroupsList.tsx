import React from "react";
import ButtonCheckBox from "../../../../ui/_oldButton/ButtonCheckBox";
import { ButtonSize } from "../../../../ui/_oldButton/enums/ButtonSize";
import { ButtonType } from "../../../../ui/_oldButton/enums/ButtonType";
import { ButtonShape } from "../../../../ui/_oldButton/enums/ButtonShape";
import { IGroup } from "../../../interfaces/IGroup";

interface IGroupsListProps {
	getGroupsCallback: () => IGroup[];
	setGroupChecked: (id: string, checked: boolean) => void;
}

const GroupsList = (props: IGroupsListProps) => {
	const listCssClass: string = "groupList__list";

	return (
		<ul className={listCssClass}>
			{props.getGroupsCallback().map((group) => {
				return (
					<li key={group.name}>
						<ButtonCheckBox
							size={ButtonSize.Standard}
							type={ButtonType.Standard}
							shape={ButtonShape.Circle}
							label={group.name}
							active={group.selected}
							onClick={(newValue) => props.setGroupChecked(group.id, newValue)}
						></ButtonCheckBox>
					</li>
				);
			})}
		</ul>
	);
};

export default GroupsList;
