import withSocket from "modules/centrifuge/hoc/withSocket.jsx";
import React from 'react';

class Subscribe extends React.Component {
  static defaultProps = {
    eventData: {},
  };

  subscription = undefined;

  constructor(props) {
    super(props);
    this.eventData = {
      ...props.eventData,
      subscribe: this.handleSubscribe,
    };
  }

  handleConnect = () => {
    this.forceUpdate();
  };

  handleSubscribe = () => {
    if (this.subscription) {
      const {eventData} = this.props;
      if (eventData.subscribe) {
        eventData.subscribe(this.subscription);
      }
    }
  };

  render() {
    return null;
  }

  componentDidMount() {
    this.props.centrifuge.on('connect', this.handleConnect);
    this.subscribe();
  }

  shouldComponentUpdate(props) {
    return !this.subscription || props.channel !== this.props.channel;
  }

  componentDidUpdate() {
    this.unsubscribe();
    this.subscribe();
  }

  componentWillUnmount() {
    this.props.centrifuge.off('connect', this.handleConnect);
    this.unsubscribe();
  }

  subscribe() {
    const {centrifuge, channel} = this.props;

    if (centrifuge.isConnected() && !this.subscription) {
      this.subscription = centrifuge.subscribe(channel, this.eventData);
    }
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription.removeAllListeners();
      this.subscription = null;
    }
  }
}

export default withSocket(Subscribe);
