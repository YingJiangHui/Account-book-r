import React, {useContext} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import routeData from 'route/route';
import NotFound from 'views/NotFound';
import 'style/animation.scss';
import Context from 'contexts/context';
import useTags from 'hooks/useTags'
import useRecord from 'hooks/useRecords'

interface IRouterItem {
  component?: React.ComponentType;
  path?: string;
  exact?: boolean;
}


const Routes = () => {
  const recordAction = useRecord()
  const tagAction = useTags()

  return (
    <Context.Provider value={{...tagAction,...recordAction}}>
      <Switch>
        {routeData.map(({path, component, exact}: IRouterItem) => (
          <Route key={path} path={path} component={component} exact={exact}/>
        ))}
        <Route exact path="/">
          <Redirect to="/detail"/>
        </Route>
        <Route path={'*'} component={NotFound}/>

      </Switch>
    </Context.Provider>
  );

};

export default withRouter(Routes);