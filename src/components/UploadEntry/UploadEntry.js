import React, { Component } from 'react';

import '../../App.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/lab/Slider';
import getCroppedImg from './cropImage'


//In bytes
const imageMaxSize = 10000000;

class UploadEntry extends Component {

    constructor(props){
        super(props);
        this.state = {
            imageSrc: null,
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 4 / 3,
            haveImage: false,
            progress:0,
            croppedAreaPixels: null,
            croppedImage: null,
            croppedUrl: null
        }
    }

    handleOnDrop = (files, rejectedFiles) => {
        console.log(files);
        this.getBase64(files[0]);
    }

    getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
        //   console.log(reader.result);
          this.setState({imageSrc: reader.result, progress: 1});
        }.bind(this);
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

    onCropChange = crop => {
        this.setState({ crop })
    }

    onCropComplete = (croppedArea, croppedAreaPixels) => {
        this.setState({ croppedAreaPixels})
    }

    onZoomChange = zoom => {
        this.setState({ zoom })
    }

    showCroppedImage = async () => {
        this.setState({progress:2})
        const croppedImage = await getCroppedImg(this.state.imageSrc, this.state.croppedAreaPixels);
        // console.log(croppedImage)
        this.setState({ croppedImage })
    }

    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
    
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        // console.log(new Blob([ia], {type:mimeString}));
        return new Blob([ia], {type:mimeString});
    }

    blobToFile(theBlob, fileName){
        //A Blob() is almost a File() - it's just missing the two properties below
        theBlob.lastModifiedDate = new Date();
        theBlob.name = fileName;
        return theBlob;
    }

    uploadCroppedImage(dataURI){
        var blob = this.dataURItoBlob(dataURI);
        var file = this.blobToFile(blob, 'cropped.jpeg');
        var bodyFormData = new FormData();
        bodyFormData.set('image', file);

        axios({
            method: 'post',
            url: 'http://localhost:5000/api/posts/upload_image',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
            })
            .then((response) => {
                console.log(response.data.imageUrl);
                // this.setState({croppedUrl:response.data.imageUrl})
                var headers = {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYjYxN2YxYzgyOGQzMTZkZDBlODRlNCIsIm5hbWUiOiJOZXYgRmx5bm4iLCJpc19hZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoibmV2c29tZXRoaW5nZWxzZSIsImlhdCI6MTU1NTQzNzYzMSwiZXhwIjoxNTg2OTk0NTU3fQ.fwxcsXPPVvEi_gBd7npGCiUO77f6Iivf94zFjG5dju8',
                }
                axios.post('http://localhost:5000/api/posts/add_v2', {
                    post_image: response.data.imageUrl,
                    post_category: 3
                  }, {headers: headers})
                  .then(function (response) {
                    console.log(response);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });        
    }

    render(){

        var modal;
        if (this.state.progress === 0) {
            modal =  <div>
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
        } else if (this.state.progress === 1) {
            modal = <div className="CropEntryContainer">
                            <div className="CropEntryWindow">
                                <Cropper className="Cropper"
                                    image={this.state.imageSrc}
                                    crop={this.state.crop}
                                    zoom={this.state.zoom}
                                    aspect={this.state.aspect}
                                    onCropChange={this.onCropChange}
                                    onCropComplete={this.onCropComplete}
                                    onZoomChange={this.onZoomChange}
                                />
                            </div>
                            <div className="controls">
                            <button className="cropButton" onClick={() => this.setState({progress: 0})}>Cancel</button>
                                <Slider
                                    value={this.state.zoom}
                                    min={1}
                                    max={3}
                                    aria-labelledby="Zoom"
                                    onChange={(e, zoom) => this.onZoomChange(zoom)}
                                />  
                                <button className="cropButton" onClick={this.showCroppedImage}>Crop and upload</button>
                            </div>
                        </div> 
        } else if (this.state.progress === 2){
            modal = <div className="SubmitContainer">
                        <img src={(this.state.croppedImage ? this.state.croppedImage : null)}></img>
                        <button className="cropButton" onClick={() => this.uploadCroppedImage(this.state.croppedImage)}>Submit entry</button>
                    </div>
        }

        return(
            <div className="UploadEntry">
                {modal}
            </div>
        )
    }
}

export default UploadEntry;



        // var bodyFormData = new FormData();
        // bodyFormData.set('image', files[0]);

        // axios({
        //     method: 'post',
        //     url: 'http://localhost:5000/api/posts/upload_image',
        //     data: bodyFormData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        //     })
        //     .then((response) => {
        //         this.setState({imageSrc: response.data.imageUrl, haveImage: true})
        //     })
        //     .catch(function (response) {
        //         //handle error
        //         console.log(response);
        //     });

        // var headers = {
        //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYjYxN2YxYzgyOGQzMTZkZDBlODRlNCIsIm5hbWUiOiJOZXYgRmx5bm4iLCJpc19hZG1pbiI6ZmFsc2UsInVzZXJuYW1lIjoibmV2c29tZXRoaW5nZWxzZSIsImlhdCI6MTU1NTQzNzYzMSwiZXhwIjoxNTg2OTk0NTU3fQ.fwxcsXPPVvEi_gBd7npGCiUO77f6Iivf94zFjG5dju8',
        // }
        // axios.post('http://localhost:5000/api/posts/add_v2', {
        //     post_image: this.state.croppedUrl,
        //     post_category: 3
        //   }, {headers: headers})
        //   .then(function (response) {
        //     console.log(response);
        //   })
        //   .catch(function (error) {
        //     console.log(error);
        //   });