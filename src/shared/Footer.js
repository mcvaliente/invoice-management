import React from "react";
import styles from "../assets/css/Footer.module.css";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

export default () => {
  const srcGitHubImg = "/images/github-icon.svg";

  return (
    <footer className={styles.footer}>
      <Typography variant="body1" className={styles.footerTypo}>
        <Link color="inherit" href="https://p2pmodels.eu/" target="_blank">
          P2P Models
        </Link>
        {", "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
      <Typography variant="body2" className={styles.footerTypo}>
        <Link
          color="inherit"
          href="https://github.com/P2PModels"
          target="_blank"
          title="GitHub"
        >
          <img src={srcGitHubImg} alt="GitHub" />
        </Link>
      </Typography>
    </footer>
  );
};
