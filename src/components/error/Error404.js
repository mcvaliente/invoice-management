import React from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import styles from "../../assets/css/Error404.module.css";

const srcNotFoundImg = "/images/404-error-icon.png";

export default () => {
  return (
    <div className={styles.error404}>
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <Typography variant="h5" style={{ color: "#FF3C56" }}>
            Página no encontrada
          </Typography>
          <Typography variant="h5" style={{ color: "#FF3C56" }}>
            Error
            <span
              style={{
                marginLeft: "20px",
                fontSize: "50px",
                fontWeight: "bold",
                color: "#FF3C56",
              }}
            >
              404
            </span>
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <img alt="error-404" src={srcNotFoundImg}></img>
        </Grid>
      </Grid>
      <Grid container className={styles.error404Grid}>
        <Grid item xs={8}>
          <Typography variant="h6">
            ¡Lo sentimos! La página que buscas no se encuentra en el servidor.
            Puedes dirigirte a la <Link href="/">página principal</Link> e
            intentarlo de nuevo.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
