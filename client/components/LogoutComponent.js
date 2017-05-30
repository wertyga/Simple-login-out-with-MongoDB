import '../styles/LogoutComponent.sass';
import classnames from 'classnames';

import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import FlipMove from 'react-flip-move';

const LogoutComponent = createReactClass ({
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
                    <div className={classnames('LogoutComponent', {[this.props.className]: this.props.className})}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12">
                                        <h1>LogoutComponent</h1>
                                        <h3 style={{color: '#007fb1'}}>{'Hello '  + this.props.name}</h3>
                                    </div>
                                </div>
                            </div>
                    </div>
        );
    }
});

export default LogoutComponent;