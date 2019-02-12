import React from 'react';
import getItemSelection from './clientGetReq.js'
import OverviewList from './OverviewList.jsx'

class Overview extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      overview : [],
      shippingTime: [],
      returnPolicy : [],
      returnOverview : [],
      giftWrapping: []
    }
    this.getOverview = this.getOverview.bind(this);
    this.getShippingInformation = this.getShippingInformation.bind(this);
    this.getReturnPolicy = this.getReturnPolicy.bind(this);
    this.getShippingInfo = this.getShippingInfo.bind(this);
  }
  
  componentDidMount(){
    this.getOverview();
    this.getShippingInformation()
    this.getReturnPolicy()
  }
  getOverview(){
    var overviewBulletPoints;
    return getItemSelection(this.props.randomItemNumber)
      .then((data) => {
        overviewBulletPoints = data[0]['overview']
        console.log(overviewBulletPoints)
        this.setState({
          overview: overviewBulletPoints
        })
      })
      .catch((err) => {
        console.log(err, 'overview failed')
      })
  }

  getShippingInformation(){
    var manufacturingTime;
    return getItemSelection(this.props.randomItemNumber)
      .then((data) => {
        manufacturingTime = data[0]['manufacturingTime'];
        console.log(manufacturingTime, 'manufacturing time')
        this.setState({
          shippingTime: manufacturingTime
        })
      })
      .catch((err) => {
        console.log(err, 'failed to get shipping cost')
      })
  }

  getReturnPolicy(){
    return getItemSelection(this.props.randomItemNumber)
      .then((data) => {
        var returnable;
        var returnPolicy;
        var wrapping = "";
        if (data[0]['availableToReturn']){
          returnable = "Returns and exchanges accepted"
          returnPolicy ="Exceptions may apply. See return policy"
          wrapping = "Gift wrapping available"
        } else{
          returnable ="No returns or exchanges"
          returnPolicy = "But please contact me if you have any problems with your order."
        }
        this.setState({
          returnPolicy : returnable,
          returnOverview : returnPolicy,
          giftWrapping : wrapping
        })
      })
      .catch((err) => {
        console.log(err, 'failed to get return policy')
      })
  }

  getShippingInfo(){
    event.preventDefault();
    console.log("get shipping info worked")
    //Supposed to show new page with shipping information
  }
  //Need to conditionally display this overview statement
  render(){
    return(
      <div>
        <div className="OverallOverview" >
          <div className="Overview" style={{fontWeight: 'bold'}}>
          Overview 
          </div>
          <OverviewList overviews={this.state.overview}/>
        </div>

        <div className="shippingInformation">
          <div style={{fontWeight: 'bold'}}>
            Shipping & Returns
          </div>
          <div className="manufacturingTime" style={{fontWeight: 'bold'}}>
            Ready to ship in {this.state.shippingTime}-{this.state.shippingTime + 2} days
          </div>
          <div className="shippedFrom">
            From California
          </div>
          <div className="shippingCost" style={{textDecorationLine: 'underline', cursor: "pointer"}} onClick={this.getShippingInfo}>
             Get Shipping Cost 
          </div>
        </div>

        <div className="returnPolicy">
          <div className="returns" style={{fontWeight: 'bold'}}>
            {this.state.returnPolicy}
          </div>
          <div className="returnPolicy">
            {this.state.returnOverview}
          </div>
          <div className="giftwrappingOptions">
            {this.state.giftWrapping}
          </div>
        </div>
      </div>
    )
  }
}


export default Overview