import React, {Component} from 'react';
import {
    View,
    Animated,
    PanResponder,
    Dimensions,
    Platform,
    ToastAndroid
} from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = 0.30 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

class Deck extends Component{


    //This is for default props
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {}
    }
    
    constructor(props){
        super(props);

        const position = new Animated.ValueXY();
        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy })
            },
            onPanResponderRelease: (event,gesture) => {
                if(gesture.dx > SWIPE_THRESHOLD){
                    this.forceSwipe('right');

                    if(Platform.OS==='android'){
                        ToastAndroid.show('Like!!!',ToastAndroid.SHORT);
                    }
                }else if (gesture.dx < -SWIPE_THRESHOLD){
                    
                    this.forceSwipe('left');
                    if(Platform.OS==='android'){
                        ToastAndroid.show('Dislike!!!',ToastAndroid.SHORT);
                    }
                }else {
                    this.resetPosition();
                }
                
            }
        });
        this.panResponder = panResponder;
        this.position = position;
        this.state = {index: 0};
    }

    forceSwipe(direction){
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;

        Animated.timing(this.position, {
            toValue: {x: x, y : 0},
            duration: SWIPE_OUT_DURATION
        }).start(() => {
            this.onSwipeComplete(direction);
        });
    }


    resetPosition(){
        Animated.spring(this.position,{
            toValue: {x:0, y: 0}
        }).start();
    }

    onSwipeComplete(direction){
        const {onSwipeLeft, onSwipeRight,data} = this.props;

        const item = data[this.state.index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        this.position.setValue({x:0, y: 0});
        this.setState({index: this.state.index + 1});

    }


    getCardStyle(){
        const rotate = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5,0,SCREEN_WIDTH * 1.5],
            outputRange: ['-120deg', '0deg','120deg']
        });

        const scale = this.position.x.interpolate({
            inputRange: [-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange: [0,1,0]
        });

        return {
            ...this.position.getLayout(),
            transform: [{rotate}, {scale}]
        };
    }

    renderCards(){
       if(this.state.index >= this.props.data.length){
           return this.props.renderNoMoreCards();
       } 

        return this.props.data.map((item,i) => {
            if(i< this.state.index) {return null;}

            if(i === this.state.index){
                return (
                    <Animated.View
                    key={item.id}
                    style={[this.getCardStyle(),styles.cardStyle]}
                    {...this.panResponder.panHandlers}
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <View key={item.id}
                style={styles.cardStyle}
                >
                {this.props.renderCard(item)}
                </View>
                
            );
        }).reverse();
    }
    
    render(){
        return(
            <View
            >
                {this.renderCards()}
            </View>
        );
    }
};

const styles={
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH
    }
}

export default Deck;