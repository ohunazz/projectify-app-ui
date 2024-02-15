import { useState } from "react";
import { NoDataPlaceholder, Page } from "../../components";
import { CreateTeamMemberModal } from "./CreateTeamMemberModal";
import noTeamMember from "../../../assets/illustrations/no-member.svg";

const AdminTeamMembersPage = () => {
    const [showCreateTeamMemberModal, setShowCreateTeamMemberModal] =
        useState(true);
    return (
        <Page>
            <NoDataPlaceholder
                illustrationUrl={noTeamMember}
                text="You don’t have any team members yet!"
                buttonText="Add a Team Member"
                buttonAction={() => setShowCreateTeamMemberModal(true)}
            ></NoDataPlaceholder>
            <CreateTeamMemberModal
                show={showCreateTeamMemberModal}
                closeModal={() => setShowCreateTeamMemberModal(false)}
            />
        </Page>
    );
};

export { AdminTeamMembersPage };
