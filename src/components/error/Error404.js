import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import styles from "../../assets/css/Error404.module.css";

export default () => {
  const srcNotFoundImg = "/images/404-error-icon.png";
  const srcInfoImg = "/images/info-icon.svg";

  return (
    <div className={styles.error404}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h5" style={{ color: "#FF3C56" }}>
            <span
              style={{
                fontSize: "50px",
                fontWeight: "bold",
                color: "#FF3C56",
              }}
            >
              404
            </span>
          </Typography>
          <Typography
            variant="h5"
            style={{
              color: "#FF3C56",
              marginTop: "10px",
            }}
          >
            <img
              src={srcInfoImg}
              alt="Page not found"
              className={styles.infoError404}
            />
            <span style={{ verticalAlign: "middle" }}>Page not found</span>
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <img alt="error-404" src={srcNotFoundImg}></img>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h6">
            Sorry, the page was not found on this server. Go to{" "}
            <Link href="/">homepage</Link> and try again.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
