import React from 'react';

import './collection.styles.scss';
import {connect} from 'react-redux';


import {selectCollection} from '../../redux/shop/shop.selectors';

const CollectionPage = ({match}) =>(
    <div className= 'collection-page'>
        <h2>Collection Page</h2>
    </div>
    );


const mapStateToProps = (state, ownProps) =>({
    collection: selectCollection(ownProps.match.params.CollectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);