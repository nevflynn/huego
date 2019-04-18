import React, { Component } from 'react';

import '../../App.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/lab/Slider';
import getCroppedImg from './cropImage';
import cloudIcon from '../../img/cloud.svg';
import imageIcon from '../../img/image.svg';
import styles from './UploadEntry.module.css';
import {withRouter, Redirect} from 'react-router-dom';



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
            croppedUrl: null,
            postHeaders: null,
            isLoaded:false,
            redirect:false
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
          this.setState({imageSrc: reader.result, progress: 1});
        }.bind(this);
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
     }

    componentDidMount(props){
        let url = 'http://localhost:5000/api/posts/post_headers/' + this.props.match.params.categoryNumber;
        fetch(url)
        .then(res => res.json())
        .then(json => {
            this.setState({
                postHeaders: json,
                isLoaded: true,
            })
        });
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
                    post_category: this.props.match.params.categoryNumber
                  }, {headers: headers})
                  .then((response) => {
                    this.setState({redirect:true})
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

    renderRedirect(){
        if(this.state.redirect){ 
            return <Redirect to={'/category/' + this.props.match.params.categoryNumber}/>
        }
    }

    render(){

        if(this.state.isLoaded){

            var color_1, color_2, color_3, color_4;

            var postHexCodes = this.state.postHeaders[0].post_hex_codes;

            color_1 = {
                backgroundColor: postHexCodes[0],
            };
            color_2 = {
                backgroundColor: postHexCodes[1],
            };
            color_3 = {
                backgroundColor: postHexCodes[2],
            };
            color_4 = {
                backgroundColor: postHexCodes[3],
            };

            var modal;
            if (this.state.progress === 0) {
                modal =  <div className={styles.modalContainer1}>
                            <div className={styles.cloudIconContainer}><img src={cloudIcon} className={styles.cloudIcon}></img></div>
                            <div className={styles.ruleCard}>
                                <div className={styles.ruleCardPalette}>
                                    <div style={color_1}></div>
                                    <div style={color_2}></div>
                                    <div style={color_3}></div>
                                    <div style={color_4}></div>
                                </div>
                                <div>
                                    <h3>Your colour palette</h3>
                                    <p>Only upload designs using this palette</p>
                                </div>
                            </div>
                            <div className={styles.ruleCard}>
                                <div>
                                    <img src={imageIcon} className={styles.imageIcon}></img>
                                </div>
                                <div>
                                    <h3>High resolution images</h3>
                                    <p>PNG and JPG only. In-app cropping to 4:3</p>
                                </div>
                            </div>
                            <Dropzone onDrop={this.handleOnDrop} maxSize={imageMaxSize} multiple={false} accept='image/*'>
                                {({getRootProps, getInputProps}) => (
                                    <section>
                                    <div {...getRootProps({className: styles.dropzone})}>
                                        <input {...getInputProps()} />
                                        <p><span className={styles.boldSpan}>Drag and drop</span> your entry here, <span className={styles.boldSpan}>or click</span> to select a file</p>
                                    </div>
                                    </section>
                                )}
                            </Dropzone>
                        </div>
            } else if (this.state.progress === 1) {
                modal = <div className={styles.modalContainer2}>
                                <div className={styles.cropEntryWindow}>
                                    <Cropper
                                        image={this.state.imageSrc}
                                        crop={this.state.crop}
                                        zoom={this.state.zoom}
                                        aspect={this.state.aspect}
                                        onCropChange={this.onCropChange}
                                        onCropComplete={this.onCropComplete}
                                        onZoomChange={this.onZoomChange}
                                        showGrid={false}
                                    />
                                </div>
                                <div className={styles.cropControls}>
                                <button className={styles.cancelButton} onClick={() => this.setState({progress: 0})}>Cancel</button>
                                        <Slider
                                            className={styles.slider}
                                            value={this.state.zoom}
                                            min={1}
                                            max={3}
                                            aria-labelledby="Zoom"
                                            onChange={(e, zoom) => this.onZoomChange(zoom)}
                                        />
                                    <button className={styles.cropButton} onClick={this.showCroppedImage}>Crop image</button>
                                </div>
                            </div> 
            } else if (this.state.progress === 2){
                modal = <div className={styles.modalContainer3}>
                            <div className={styles.cropPreviewContainer}>
                                <img src={(this.state.croppedImage ? this.state.croppedImage : null)}></img>
                            </div>
                            <div className={styles.submitControls}>
                                <button onClick={() => this.setState({progress:1})} className={styles.cancelButton}>Back to crop</button>
                                <button onClick={() => this.uploadCroppedImage(this.state.croppedImage)} className={styles.cropButton}>Submit entry</button>
                            </div>
                        </div>
            }
                    return(
                        <div className={styles.uploadEntry}>
                            {modal}
                            {this.renderRedirect()}
                        </div>
                    )
                } else {
                    return null
            } 
        }
    }


export default withRouter(UploadEntry);



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