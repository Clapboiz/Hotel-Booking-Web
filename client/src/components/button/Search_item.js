import React, { Component } from "react";
import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";
import { placeRecommendation } from "../../api/MapAPI";
import "../../style/button/Search_item.scss";
import LocationOnMapSetting from "../Map/LocationOnMapSetting";

class Search_item extends Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    this.state = {
      type: "",
      count: 0,
      name: "",
      address: "",
      bedroomCount: 0,
      bedCount: 0,
      tiennghi: [],
      giaitri: [],
      naunuong: [],
      khongian: [],
      gia: 0,
      images: [],
      recommendations: [],
      showLocationContainer: false, // New state property
    };
  }

  addressRecommend = async (e) => {
    this.setState({ address: e.target.value });
    if (this.state.address.length > 0) {
      const result = await placeRecommendation(this.state.address);
      this.setState({ recommendations: result });
    } else if (this.state.address.length === 0) {
      this.setState({ recommendations: [] });
    }
    console.log(this.state.address.length);
  };

  handleSearchButtonClick = () => {
    // Show location-container only when the search button is clicked and there is at least one character in the input
    if (this.state.address.length > 0) {
      this.setState({ showLocationContainer: true });
    }
  };

  render() {
    return (
      <div className="Search_item-container">
        <MDBInputGroup>
          <div className="Search_item-container-input">
            <MDBInput
              label="Search"
              onChange={this.addressRecommend}
              value={this.state.address}
            />
            {this.state.address.length > 0 && (
              <div className="Search_item_li">
                {this.state.recommendations.length > 0 &&
                  this.state.recommendations.map((value, index) => (
                    <li key={index}> {value} </li>
                  ))}
              </div>
            )}
          </div>
          <MDBBtn
            rippleColor="dark"
            className="search_btn-size search_btn-container"
            onClick={this.handleSearchButtonClick}
          >
            <MDBIcon icon="search" />
          </MDBBtn>
        </MDBInputGroup>

        {/* Conditionally render location-container based on the showLocationContainer state */}
        {this.state.showLocationContainer && (
          <div className="location-container">
            <label
              className="upload_fontsize-container upload_fontsize-container-location"
              htmlFor=""
            >
              Vị trí trên bản đồ
            </label>
            {/* Assuming LocationOnMapSetting is a component */}
            <LocationOnMapSetting />
          </div>
        )}
      </div>
    );
  }
}

export default Search_item;