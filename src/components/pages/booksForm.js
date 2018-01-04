"use strict"
import React from 'react';
import { InputGroup, DropdownButton, Image, MenuItem, Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findDOMNode } from 'react-dom';
import { postBook, deleteBooks, getBooks , resetButton} from '../../actions/booksActions';
import axios from 'axios'

class BooksForm extends React.Component {
    constructor() {
        super();
        this.state = {
            images: [{}],
            img: ''
        }
    }

    componentDidMount() {
        this.props.getBooks();
        axios.get('/api/images/')
            .then(function (response) {
                this.setState({ images: response.data })
            }.bind(this))
            .catch(function (err) {
                this.setState({ images: 'Error loading file from server', img: '' })
            }.bind(this))
    }

    handleSubmit = () => {

        let book = [{
            author: findDOMNode(this.refs.title).value.trim(),
            description: findDOMNode(this.refs.description).value.trim(),
            images: findDOMNode(this.refs.image).value.trim(),
            price: findDOMNode(this.refs.price).value.trim()
        }]

        this.props.postBook(book);

    }
    onDelete = () => {
        let bookId = findDOMNode(this.refs.delete).value.trim();
        this.props.deleteBooks(bookId);
    }

    handleSelect(img) {
        this.setState({
            img: '/images/' + img
        })
    }

    resetForm = () => {
        findDOMNode(this.refs.title).value = "";
        findDOMNode(this.refs.description).value = "";
        findDOMNode(this.refs.price).value = "";
        this.setState({img:""});
        this.props.resetButton();
    }

    render() {
        const booksList = this.props.books.map(book => {
            return (
                <option key={book._id}>{book._id}</option>
            )
        })

        const imgList = this.state.images.map(function (image, i) {
            return (<MenuItem key={i} eventKey={image.name} onClick={this.handleSelect.bind(this, image.name)}>{image.name} </MenuItem>
            )

        }, this)

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={6}>
                        <Panel>
                            <InputGroup>
                                <FormControl type="text" ref="image" value={this.state.img} />
                                <DropdownButton
                                    componentClass={InputGroup.Button}
                                    id="input-dropdown-addon"
                                    title="Select an Image"
                                    bsStyle="primary"
                                >
                                    {imgList}
                                </DropdownButton>
                            </InputGroup>
                            <Image src={this.state.img} responsive />
                        </Panel>
                    </Col>

                    <Col xs={12} sm={6}>

                        <Panel>
                            <FormGroup controlId="title" validationState={this.props.validation}>
                                <ControlLabel> Titile </ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="Enter Title"
                                    ref="title"
                                />
                                <FormControl.Feedback/>
                            </FormGroup>

                            <FormGroup controlId="description" validationState={this.props.validation}>
                                <ControlLabel> Description</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="description"
                                    ref="description"
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <FormGroup controlId="price" validationState={this.props.validation}>
                                <ControlLabel> Price</ControlLabel>
                                <FormControl
                                    type="text"
                                    placeholder="price"
                                    ref="price"
                                />
                                <FormControl.Feedback />
                            </FormGroup>

                            <Button bsStyle={(!this.props.msg) ? ("primary") : (this.props.style)} onClick={(!this.props.msg) ? (this.handleSubmit.bind(this)):(this.resetForm)}> {(!this.props.msg) ? ("Save Book") : (this.props.msg)} </Button>
                        </Panel>
                        <Panel style={{ marginTop: '25px' }}>
                            <FormGroup controlId="formControlsSelect">
                                <ControlLabel>Select a book</ControlLabel>
                                <FormControl ref="delete" componentClass="select" placeholder="select">
                                    <option value="">select</option>
                                    {booksList}
                                </FormControl>
                            </FormGroup>
                            <Button bsStyle="danger" onClick={this.onDelete.bind(this)}> Delete </Button>
                        </Panel >
                    </Col>

                </Row>


            </Well>
        )
    }
}
function mapStateToProps(state) {
    return {
        msg: state.books.msg,
        style: state.books.style,
        books: state.books.books,
        validation: state.books.validation
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ resetButton, postBook, deleteBooks, getBooks }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BooksForm)