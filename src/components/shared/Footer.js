import React from "react";
import styles from "../../assets/css/Footer.module.css";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

export default () => {
  const srcGitHubImg = "/images/github-icon.svg";

  const LightTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

  return (
    <>
      <footer className={styles.footer}>
        <Typography variant="body1" className={styles.footerTypo}>
          <LightTooltip title="What is P2P Models?" placement="left">
            <Link color="inherit" href="https://p2pmodels.eu/" target="_blank">
              P2P Models
            </Link>
          </LightTooltip>
          {", "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
        <Typography variant="body2" className={styles.footerTypo}>
          <LightTooltip title="P2P Models on GitHub" placement="right-end">
            <Link
              color="inherit"
              href="https://github.com/P2PModels"
              target="_blank"
            >
              <img src={srcGitHubImg} alt="P2P Models on GitHub" />
            </Link>
          </LightTooltip>
        </Typography>
      </footer>
    </>
  );
};
