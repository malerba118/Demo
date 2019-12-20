const SideBar = ({teams}) => (
  <div>
    Selected Teams
    <ul>
      {teams.map(team => (
        <li key={team.id}>{team.name}</li>
      ))}
    </ul>
  </div>
);

export default SideBar