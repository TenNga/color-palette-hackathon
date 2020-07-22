import React from 'react';
import logo from './logo.svg';

import ImageUploader from 'react-images-upload';
import { usePalette } from 'react-palette';
import {Palette} from 'react-palette';

import './App.css';

class App extends React.Component {
 
  state = {
    pictures: "",
    url: ""
  }

  onDrop = (picture) => {
    this.setState({
        pictures: picture
    });
  }
  
  render(){
    
    console.log("Picture: ", this.state.pictures[0]);
    // if(this.state.pictures.length > 0){
    //   // const { data, loading, error } = usePalette(URL.createObjectURL(this.state.pictures[0]));
    //   const path = URL.createObjectURL(this.state.pictures[0])
    //   console.log("URL: ", path)
    // } 
    return (
      <div className="App">
        <ImageUploader
                  withIcon={true}
                  buttonText='Choose images'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif']}
                  maxFileSize={5242880}
                  withPreview={true}
        />
        {this.state.pictures?
        // <img src={URL.createObjectURL(this.state.pictures[0])}/>
        <Palette src={URL.createObjectURL(this.state.pictures)}>
        {(palette) => (
          <div style={{ color: palette.data.vibrant}}>
            Text with the vibrant color {palette.darkVibrant}
          </div>
        )}
      </Palette>
         : null}

      
      </div>
    );
  }
}

export default App;
