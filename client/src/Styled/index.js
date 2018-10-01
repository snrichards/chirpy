import styled from 'react-emotion';

export const Header = styled('header')`
  border-bottom: 1px solid skyblue;
  display: flex;
  justify-content: space-between;

  nav > ul {
    display: flex;
    list-style-type: none;
    align-items: center;
    height: 100%;
    margin: 0;
  }

  li {
    margin-left: 10px;
  }

  a {
    text-decoration: none;
  }

  a:hover,
  a:visited {
    color: skyblue;
  }

  button {
    background-color: skyblue;
    border: none;
    border-radius: 10px;
    color: white;
    cursor: pointer;
    padding: 10px;
  }
`;

export const Container = styled('div')`
  width: 80vw;
  margin: 0 auto;
`;

export const Form = styled('form')`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;

  label {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  button {
    margin-top: 5px;
  }
`;

export const ProfileTitle = styled('h2')`
  text-align: center;
`;

export const List = styled('ul')`
  list-style-type: none;
  padding-left: 0;
`;

export const ChirpItem = styled('li')`
  border: 1px solid black;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  margin-top: 10px;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
`;
