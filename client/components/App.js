import React from 'react';
import '../css/App.css';
import AWS from 'aws-sdk';


class App extends React.Component {
  constructor(){
    super();
    this.state ={ videoUrl:'', isVidOn = false };
    var s3Bucket = new AWS.S3();
    this.props = {params: {
      Bucket: 'fysvideostorage',
      Key: 'The Lion King Official Trailer.mp4',
   
    }, s3:s3Bucket };

    this.handleClick = this.handleClick.bind(this);
    this.getVideoKeys = this.getVideoKeys.bind(this);

  
  
  }

  getVideoKeys(){
    

    var listKeys = []
    var s3 = new AWS.S3();
    const params = {
      Bucket: 'fysvideostorage',
      MaxKeys: 10  
    };


    s3.listObjectsV2(params, (err, data) => {
      if (err){
        console.log(err);

      } 
      else{
        console.log("DATA: ", data.Contents);
        for(var i = 0; i < data.Contents.length; i++){
          var curr = data.Contents[i];
          listKeys.push(curr.Key);
        }
      
      }

    });

    console.log(listKeys);

   

  }

  // generateThumbnails(){

  // }
  
  handleClick() {
    const params = {
      Bucket: 'fysvideostorage',
      Key: 'The Lion King Official Trailer.mp4',
   
    };
    
    console.log(params);

 // for simplicity. In prod, use loadConfigFromFile, or env variables
    this.getVideoKeys();


    var s3 = new AWS.S3();
    var url = s3.getSignedUrl('getObject', params);
    var index = url.indexOf("?");
    url = url.substring(0, index);
    this.videoUrl = url;
    
    this.setState({videoUrl:url});

  }
  
  getVideoLibrary(){
    return ( 
    <div className="si-header2">
      Video Library

    </div>);
  }

  getVideoPlayer(){
    return(
      <video controls autoplay> <source src={this.videoUrl} type="video/mp4" /> </video> 

    );
  }


  render(){
    const {videoUrl} = this.state;
  

    AWS.config.update({
      accessKeyId: "AKIAIV5GOC6HLAXEJ7VA",
      secretAccessKey: "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",
      region: "us-east-2"  
      
    });
    return (

        <div className="si-body">
         
          <div className="si-header">
            <div className="si-logo">
              SkipIt
            </div>


          
          </div>
            <div className="si-media-body">


              {this.state.isVidOn ? this.getVideoPlayer : this.getVideoLibrary}
             
              

            </div>
           
             <button onClick={this.handleClick}> Test </button>

        </div>
     

    );

  }




}

export default App;
