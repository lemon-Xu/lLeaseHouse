import React from 'react';
import { Icon, Row, Col, Button, DatePicker, Upload } from 'antd';
import { gridBar } from '../css/houseLeaseInf.css'
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'L';



class GridBar extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        const kids = React.Children.map(this.props.children, child => {
                        return child
                    })
        console.log(kids)
        for(let index = kids.length; index < 5; index++){
            kids.push(<p></p>)
        }
        return(
            <Col span={24}>
                <Row className={gridBar}>
                    <Col span={4}>{kids[0]}</Col>
                    <Col span={6}>{kids[1]}</Col>
                    <Col span={4}>{kids[2]}</Col>
                    <Col span={6}>{kids[3]}</Col>
                    <Col span={2}>{kids[4]}</Col>
                </Row>
            </Col>
        )
    }
}

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  
  class Avatar extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        loading: false,
      };
      this.handleChange = this.handleChange.bind(this)
    }
   
    handleChange(info){
      if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
      }
      if (info.file.status === 'done') {
          this.getResponse(info.file.response)
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
      }
    }

    getResponse(res){
        if(typeof(this.props.getResponse) == 'function')
            this.props.getResponse(res)
        else if(typeof(this.props.getResponse) != null  ){
            throw 'getResponse不是一个函数'
        }
    }
  
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const { imageUrl } = this.state;
      return (
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="http://localhost:3000/api1/img"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
          data={this.props.data}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
        </Upload>
      );
    }
  }

  export {Avatar}
