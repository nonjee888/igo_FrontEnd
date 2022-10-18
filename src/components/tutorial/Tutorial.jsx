import React from "react";
import "./style.scss";
import tutorial0 from "../../asset/assetTutorial/tutorial0.png";
import tutorial2 from "../../asset/assetTutorial/tutorial2.png";
import tutorial3 from "../../asset/assetTutorial/tutorial3.png";
import tutorial4 from "../../asset/assetTutorial/tutorial4.png";
import tutorial5 from "../../asset/assetTutorial/tutorial5.png";
import tutorial6 from "../../asset/assetTutorial/tutorial6.png";
import tutorial7 from "../../asset/assetTutorial/tutorial7.png";
import tutorial8 from "../../asset/assetTutorial/tutorial8.png";
import tutorial9 from "../../asset/assetTutorial/tutorial9.png";



export default function Tutorial () {
    return (
        <div>
           <div className="tutorialimg-wrapper">
           <img className="tutorialbox" src={tutorial0}/>
           <img className="tutorialboxs" src={tutorial2}/>
           <img className="tutorialboxs" src={tutorial8}
           onClick={() =>
            window.open(
              "https://docs.google.com/forms/d/e/1FAIpQLSdCcFuEap6TCvgPGDc1Kz9uOsl68-026qGyjHAZVD90UGY2Rw/viewform?usp=sf_link",
              "_blank"
            )
          }/>
           <img className="tutorialboxs" src={tutorial3}/>
           <img className="tutorialboxs" src={tutorial4}/>
           <img className="tutorialboxs" src={tutorial5}/>
           <img className="tutorialboxs" src={tutorial6}/>
           <img className="tutorialboxs" src={tutorial7}/>
         
           <img className="tutorialboxs" src={tutorial9}/>
          
        </div>
   </div> ) 
}