import React, { Component } from 'react';
import Api from '../../services/api';

import { Container, Header, Name, Bio, Stars, Starred, OwnerAvatar, Info, Title,
   Author } from './styles';

export default class user extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,

  });

  state = {
    stars: [],
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const respose = await api.get(`/users/${user.login}/starred`);

    this.setState({ stars: respose.data });
  }

  render() {
    const { navigation } = this.props;
    const { stars } = this.state;
    const user = navigation.getParam('user');

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        <Stars data={stars} keyExtractor={star => String(star.id)} renderItem={({ item }) => (
          <Starred>[
            <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
            <Info>
              <Title>{item.name}</Title>
              <Author>{item.owner.login}</Author>
            </Info>
          </Starred>
        )}
        />
      </Container>
    )
  }
}

export default user;