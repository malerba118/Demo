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

  const TeamRow = ({ team, isSelected, onSelected }) => {
    const [checked, setChecked] = useState(false);
    const handleChecked = e => {
    return (
      <li key={team.name}>
        {team.name}
        <DialogWithTrigger
          trigger={dialog => <Button onClick={dialog.open}>Team Info</Button>}
        >
          <div>This is {team.name}</div>
        </DialogWithTrigger>
        <Checkbox
          checked={checked}
          onChange={handleChecked}
          value={team.name}
        />
      </li>
    );
  };

  const addTeam = teamId => {
    setSelectedTeams([...selectedTeams, teamId]);
  };

  const removeTeam = teamId => {
    const newTeamList = selectedTeams.filter(id => id !== teamId);
    setSelectedTeams(newTeamList);
  };

  const SideBar = () =>
    selectedTeams.map(team => <li key={team.id}>{team.name}</li>);

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
                onSelected={isSelected => {
                  isSelected ? addTeam(team.id) : removeTeam(team.id);
                }}
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
