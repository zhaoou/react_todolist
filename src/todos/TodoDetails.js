import React, {Component} from 'react';

class Todos extends Component {


    render() {
        return (
            <div>

                todo details
                {this.props.match.params.id}
            </div>


        );
    }
}

export default Todos;
