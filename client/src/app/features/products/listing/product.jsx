import React, { PureComponent } from "react";

export class Product extends PureComponent {
    upvote = () => {
        const { product, onUpvote } = this.props;

        onUpvote(product);
    };

    render() {
        const { product } = this.props;
        const { name, voteCount } = product;

        return (
            <li>
                Name: {name}
                &nbsp;&nbsp;Vote: {voteCount}
                &nbsp;&nbsp;
                <button onClick={this.upvote}>upvote</button>
            </li>
        );
    }
}
