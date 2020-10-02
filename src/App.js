import React from 'react';
import './App.css';
import {Main} from './main.js';
import {About} from './about.js';
import {Volunteer} from './volunteer.js';
import {Donate} from './donate.js';
import {NotFound} from './notFound.js';
import {FullNavBar} from './fullNavBar.js';
import {SocialIcons} from './socialIconsComponent.js';
import {HomepageComponent} from './homepageComponent.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Redirect
} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      openHamburger: false,
    };
    this.handleResize = this.handleResize.bind(this);
    this.handleHamburger = this.handleHamburger.bind(this);
  };

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  };

  componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
  };

  handleHomeHamburgerClick() {
    this.resetDay();
    this.handleClick();
  };

  handleClick() {
    this.setState({
      openHamburger: !this.state.openHamburger
    });
  };

  handleResize(e) {
    this.setState({
      windowWidth: window.innerWidth
    });
  };

  handleHamburger(e) {
    this.setState({
      openHamburger: !this.state.openHamburger
    });
  };

  //this function is a necessary evil right now. resetDay() does nothing until <Main/> is rendered, when it is defined as the initializeToday function from <Main1/>
  //This code is executed when the title (or "Home" link from hamburger menu) is clicked, causing <Main1/> to reset with today's date
  //I have tried to move the today-initializing code up to this parent component, but the <Main/> <Main1/> situation prevents it from working
  //when <App/> state updates, the props sent to <Main/> update, but the ones to <Main1/> do not. Instead, we get to have this placeholder function:
  resetDay() {
    //re-written as initializedToday in main.js
    return '';
  };

  render() {
    /*
    <div id='navBar'>
    <NavLink className='navTextWrapper' to='/about'>
      <p id='aboutLink' className='navText'>About</p>
    </NavLink>
    <NavLink className='navTextWrapper' to='/donate'>
      <NavLink to='/donate' id='donateLink' className='navText'>Donate</NavLink>
    </NavLink>
    <NavLink className='navTextWrapper' id='navTitleWrapper' to='/'>
      <NavLink to='/' className='navText' id='title' onClick={() => this.resetDay()}>A People's Calendar</NavLink>
    </NavLink>
    <NavLink className='navTextWrapper' to='/volunteer'>
      <NavLink to='/volunteer' id='volunteer' className='navText'>Volunteer</NavLink>
    </NavLink>
    <a target='_blank' rel="noopener noreferrer" href='mailto:apeoplescalendar@gmail.com' className='navTextWrapper'>
      <a target='_blank' rel="noopener noreferrer" id='contactLink' className='navText' href='mailto:apeoplescalendar@gmail.com'>Contact</a>
    </a>
    </div>
    */
    return (
      <Router>
        {this.state.windowWidth > 710 &&
          <FullNavBar
            windowWidth={this.state.windowWidth}
          />
        }
        {this.state.openHamburger &&
          <div id='hamburgerOpen'>
            <NavLink to='/about' id='hamburgerAbout' className='navText hamburgerText' onClick={() => this.handleClick()}>About</NavLink>
            <NavLink to='/donate' id='hamburgerDonate' className='navText hamburgerText' onClick={() => this.handleClick()}>Donate</NavLink>
            <NavLink to='/volunteer' id='hamburgerVolunteer' className='navText hamburgerText' onClick={() => this.handleClick()}>Volunteer</NavLink>
            <NavLink to='/calendar' id='hamburgerCalendar' className='navText hamburgerText' onClick={() => this.handleClick()}>Calendar</NavLink>
            <a target='_blank' rel="noopener noreferrer" id='hamburgerContact' className='navText hamburgerText' href='mailto:apeoplescalendar@gmail.com' onClick={() => this.handleClick()}>Contact</a>
          </div>
        }
        {this.state.windowWidth <= 710 &&
          <div id='smallNavBarContainer'>
            <NavLink to='/' className='navBarNavLink' id='titleContainer' onClick={() => this.handleClick()}>
              <p id='fullNavTitle'>aPC</p>
            </NavLink>
            <div>
              <FontAwesomeIcon icon={faBars} style={this.state.windowWidth > 500 ? {position: 'absolute', top: '15px', left: '95px'} : {position: 'absolute', top: '15px', left: '82px'}} onClick={(e) => this.handleHamburger(e)}/>
            </div>
            <SocialIcons/>
          </div>
        }
        <Switch>
          <Route path='/calendar/day/:day'>
            <Main
              resetDay={resetDay => this.resetDay = resetDay}
            />
          </Route>
          <Route path='/calendar/events/:event_'>
            <Main
              resetDay={resetDay => this.resetDay = resetDay}
            />
          </Route>
          <Route exact path='/calendar'>
            <Main
              resetDay={resetDay => this.resetDay = resetDay}
            />
          </Route>
          <Route path='/about'>
            <About/>
          </Route>
          <Route path='/donate'>
            <Donate/>
          </Route>
          <Route path='/volunteer'>
            <Volunteer/>
          </Route>
          <Route path='/404'>
            <NotFound/>
          </Route>
          <Route exact path='/'>
            <HomepageComponent/>
          </Route>
          <Route>
            <Redirect
              to={{
                pathname: "/404",
              }}
            />

          </Route>
        </Switch>
      </Router>
    );
  };
};

export default App;
