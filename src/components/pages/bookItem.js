import React from 'react';
import { Image, Col, Well, Button, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart } from '../../actions/cartActions';
import { updateCart } from '../../actions/cartActions';

class bookItem extends React.Component {
    constructor(){
        super();
        this.state = {
            isClicked:false
        }
    }
    onReadMore =()=>{
        this.setState({isClicked:true})
    }

    handleCart = () => {
        const book = [{
            _id: this.props._id,
            title: this.props.title,
            description: this.props.description,
            images:this.props.images,
            price: this.props.price,
            quantity: 1
        }]
        if (this.props.cart.length > 0) {
            let _id = this.props._id;
            let cartIndex = this.props.cart.findIndex(function (cart) {
                return cart._id === _id;
            })
            if (cartIndex === -1) {
                this.props.addToCart(book);
            }
            else {
                this.props.updateCart(_id, 1, this.props.cart)
            }
        }
        else {
            this.props.addToCart(book);
        }

    }
    render() {

        return (
            <Well>
                <Row>
                    <Col xs={12} sm={4}>
                        <Image src={this.props.images} style={{ width: "50px", height: "50px"}}/>
                    </Col>
                    <Col xs={6} xs={8}>
                            <h6> {this.props.title} </h6>
                            <h6> {this.props.author} </h6>
                        <h6> {(this.props.description.length > 30 && this.state.isClicked === false) ? (this.props.description.substring(0, 30)) : (this.props.description)} </h6>

                        {(this.props.description.length > 30 && !this.state.isClicked ) ? (<button className='link' onClick={this.onReadMore}>... Read more </button>):('')}
                        
                            <h6> USD: {this.props.price} </h6>
                            <Button bsStyle='primary' onClick={this.handleCart.bind(this)}> Buy Now </Button>
                        </Col>

                </Row>

            </Well>
                )
    }
}

function mapStateToProps(state) {
    return {
                    cart: state.cart.cart
    }

}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addToCart, updateCart }, dispatch)
}



export default connect(mapStateToProps, mapDispatchToProps)(bookItem);
