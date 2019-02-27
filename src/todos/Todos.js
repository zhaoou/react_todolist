import React, {Component} from 'react';
import Todo from './Todo';

class Todos extends Component {

    constructor(props) {
        super(props);
        this.state = {ray: ["Kill Bill", "Buy Milk"]};
        this.add = this.add.bind(this);
    }

    add(name) {
        console.log("adding name in App")
        let oldNames = [...this.state.ray];
        oldNames.push(name);
        this.setState({ray: oldNames});
    }

    render() {
        return (
            <div>

                {this.state.ray.map((e, i) => (
                    <Todo key={i} name={e} add={this.add}/>
                ))}
            </div>


        );
    }
}

export default Todos;








