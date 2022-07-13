import { message, Tabs, List, Card, Image, Carousel, Tooltip, Button, Modal, Space } from "antd";
import { LeftCircleFilled, RightCircleFilled, InfoCircleOutlined} from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import React from "react";
import { getStaysByHost, deleteStay } from "../utils";
 
const { TabPane } = Tabs;
 
class HostHomePage extends React.Component {
  render() {
    return (
        // destroyInactiveTabPane = true: change content when I switch tab
      <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
        <TabPane tab="My Stays" key="1">
          <MyStays/>
        </TabPane>
        <TabPane tab="Upload Stay" key="2">
          <div>Upload Stays</div>
        </TabPane>
      </Tabs>
    );
  }
}
export default HostHomePage;


class MyStays extends React.Component {
    state = {
      loading: false,
      data: [],
    };
   
    componentDidMount() {
      this.loadData();
    }
   
    loadData = async () => {
      this.setState({
        loading: true,
      });
   
      try {
        const resp = await getStaysByHost();
        this.setState({
          data: resp,
        });
      } catch (error) {
        message.error(error.message);
      } finally {
        this.setState({
          loading: false,
        });
      }
    };
   
    render() {
      return (
        <List
          loading={this.state.loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 3,
            md: 3,
            lg: 3,
            xl: 4,
            xxl: 4,
          }}
          dataSource={this.state.data}
          renderItem={(item) => (
            <List.Item>
              <Card
                key={item.id}
                title={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Text ellipsis={true} style={{ maxWidth: 150 }}>
                      {item.name}
                    </Text>
                    <StayDetailInfoButton stay={item} />
                  </div>
                }
                actions={[]}
                extra={<RemoveStayButton stay={item} onRemoveSuccess={this.loadData} />}
              >
                {
                  <Carousel
                    dots={false}
                    arrows={true}
                    prevArrow={<LeftCircleFilled />}
                    nextArrow={<RightCircleFilled />}
                  >
                    {item.images.map((image, index) => (
                      <div key={index}>
                        <Image src={image.url} width="100%" />
                      </div>
                    ))}
                  </Carousel>
                }
              </Card>
            </List.Item>
          )}
        />
      );
    } 
}


export class StayDetailInfoButton extends React.Component {
    state = {
      modalVisible: false,
    };
   
    openModal = () => {
      this.setState({
        modalVisible: true,
      });
    };
   
    handleCancel = () => {
      this.setState({
        modalVisible: false,
      });
    };
   
    render() {
      const { stay } = this.props;
      const { name, description, address, guest_number } = stay;
      const { modalVisible } = this.state;
      return (
        <>
          <Tooltip title="View Stay Details">
            <Button
              onClick={this.openModal}
              style={{ border: "none" }}
              size="large"
              icon={<InfoCircleOutlined />}
            />
          </Tooltip>
          {modalVisible && (
            <Modal
              title={name}
              centered={true}
              visible={modalVisible}
              closable={false}
              footer={null}
              onCancel={this.handleCancel}
            >
              <Space direction="vertical">
                <Text strong={true}>Description</Text>
                <Text type="secondary">{description}</Text>
                <Text strong={true}>Address</Text>
                <Text type="secondary">{address}</Text>
                <Text strong={true}>Guest Number</Text>
                <Text type="secondary">{guest_number}</Text>
              </Space>
            </Modal>
          )}
        </>
      );
    }
  }


  // button to remove a stay
  // can add a pop-yp window to confrim
  class RemoveStayButton extends React.Component {
    state = {
      loading: false,
    };
   
    handleRemoveStay = async () => {
      const { stay, onRemoveSuccess } = this.props;
      this.setState({
        loading: true,
      });
   
      try {
        await deleteStay(stay.id);
        onRemoveSuccess();
        // await == 
        // deleteStay().then() => onRemoveSuccess
      } catch (error) {
        message.error(error.message);
      } finally {
        this.setState({
          loading: false,
        });
      }
    };
   
    render() {
      return (
        <Button
          loading={this.state.loading}
          onClick={this.handleRemoveStay}
          danger={true}
          shape="round"
          type="primary"
        >
          Remove Stay
        </Button>
      );
    }
  }
  
  