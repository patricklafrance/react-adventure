import React, { PureComponent } from "react";

class Component extends PureComponent {
    componentWillMount() {}

    render() {
        return (
            <React.Fragment>
                <div>Product listing</div>
            </React.Fragment>
        );
    }
}

export const ProductListing = Component;
