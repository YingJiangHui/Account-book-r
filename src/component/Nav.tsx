import React from 'react';
import { NavLink} from 'react-router-dom';
import styled from 'styled-components';
import Icon from './Icon';
import theme from 'theme'

/*icons*/

const NavStyle = styled.nav`
  background: #fff;
  box-shadow: 0 0 3px rgba(0,0,0,0.1);
  height: 68px;
  font-size: 14px;
  >ul{
    height: inherit;
    display: flex;
    justify-content: center;
    >li{
      height: inherit;
      text-align: center;
      width: 33.333%;
   
      >a{
        display: flex;
        flex-direction: column;        
        height: inherit;
        justify-content: center;
        align-items: center;
        >span{
          margin-top: 7px;
          display: inline-block;
        }
        >svg{
          width: 24px;
          height: 24px;
        }
        &.selected{
          color: ${theme.themeColor};
          >span{
            
          }
          >svg{
            fill:${theme.themeColor};
            width: 24px;
            height: 24px;
          }
        }
      }
    }
  }
`;

const Nav = () => {
  return (
    <NavStyle>
      <ul>
        <li>
          <NavLink to="/detail" activeClassName='selected'>
            <Icon name="detail"/>
            <span>明细</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" activeClassName='selected'>
            <Icon name="statistics"/>
            <span>统计</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/setting" activeClassName='selected'>
            <Icon name="setting"/>
            <span>设置</span>
          </NavLink>
        </li>
      </ul>
    </NavStyle>
  );
};

export default Nav;