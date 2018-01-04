 "use strict"
 import React from 'react';
 import {connect} from 'react-redux';
 import {Modal, Col, Row, Well, Button, Panel, ButtonGroup, Label} from 'react-bootstrap';
 import {bindActionCreators} from 'redux';
import { deleteCartItem, addToCart, updateCart, getCart} from '../../actions/cartActions';

 class Cart extends React.Component{
     constructor(){
         super();
         this.state={
             showModal:false
         }
     }

     componentDidMount(){
         this.props.getCart();
     }

     open = () =>{
         this.setState({showModal:true})
     }

     close = () => {
         this.setState({ showModal: false })
     }


    render(){
        if(this.props.cart[0]){
            return this.renderCart();
        }
        else{
            return this.renderEmpty();
        }
    }
    onDelete =(_id)=>{
        console.log(_id);
        const currentBookToDelete = this.props.cart;
        const indexToDelete = currentBookToDelete.findIndex( ncart =>{
            return ncart._id === _id;
        }

        )
        let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete), ...currentBookToDelete.slice(indexToDelete + 1)]
        this.props.deleteCartItem(cartAfterDelete);
    }
onIncrement(_id){
this.props.updateCart(_id, 1, this.props.cart);
}

     onDecrement(_id, quantity){
         if (quantity>1) {
             this.props.updateCart(_id, -1, this.props.cart);    
         }
    
}


        renderEmpty= ()=>{
            return(<div> Cart Empty </div>)
        }

        renderCart=()=>{

            const cartItemList = this.props.cart.map(cartArr=>{
                return(
                <Panel key={cartArr._id}> 
                    <Row>
                        <Col xs={12} sm ={4}>
                        <h6>{cartArr.description} </h6><span>  </span>
                        </Col>
                        <Col xs={12} sm={2}>
                          <h6>{cartArr.price} </h6><span>  </span>
                        </Col>
                        <Col xs={12} sm={2}>
                          <h6>qty. <Label bsStyle="success">{cartArr.quantity} </Label> </h6><span>  </span>
                        </Col>
                        <Col xs={6} sm={4}>
                            <ButtonGroup>
                                    <Button bsStyle="default" bsSize="small" onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity )}> - </Button>
                                    <Button bsStyle="default" bsSize="small" onClick ={this.onIncrement.bind(this, cartArr._id)}> + </Button>
                                    <span>  </span>
                                    <Button bsStyle="danger" bsSize="small" onClick={this.onDelete.bind(this, cartArr._id)}>DELETE</Button>
                                </ButtonGroup>
                        </Col>
                    </Row>
                    
                </Panel>
                )
            },this)

            return(<Panel header="Cart" bsStyle="primary"> 
                {cartItemList}
                <Row>
                    <Col xs={12}>
                        <h6> Total amount: ${this.props.totalAmount} </h6>
                    <Button bsStyle="success" onClick ={this.open.bind(this)}>
                        PROCEED TO CHECKOUT
                    </Button>

                </Col>
                </Row>
                <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h6>Your order has been saved</h6>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col xs={6}>
                            <h6> total $: {this.props.totalAmount}</h6>
                        </Col>
                        <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </Panel>)
        }

    }

function mapStateToProps(state) {
    return {
        cart: state.cart.cart,
        totalAmount: state.cart.totalAmount
    }

}

 function mapDispatchToProps(dispatch){
     return bindActionCreators({ deleteCartItem, addToCart, updateCart, getCart}, dispatch)
 }

export default connect(mapStateToProps, mapDispatchToProps)(Cart);