import DialogWithTrigger from './DialogWithTrigger'
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

const TeamRow = ({ team, isChecked, onSelect }) => {
  return (
    <ListItem>
      <ListItemText>{team.name}</ListItemText>
      <ListItemSecondaryAction>
        <DialogWithTrigger
          trigger={({ open }) => <Button onClick={open}>Team Info</Button>}
        >
          <div>This is {team.name}</div>
        </DialogWithTrigger>
        <Checkbox
          checked={isChecked}
          onChange={onSelect}
          value={team.name}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TeamRow