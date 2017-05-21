import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';

import ToggleButerMenu from './ToggleButerMenu/ToggleButerMenu';

import '../styles/UpperMenu.sass';

const  butter = {
    transition: 'all 0.2s'
};

const UpperMenu = createReactClass({

    render() {
        return (
            <MuiThemeProvider>
                <div className="UpperMenu">
                    <div className="left">
                        <ToggleButerMenu
                            {...butter}
                            loginClick={this.props.loginClick}
                            logoutClick={this.props.logoutClick}
                            newUserClick={this.props.newUserClick}
                            login={this.props.login}
                        />
                        <span>Wertyga's</span>
                    </div>
                    <div>
                        { !this.props.login && <FlatButton label='new user' onClick={this.props.newUserClick}/> }
                        { this.props.login === true && <FlatButton label='logout' onClick={this.props.logoutClick}/> }
                        { (this.props.login === 'new') && <FlatButton label='login' onClick={this.props.loginClick}/> }
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
});

export default UpperMenu;