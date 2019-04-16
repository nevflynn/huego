import React, { Component } from 'react';

import '../../App.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';

//In bytes
const imageMaxSize = 10000000;

class UploadEntry extends Component {

    handleOnDrop = (files, rejectedFiles) => {

        axios.post('http://localhost:5000/api/posts/upload_image', {
            image: files,
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

    }

    render(){
        return(
            <div className="UploadEntry">
                <div>
                    <Dropzone onDrop={this.handleOnDrop} maxSize={imageMaxSize} multiple={false} accept='image/*'>
                        {({getRootProps, getInputProps}) => (
                            <section>
                            <div {...getRootProps({className: 'dropzone'})}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                            </div>
                            </section>
                        )}
                    </Dropzone>
                </div>
            </div>
        )
        }
    }

export default UploadEntry;