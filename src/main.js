var name = 'nastya';
var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});
var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                Hello, world! I am a CommentList. {this.props.name}
            </div>
        );
    }
});
var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList name={name}/>
                <CommentForm />
            </div>
        );
    }
});
setInterval(() => {
    name = new Date().getTime();
    ReactDOM.setState({name: name});
}, 2000);
setTimeout(Render, 1000);

function Render() {
    ReactDOM.render(
        <CommentBox />,
        document.getElementById('content')
    );
    // console.log('render called');
}