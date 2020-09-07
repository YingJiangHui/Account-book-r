import React from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import routeData from 'route/route';
import NotFound from 'views/NotFound';
import 'style/animation.scss';

interface IRouterItem {
  component?: React.ComponentType;
  path?: string;
  exact?: boolean;
}


class Routes extends React.Component<any> {
  render() {
    const {location} = this.props;
    return (

      <Switch location={location}>
        {routeData.map(({path, component, exact}: IRouterItem) => (
          <Route key={path} path={path} component={component} exact={exact}/>
        ))}
        <Route exact path="/">
          <Redirect to="/detail"/>
        </Route>
        <Route path={'*'} component={NotFound}/>

      </Switch>
      //
      // <TransitionGroup mode={'in-out'} style={{height:'100%'}}>
      //   <CSSTransition
      //     classNames={'fade'}
      //     appear={true}
      //     key={location.pathname}
      //     timeout={100}
      //     unmountOnExit={true}
      //   >
      //
      //   </CSSTransition>
      // </TransitionGroup>
    );
  }
}

export default withRouter(Routes);