import React from 'react';
import { StyleSheet, 
  Text,
   View,
   Animated,

} from 'react-native';
import Deck from './src/Deck';
import {Card, Button} from 'react-native-elements';


const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];


const DATA2 = [
  { id: 9, text: 'Card #9', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 10, text: 'Card #10', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
];

export default class App extends React.Component {


  state = {data: DATA}

  renderCard(item){
    return (
        <Card
        key={item.id}
        title={item.text}
        image={{ uri: item.uri }}

        >

        <Text style={{marginBottom:10}}>
          I can customize the Card further
        </Text>
          <Button 
          icon = {{name:'code'}}
          backgroundColor="#03A9F4"
          title="View Now"
          />
        </Card>

    );
  }

  renderNoMoreCards(){
    return (
      <Card>
        <Text style={{marginBottom: 10}}>
          There is no more content
        </Text>

        <Button
        icon={{name:'code'}}
        backgroundColor="#03A9F4"
        title="Reload!"
        >

          </Button>
      </Card>

    );
  }

  reloadDeckData(){
    console.log('reload data!!');
    this._deck.props.data = {DATA2};
  }

  render() {
    return (
     
     <View style={styles.container}>
       <Deck 
       data = {this.state.data}
       renderCard={this.renderCard}
       renderNoMoreCards={this.renderNoMoreCards}
       ref= {(c) => {this._deck = c}}
       />
      </View>  
    );
  }


  componentDidMount(){
    console.log(this._deck);
  }




}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:10
  },
});
