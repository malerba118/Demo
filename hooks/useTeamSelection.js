import useStateApi from './useStateApi'
// import createStore from './createStore'

const teamSelectionApi = ({state, setState}) => {
  const addTeam = (team) => {
    setState(prev => [...prev, team]);
  };

  const removeTeam = (team) => {
    setState(prev => prev.filter(otherTeam => otherTeam.id !== team.id));
  };

  const isSelected = (team) => {
    return state.some(otherTeam => otherTeam.id === team.id)
  }

  return {
    addTeam,
    removeTeam,
    isSelected,
    selectedTeams: state
  }
}

const useTeamSelection = () => useStateApi(teamSelectionApi, [])

// If we wanted team selection to be global state we could create a store instead
// const [TeamSelectionProvider, useTeamSelection] = createStore(teamSelectionApi, []);

export default useTeamSelection