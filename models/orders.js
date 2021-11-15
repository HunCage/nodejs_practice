var mongoose = require( "mongoose" );
var db,
    Orders;

function setConnection( mongodb ) {
    db = mongodb;
    setModel();
}

function setModel() {

    // User schema.
    var Schema = mongoose.Schema;
    var orderSchema = new Schema({
        user_id: String,
        name: String,
        desc: String,
        product: String,
        deadline: Date,
        created_at: Date,
    });

    Orders = db.model( 'Orders', orderSchema, 'Orders' );
}

function getModel( modelName ) {
        return Orders;
}

function read( where, callBack ) {
    if ( !where ) {
        where = {};
    }

    Orders.find( where, function( err, data ) {
        if ( err ) {
            console.error( 'Error in query: ', where );
            data = [];
        }

        if ( callBack ) {
            callBack( data );
        }
    });
}

function first( where, callBack ) {
    read( where, function( data ) {
        if ( data.length > 0 ) {
            callBack( data[0] );
        } else {
            callBack( null );
        }
    });
}

function create( document, callBack ) {

    var order = new Orders( document );
    order.save( function( err ) {
        if ( err ) {
            console.error( "Save error: ", err );
            callBack( {} );
        } else {
            callBack( user );
        }
    });

}

module.exports = {
    setConnection: setConnection,
    read: read,
    create: create,
    first: first,
    getModel: getModel
};