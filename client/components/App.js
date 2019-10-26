import React from 'react';
import '../css/App.css';
import AWS from 'aws-sdk';


class App extends React.Component {
  constructor(){
    super();
    this.handleClick = this.handleClick.bind(this);

  
  }

  
  handleClick() {
   


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
    console.log('The URL is', url);

  }
  
  render(){
    return (
        <div>
            <h1>THIS A MF TEST BITCH</h1>
             <button onClick={this.handleClick()}> Test </button>

        </div>
     

    );

  }




}

export default App;
