import { useEffect, useState } from "react";
import api from "../services/api";
import { useDialog } from "../hooks";
import Dialog from "@material-ui/core/Dialog";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";

const Home = props => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedTeams, setSelectedTeams] = useState([]);

  // Fetch data, set state
  useEffect(() => {
    setLoading(true);
    api.getTeams({ page }).then(res => {
      setTeams(res.data);
      setLoading(false);
    });
  }, [page]);

  // Display teams
  const TeamRow = ({ team, isChecked, handleSelect }) => {
    return (
      <li key={team.name}>
        {team.name}
        <DialogWithTrigger
          trigger={dialog => <Button onClick={dialog.open}>Team Info</Button>}
        >
          <div>This is {team.name}</div>
        </DialogWithTrigger>
        <Checkbox
          checked={isChecked}
          onChange={() => handleSelect(!isChecked)}
          value={team.name}
        />
      </li>
    );
  };

  // Add / Remove Team
  const addTeam = (teamId, teamName) => {
    setSelectedTeams([...selectedTeams, { id: teamId, name: teamName }]);
  };

  const removeTeam = teamId => {
    const newTeamList = selectedTeams.filter(team => team.id !== teamId);
    setSelectedTeams(newTeamList);
  };

  // Modal
  const DialogWithTrigger = ({ trigger, children }) => {
    const dialog = useDialog(false);
    return (
      <>
        {trigger(dialog)}
        <Dialog open={dialog.isOpen} onClose={dialog.close}>
          {children}
        </Dialog>
      </>
    );
  };

  // Selected Teams Sidebar
  const SideBar = () => (
    <div>
      Selected Teams
      <ul>
        {selectedTeams.map(team => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h1>Team Selection</h1>
      <div style={{ display: "flex" }}>
        <div style={sidebarStyles}>
          <SideBar />
        </div>
        <div style={teamListStyles}>
          {loading && <p>loading...</p>}
          {!loading && (
            <ul>
              {teams.map(team => (
                <TeamRow
                  team={team}
                  isChecked={selectedTeams.find(
                    selectTeam => selectTeam.id === team.id
                  )}
                  handleSelect={isSelected =>
                    isSelected
                      ? addTeam(team.id, team.name)
                      : removeTeam(team.id)
                  }
                />
              ))}
            </ul>
          )}
          <div style={pageButtonStyles}>
            <Button onClick={() => setPage(p => p - 1)}>Prev Page</Button>
            <Button onClick={() => setPage(p => p + 1)}>Next Page</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const sidebarStyles = {
  borderRight: "solid 2px gray",
  padding: "15px"
};

const teamListStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center"
};

const pageButtonStyles = {
  display: "flex",
  justifyContent: "center"
};

export default Home;
