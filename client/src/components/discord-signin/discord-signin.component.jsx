import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord } from "@fortawesome/free-brands-svg-icons";

import "./discord-signin.styles.scss";

const DiscordSignin = () => (
  <div className="discord-container">
    <FontAwesomeIcon
      icon={faDiscord}
      size="lg"
      fixedWidth
      className="fa-discord"
    />
    Sign in with Discord
  </div>
);

export default DiscordSignin;
