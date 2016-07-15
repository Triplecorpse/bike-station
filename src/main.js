class Element extends React.Component {
    render() {
        return <div className="slickbox" {...this.props}></div>;
    }
}

class Buttons extends React.Component {
    render() {
        return <div>
            <button id="show">Show all</button>
            <button id="hide">Hide all</button>
        </div>;
    }
}

class Component extends React.Component{
    constructor(props) {
        super(props);
        this.handleElementClick = this.handleElementClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.state = {};
        this.reinitElements(true)
    }

    reinitElements(shouldShow, index) {
        if(index === undefined) {
            this.indents[index] = <Element onClick={this.handleElementClick} data-show={false} data-index={index} key={index}>Element {index + 1}</Element>;
            return;
        }
        this.indents = [];
        for (var i = 0; i < 8; i++) {
            this.indents.push(<Element onClick={this.handleElementClick} data-show={shouldShow} data-index={i} key={i}>Element {i + 1}</Element>);
        }
    }

    handleElementClick(e) {
        var self = this;
        function display() {
            var index = +e.target.getAttribute('data-index');
            self.reinitElements(false, index)
        }
        self.setState({
            display: display()
        });
    }

    handleButtonClick(e) {
        var self = this;
        function display() {
            if(e.target.id === 'show') {
                self.reinitElements(true);
            } else if(e.target.id === 'hide') {
                self.reinitElements(false)
            }
        }
        self.setState({
            display: display()
        });
    }

    render() {
        return <div>
            <div onClick={this.handleButtonClick}>
                <Buttons />
            </div>
            {this.indents.map( (el, index) => {
            return el.props['data-show'] ? el : null;
        })} </div>
    }
}

ReactDOM.render(<Component />, document.getElementById('container'));