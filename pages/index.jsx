import { useEffect, useState, useContext } from "react";
import useAsync, { PENDING, FULFILLED } from '../hooks/useAsync'
import UserContext from "../UserContext";
import { SideBar, TeamRow, AsyncButton } from '../components'
import { useTeamSelection, usePigeonApi } from "../hooks";
import List from '@material-ui/core/List';

const Home = props => {

  // Handles api errors via snackbars
  const api = usePigeonApi()
  
  // Handles state for team selection
  const { 
    selectedTeams, 
    isSelected, 
    addTeam, 
    removeTeam 
  } = useTeamSelection()

  const [page, setPage] = useState(0);

  // Handles state through the promise lifecycle
  const [request, getTeams] = useAsync(api.getTeams)

  // Grab user info from anhywhere
  const { signedIn, userName } = useContext(UserContext);

  // Refetch data on page change
  useEffect(() => {
    getTeams({ page })
  }, [page]);

  return (
    <div style={layoutStyles}>
      <div style={toolbarStyles}>
        <h1>Team Selection</h1>
        <p>{signedIn ? `Welcome ${userName}!` : "Status - Signed Out"}</p>
      </div>
      <div style={contentStyles}>
        <div style={sidebarStyles}>
          <SideBar teams={selectedTeams} />
        </div>
        <div style={mainStyles}>
          <div style={mainTopStyles}>
            {request.status === PENDING && (
              <p style={loaderStyles}>loading...</p>
            )}
            {request.status === FULFILLED && (
              <List>
                {request.result.teams.map(team => (
                  <TeamRow
                    key={team.id}
                    team={team}
                    isChecked={isSelected(team)}
                    onSelect={e =>
                      e.target.checked
                        ? addTeam(team)
                        : removeTeam(team)
                    }
                  />
                ))}
              </List>
            )}
          </div>
          <div style={pageButtonStyles}>
            <AsyncButton 
              pending={request.status === PENDING} 
              onClick={() => setPage(p => p + 1)}
            >
              Next Page
            </AsyncButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const layoutStyles = {
  height: 400,
  width: 600,
  display: 'flex',
  flexDirection: 'column'
}

const toolbarStyles = {
  height: 100,
}

const sidebarStyles = {
  borderRight: "solid 2px gray",
  padding: "15px",
  flex: 1,
  minWidth: 200
};

const mainStyles = {
  position: 'relative',
  flex: 9999,
  display: 'flex',
  flexDirection: 'column'
};

const mainTopStyles = {
  height: '90%'
};

const contentStyles = {
  flex: 1,
  display: 'flex',
};

const loaderStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

const pageButtonStyles = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default Home;
