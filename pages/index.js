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

  useEffect(() => {
    setLoading(true);
    api.getTeams({ page }).then(res => {
      setTeams(res.data);
      setLoading(false);
    });
  }, [page]);

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

  const addTeam = (teamId, teamName) => {
    setSelectedTeams([...selectedTeams, { id: teamId, name: teamName }]);
  };

  const removeTeam = teamId => {
    const newTeamList = selectedTeams.filter(team => team.id !== teamId);
    setSelectedTeams(newTeamList);
  };

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
      <Button onClick={() => setPage(p => p - 1)}>Prev Page</Button>
      <Button onClick={() => setPage(p => p + 1)}>Next Page</Button>
      {loading && <div>loading...</div>}
      <div>
        {!loading && (
          <ul>
            {teams.map(team => (
              <TeamRow
                team={team}
                isChecked={selectedTeams.find(
                  selectTeam => selectTeam.id === team.id
                )}
                handleSelect={isSelected =>
                  isSelected ? addTeam(team.id, team.name) : removeTeam(team.id)
                }
              />
            ))}
          </ul>
        )}
      </div>
      <div>
        <SideBar />
      </div>
    </div>
  );
};

export default Home;
