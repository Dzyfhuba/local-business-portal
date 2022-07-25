import * as React from 'react';
import Main from '../../Layouts/Main';

export interface IPostProps {
}

export default class Post extends React.Component<IPostProps> {
  public render() {
    return (
      <Main>
        Posts
      </Main>
    );
  }
}
