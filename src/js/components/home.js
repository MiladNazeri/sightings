import React from 'react';

export default class Home extends React.Component {

  render() {
    return (
        <div>
          	<div>
          		<h1></h1>
          	</div>
          	<img src="https://mobyclick.s3-us-west-2.amazonaws.com/mobyClick06.png" style={styles.img}/>
          	<h1> The World's Best Whale Sighting Platform! < /h1>
        </div>
    )
  }
}

var styles = {
	img: {
		width: 400
	}
};