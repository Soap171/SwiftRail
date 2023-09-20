import { Component } from 'react';
import './Destination.css';


class DestinationData extends Component{

    render(){

        return(
            <div className={this.props.className}>
            <div className='des-text'>
                <h2>{this.props.heading}</h2>
                <p>{this.props.text}</p>

            </div>
            <div className='image'>
                <img alt='Golden Gate Img' src={this.props.image1}/>
                <img alt='Golden Gate Img' src={this.props.image2}/>
            </div>
           </div>
        )
    }
}

export default DestinationData;