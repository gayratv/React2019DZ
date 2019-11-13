import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from "../errorMessage/errorMessage";
import dataIceAndFire from "../../services/getdata";
import CustomPage from "../listWithDetails/customPage";

// import CharacterPage from "../characterPage/characterPage";

class App extends React.Component {

    state = {
        showRandomChar : true,
        
        error : false
    }

    componentDidCatch() {
        console.log('error --------------');
        this.setState({error : true});
    }


    onClick= () => {
        this.setState( (oldState) => ({showRandomChar : ! oldState.showRandomChar}) );

    }

    onCharSelected = (ID) => {
        console.log('onCharSelected ',ID);
        this.setState({selectedChar : ID});
    }

render () {
    // console.log('app this.state.selectedChar : ',this.state.selectedChar);

    if (this.state.error) {
        return <ErrorMessage />
    }

    return (
        <> 
            <Container>
                <Header click={this.onClick} showRandom = {this.state.showRandomChar} />
            </Container>
            <Container>
                <Row>
                    <Col lg={{size: 5, offset: 0}}>
                        {/* // чтобы работал деструктор компонента нужно писать так */}
                        {/* <RandomChar showRandom = {this.state.showRandomChar}/> */}
                        
                        {/* {this.state.showRandomChar ? <RandomChar showRandom /> : null} */}
                    </Col>
                </Row>

                {/* <CharacterPage /> */}

                {/* Characters */}
                <CustomPage 
                    getDataFuncList = {dataIceAndFire.getCharacterPage}
                    pageNum="15"
                    fieldListList = "ID name gender"
                    getDataFuncOne = {dataIceAndFire.getOneCharacter}
                    fieldListOne = "Пол/gender/Born/born/Died/died/Culture/culture"
                    nameFieldOne = "name"
                />
            </Container>
        </>
    );
};
}
export default App;