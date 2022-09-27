import React from "react";
import Card from "./Card";

class CardContainer extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            // TODO
        }
    }

    render(): React.ReactNode {
        const { cardsData } = this.props;

        return (
            <div className="container flex flex-col lg:flex-row items-center justify-evenly gap-3">
                <Card data={cardsData[0]}></Card>
                <Card data={cardsData[1]}></Card>
                <Card data={cardsData[2]}></Card>
            </div>
        );
    }

}

export default CardContainer;