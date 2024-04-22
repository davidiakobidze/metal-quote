import classes from './styles/RFQItem.module.css';
import React from "react";

const RFQItem: React.FC<{ quote: any }> = (props) => {
    const {quote, products} = props.quote
    return (
        <>
            <li className={classes.item}>
                <div>
                    <h4>User</h4>
                    {quote.rfq?.customer?.firstName} {quote.rfq?.customer?.lastName} Email: {quote.rfq?.customer?.email}
                </div>
                <div>
                    <h4>Email content</h4>
                    {quote.rfq?.emailContent}
                </div>
                <div>
                    <h4>Product description</h4>
                    {products.map((productItem: any) => {
                        const {product} = productItem
                        return <div id={product.id}>
                            Name: {product.name}, quantity: {productItem.quantity}, Unit price: {product.unitPrice}$
                        </div>
                    })}
                </div>
                <div>
                    <h4>Quote</h4>
                    Total price: {quote.rfq?.totalPrice}$, Lead estimation: {quote.rfq?.totalEstimationHours} hours
                </div>

            </li>
        </>
    );
};

export default RFQItem;
