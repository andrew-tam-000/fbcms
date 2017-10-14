import React, {Component} from 'react';
import _ from 'lodash';
import { GridList, GridListTile } from 'material-ui/GridList';
import Button from 'material-ui/Button';

const fileUploadStyle = {
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0,
    pointer: 'cursor'
};

// TODO: Move upload into conenct function
class Image extends Component {

    constructor(props) {
        super(props);
        this.uploadImage = this.uploadImage.bind(this);
        this.updatePath = this.updatePath.bind(this);
        this.removeImage = this.removeImage.bind(this);
        this.state = {
            path: null,
            value: this.props.defaultValue
        };
    }

    // Any time the value changes, we need to regenerate the path
    componentWillUpdate(newProps, newState) {
        if (this.state.value != newState.value) {
            this.updatePath(newState.value);
        }
    }

    // Set the path. If there is no path, then
    // set an empty path
    updatePath(newPath) {
        return this.props.convertPathToUrl(newPath)
            .then(
                url => this.setState({path: url})
            )
            .catch(
                e => this.setState({path: null})
            )
        ;
    }

    componentDidMount() {
        if (this.props.defaultValue) {
            this.updatePath(this.props.defaultValue);
        }
    }

    renderPreview() {
        return (
            this.state.path ? (
                <img width={400} height='auto' src={this.state.path}/>
            ) : (
                null
            )
        );
    }

    render() {

        const { name, defaultValue } = this.props;

        return (
            <div>
                <input type='hidden' value={this.state.value} name={name}/>

                { this.renderPreview() }

                <Button raised>
                    <input onChange={this.uploadImage} style={fileUploadStyle} type='file'/>
                    Upload Image
                </Button>

                <Button raised onClick={this.removeImage}>
                    Remove Image
                </Button>

                <Button raised>
                    Select Image
                </Button>

                {/*
                <div className={classes.root}>
                    <GridList cellHeight={160} className={classes.gridList} cols={3}>
                        <GridListTile key={tile.img} cols={tile.cols || 1}>
                            <img src={tile.img} alt={tile.title} />
                        </GridListTile>
                    </GridList>
                </div>
                */}
            </div>
        );
    }

    removeImage(e) {
        this.setState({
            value: ''
        });
    }

    uploadImage(e) {
        const { uploadImageToFirebase } = this.props;
        const file = _.get(e, ['target', 'files', 0]);
        uploadImageToFirebase(file)
            .then(
                refUrl => this.setState({value: refUrl})
            )
        ;
    }
}

export default Image;
