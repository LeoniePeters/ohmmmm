import React from 'react';
import PropTypes from 'prop-types';
import './playerCreationScreen.css';
import ShapePickerGroup from './shapePicker';

const PlayerCreationScreen = ({ onSubmit, onChange, values, signupError }) => {
  const { name } = values;

  return (
    <div className="SplashCreate">
      <div className="FormCreate">
        <form className="FormBodyCreate" onSubmit={onSubmit}>
          <h4>SIGN UP</h4>
          <div className="Name">
            <label className="User" htmlFor="name">
              Player:
            </label>
            <input
              placeholder="Enter Name"
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={onChange}
              autoComplete="off"
            />
          </div>
          <label className="User" htmlFor="avatar">
            Choose your Avatar:
          </label>
          <div className="Avatars">
            <input
              className="Gary"
              type="radio"
              id="Gary"
              name="avatar"
              value="Gary"
              onChange={onChange}
              autoComplete="off"
            />
            <label htmlFor="Gary">
              <img className="GaryImg" src="/assets/Gary.png" alt="Gary" />
            </label>
            <input
              className="Lily"
              type="radio"
              id="Lily"
              name="avatar"
              value="Lily"
              onChange={onChange}
              autoComplete="off"
            />
            <label htmlFor="Lily">
              <img className="LilyImg" src="/assets/Lily.png" alt="Lily" />
            </label>
          </div>
          <label className="User" htmlFor="shapes">
            Choose your Shapes:
          </label>
          <ShapePickerGroup />
          <input id="create" type="submit" value="Create" autoComplete="off" />
        </form>
        <p className="errorMessage">{signupError}</p>
      </div>
    </div>
  );
};

PlayerCreationScreen.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired
  }).isRequired,
  signupError: PropTypes.string
};

PlayerCreationScreen.defaultProps = { signupError: null };

export default PlayerCreationScreen;
