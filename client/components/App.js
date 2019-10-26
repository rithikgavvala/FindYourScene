import React from 'react';
import '../css/App.css';
import AWS from 'aws-sdk';


class App extends React.Component {
  constructor(){
    super();
    this.state ={ videoUrl:''};
    this.handleClick = this.handleClick.bind(this);

  
  }

  
  handleClick() {
    const { videoUrl } = this.state;  


    AWS.config.update({
        accessKeyId: "AKIAZ6GZUI2KIBBM7LDC",
        secretAccessKey: "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",
        "region": "us-east-2"  
    }); // for simplicity. In prod, use loadConfigFromFile, or env variables
    
    var s3 = new AWS.S3();
    var params = {
        Bucket: 'fysvideostorage',
        Key: 'The Lion King Official Trailer.mp4',
     
    };
    var url = s3.getSignedUrl('getObject', params);
    var index = url.indexOf("?");
    url = url.substring(0, index);
    this.videoUrl = url;
    
    this.setState({videoUrl:url});
    console.log('The URL is', this.videoUrl);

  }
  
  render(){
    const {videoUrl} = this.state;
    return (
        <div className="si-body">
          <div className="si-header">
            <div className="si-logo">
              SkipIt
            </div>


          </div>
            <div className="si-media-body">
              <div className="si-header2">
                Video Library

              </div>

          
              <video controls autoplay> <source src={this.videoUrl} type="video/mp4" /> </video> 


            </div>
           
             <button onClick={this.handleClick}> Test </button>

        </div>
     

    );

  }




}

export default App;
