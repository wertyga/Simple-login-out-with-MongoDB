import FlipMove from 'react-flip-move';
import './ToggleButerMenu.sass';

const ToggleButerMenu = createReactClass({

    getInitialState() {
        return {
            open: false
        }
    },

    onClick(e) {
        this.setState({
            open: !this.state.open
        });
    },

    componentWillReceiveProps(nextProps) {
        if(nextProps !== this.props.login) this.setState({ open: false })
    },

    render() {

        const style = {
            div: {
                display: 'flex',
                width: parseInt(this.props.size) * 1.2 + 'px',
                height: this.props.size,
                flexFlow: 'column nowrap',
                justifyContent: 'space-between',
                cursor: 'pointer'
            },
            firstSpan: {
                width: '100%',
                height: this.props.spanHeight,
                backgroundColor: this.props.color,
                borderRadius: this.props.borderRadius,
                opacity: this.state.open ? 0 : 1,
                transition: this.props.transition,
            },
            secondSpan: {
                width: '100%',
                height: this.props.spanHeight,
                backgroundColor: this.props.color,
                position: 'relative',
                borderRadius: this.props.borderRadius,
                transition: this.props.transition,
                transform: this.state.open ? 'rotate(45deg)' : ''
            },
            thirdSpan: {
                width: '100%',
                height: this.props.spanHeight,
                backgroundColor: this.props.color,
                borderRadius: this.props.borderRadius,
                opacity: this.state.open ? 0 : 1,
                transition: this.props.transition,

            },
            invisible: {
                width: '100%',
                height: this.props.spanHeight,
                backgroundColor: this.props.color,
                position: 'absolute',
                top: 0,
                borderRadius: this.props.borderRadius,
                transition: this.props.transition,
                transform: this.state.open ? 'rotate(-90deg)' : ''
            }
        };

        const appearAnimation = {
            from: { transform: 'scale(1, 0)', transformOrigin: 'center top' },
            to: { transform: 'scale(1, 1)'  }
        };
        const leaveAnimation = {
            from: { transform: 'scale(1, 1)' },
            to: { transform: 'scale(1, 0)' }
        };

        const menu = (
            <ul>
                {this.props.login === 'new' ?
                    <li onClick={this.props.loginClick}>Login user</li> :
                    (this.props.login === false ? <li onClick={this.props.newUserClick}>Create new user</li> :
                    <li onClick={this.props.logoutClick}>Logout user</li> )}
            </ul>
        );

        return (
            <div className="ToggleButerMenu">
                <div style={style.div} onClick={this.onClick}>
                    <span className="first" style={style.firstSpan}/>
                    <span className="second" style={style.secondSpan}>
                        <span className="second" style={style.invisible}/>
                    </span>
                    <span className="third" style={style.thirdSpan}/>
                </div>
                <FlipMove enterAnimation={appearAnimation} leaveAnimation={leaveAnimation}>
                    {this.state.open && menu}
                </FlipMove>

            </div>

        );
    }
});

ToggleButerMenu.defaultProps = {
        size: '30px',
        spanHeight: '6px',
        color: 'white',
        borderRadius: '5px',
        transition: 'all 0.2s'
};

export default ToggleButerMenu;