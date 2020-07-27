import React, { useState } from 'react';

import ImageUploader from 'react-images-upload';
import {Palette} from 'react-palette';
import styled from 'styled-components';

import './App.css';

const App = () => {

  const [pictures, setPicture] = useState([]);
  const [click, setClick] = useState(false);

  const AppContainer = styled.div`
    margin: 0 2rem;
  `;

  const Header = styled.h1`
    text-align: center;
    background-color: #448db8;
    color: #f2f2f2;
    padding: 1rem;
    font-size: 3rem;
  `;

  const PaletteContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4,1fr);
    margin: 1rem 0;
  `;

  const SingleColor = styled.div`
    padding: 2rem 0rem;
    text-align: center;
    :hover {
      font-weight: bolder;
    }
  `;

  //execute everytime image upload
  const onDrop = (picture) => {
    setPicture([...picture]);
    setClick(false);
  };

  const colorClicked = (e) => {
    setClick(true);
    const text = e.target.textContent;
    const textholder = document.createElement('textarea');
    textholder.value = text;
    document.body.appendChild(textholder);
    textholder.select();
    document.execCommand('copy');
    // alert("Copied the text: " + textholder.value);
    document.body.removeChild(textholder);
  }

  const StatusDisplay = styled.div`
    background-color:rgb(128, 128, 128, 0.5);
    color: black;
    text-align: center;
    margin-top:2rem;
    font-weight: bolder;
  `;

  const fileStyled = {
    backgroundColor: "#42bec9"
  }
  
    console.log("Picture: ", pictures);
    return (
      <div style={{marginLeft: "1rem", marginRight: "1rem"}}>
        <Header>
          Color Palette Generator From Image
        </Header>
        {/* // logic to display color palette only after image upload */}
        {
          pictures.length > 0?
          <Palette src={URL.createObjectURL(pictures[pictures.length-1])}>
            {(palette) => (
              <>
              {click?
              <StatusDisplay>
                  Copied to Clipboard
                </StatusDisplay> : null }

              <PaletteContainer>
                <SingleColor onClick={colorClicked} style={{ backgroundColor: palette.data.vibrant}}>
                  {palette.data.vibrant}
                </SingleColor>
                <SingleColor onClick={colorClicked} style={{ backgroundColor: palette.data.muted}}>
                  {palette.data.muted}
                </SingleColor>
                <SingleColor onClick={colorClicked} style={{ backgroundColor: palette.data.lightMuted}}>
                  {palette.data.lightMuted}
                </SingleColor>
                <SingleColor onClick={colorClicked} style={{ backgroundColor: palette.data.darkMuted}}>
                  {palette.data.darkMuted}
                </SingleColor>
              </PaletteContainer>
            </>
            )}
          </Palette> : null
        }  
          <ImageUploader
                    withIcon={true}
                    buttonText='Choose images'
                    onChange={onDrop}
                    imgExtension={['.jpg', '.gif', '.png', '.gif']}
                    maxFileSize={5242880}
                    withPreview={true}
                    fileContainerStyle ={fileStyled}
          />
      </div>
    );

}

export default App;
