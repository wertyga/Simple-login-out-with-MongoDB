import UpperMenu from './UpperMenu';
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import { logout } from '../actions/actions';

import classnames from 'classnames';
import FlipMove from 'react-flip-move';
import { connect } from 'react-redux';

import '../styles/App.sass';


const style = {
    mains: {
        width: window.innerWidth
    }
};



const App = createReactClass({

    getInitialState() {
        return {
            login: false,
            position: 0
        }
    },

    componentWillMount() {
        if(this.props.isAuth) {
            this.setState({
                login: true
            });
        };
    },

    onClick() {
        this.setState({
            login: !this.state.login
        });
    },

    logout(value) {
        this.setState({
            login: value
        })
    },

    logoutUser() {
        this.props.logout();
        this.setState({
            login: false
        });
    },


    render() {

        const appear = {
            from: {
                transform: 'translateX(-100%)'
            },
            to: {
                transform: 'translateX(0%)'
            }
        };
        const leave = {
            from: {
                transform: 'translateX(0%)'
            },
            to: {
                transform: 'translateX(100%)'
            }
        };

        return (
            <div className="App">
                <UpperMenu
                    login={this.state.login}
                    loginClick={() => this.setState({ login: false })}
                    logoutClick={this.logoutUser}
                    newUserClick={() => this.setState({login: 'new'})}
                />

                    <FlipMove enterAnimation={appear}  leaveAnimation={leave} duration={500}>
                        {this.state.login !== true && (
                            <div className="mains">
                                <LoginComponent
                                    className={classnames({ 'visible': !this.state.login })}
                                    header="Login user"
                                    loginCard={true}
                                    logout={this.logout}
                                />
                                <LoginComponent
                                    className={classnames('RegComponent', { 'visible': this.state.login === 'new' })}
                                    header="Register new user"
                                    logout={this.logout}
                                />
                            </div>
                        )}
                        {this.state.login === true && (
                            <div className="mains">
                                <LogoutComponent
                                    className='visible'
                                    name={this.props.user}
                                />
                            </div>
                        )}

                    </FlipMove>

            </div>

        );
    }
});

function mapStateToProps(state) {
    return {
        isAuth: state.login.isAuthentificate,
        user: state.login.user.name
    }
};


export default connect(mapStateToProps, {logout})(App);