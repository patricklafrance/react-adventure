import React, { PureComponent } from "react";

export class Product extends PureComponent {
    upvote = () => {
        const { product, onUpvote } = this.props;

        onUpvote(product);
    };

    render() {
        const { product } = this.props;
        const { name, brand, voteCount } = product;

        return (
            <li>
                Name: {name}
                &nbsp;&nbsp; Brand: {brand}
                &nbsp;&nbsp; Vote: {voteCount}
                &nbsp;&nbsp;
                <button onClick={this.upvote}>upvote</button>
            </li>
        );
    }
}
