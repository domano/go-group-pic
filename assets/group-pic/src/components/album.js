import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';
import Dropzone from 'react-dropzone'
import Styles from '../index.css'



class Album extends Component {
  constructor(props) {
    super(props)
    this.state = props
  }

  onDrop(acceptedFiles, rejectedFiles) {
    let self = this
    let images = []
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const fileUrl = reader.result;
        let img = new Image()
        img.src = fileUrl
        img.onload = () => {
          images = [...images, 
            { 
            src: fileUrl, 
            thumbnail: fileUrl, 
            thumbnailWidth: img.width,
            thumbnailHeight: img.height, }]
          self.setState((prevState) => {
            return { images: [...prevState.images, ...images] }
          })
        }

      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsDataURL(file);
    });


  }

  render() {
    return (
      <div className="album">
        <Dropzone className="dropzone" onDrop={this.onDrop.bind(this)}/>
        <Gallery className="gallery" images={this.state.images} />
      </div>
    );
  }
}

export default Album;