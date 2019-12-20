import useStateApi from './useStateApi'

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

const useTeamSelection = () => {
  return useStateApi(teamSelectionApi, [])
}

export default useTeamSelection