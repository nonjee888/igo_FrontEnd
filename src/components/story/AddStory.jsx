import "./style.scss";
import React from "react";



const AddStory = () => {
    return (


        <div>
            <div className="AddStory-wrapper">

                <div className="Add-Container">
                       
                       <div className="title-wrapper">
                        <input 
                        className="title"
                        type="text"
                         name="FirstName"
                        placeholder="제목입력"/>
                        </div>
                       
                        <input 
                        className="add-video"
                        type="file"
                        placeholder="제목입력"/>
                        </div>
                       
                       <input type="text"
                       name="FirstName"
                       placeholder="리뷰한줄"/>
                      
                       <button className="addbutton">여행스토리추가하기</button>
                    </div>
                </div>
            
       
    );
};

export default AddStory
