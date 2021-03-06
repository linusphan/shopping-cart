import React from 'react';
import AddProductForm from './AddProductForm';
import {Link, NavLink} from 'react-router-dom';
import store from '../store';

class Product extends React.Component {
  state = {
    editing: false,
  };

  handleAddClick = () => {
    const {id, title, price} = this.props;

    store.dispatch({
      type: 'ITEM_ADDED_TO_CART',
      product: {
        id,
        title,
        price,
      },
    });
  }

  handleToggleEdit = () => {
    this.setState({
      editing: !this.state.editing,
    });
  }

  handleDeleteClick = () => {
    store.dispatch({type: "PRODUCT_DELETED", id: this.props.id})
  }

  handleUpdateSubmit = (product) => {
    store.dispatch({type: 'PRODUCT_EDITED', product: product})
  }

  render() {
    let addButton = (
      <a
        className="button add-to-cart"
        onClick={this.handleAddClick}
      >Add to Cart</a>
    );

    if (this.props.quantity <= 0) {
      addButton = (
        <a
          className="button add-to-cart"
          style={{backgroundColor: 'rgb(139, 151, 156)'}}
        >Add to Cart</a>
      );
    };

    let editFormOrAddButton = (
      <a className="button edit" onClick={this.handleToggleEdit}>Edit</a>
    );

    if (this.state.editing) {
      addButton = undefined;
      editFormOrAddButton = (
        <AddProductForm
          name={this.props.title}
          price={this.props.price}
          quantity={this.props.quantity}
          productId={this.props.id}
          editing={true}
          onUpdateSubmit={this.handleUpdateSubmit}
          onToggleEdit={this.handleToggleEdit}
        />
        // cancel button
      );
    }

    return (
      <div className="product">
        <div className="product-details">
          { !this.props.isLinkActive ? 
            (<h3>{this.props.title}</h3>)
          :
          (<Link 
            to={`/product/${this.props.id}`}>
            <h3>{this.props.title}</h3>
          </Link>)
          }
          <p className="price">${this.props.price}</p>
          <p className="quantity">{this.props.quantity} left in stock</p>

          <div className="actions product-actions">
            {addButton}
            {editFormOrAddButton}
          </div>
          <a 
            className="delete-button"
            onClick={this.handleDeleteClick}
          ><span>X</span></a>
        </div>
      </div>
    );
  }
}

export default Product;
